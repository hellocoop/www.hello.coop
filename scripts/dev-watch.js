import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync, createReadStream, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createServer } from 'http';
import chokidar from 'chokidar';
import open from 'open';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Track which projects are currently building to avoid duplicate builds
const building = {
  index: false,
  legal: false,
  pages: false,
  protocol: false,
};

// Store preview process reference so it can be checked after builds
let previewProcess = null;


function log(message, project = '') {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = project ? `[${project}]` : '';
  console.log(`\n[${timestamp}] ${prefix} ${message}`);
}

async function runCommand(command, cwd = rootDir) {
  try {
    const { stdout, stderr } = await execAsync(command, { cwd });
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
    return true;
  } catch (error) {
    console.error(`Error running command: ${command}`, error.message);
    return false;
  }
}

async function buildIndex() {
  if (building.index) {
    log('Index build already in progress, skipping...', 'index');
    return;
  }
  building.index = true;
  log('Building index...', 'index');
  const success = await runCommand('npm run build:index');
  building.index = false;
  if (success) {
    log('Index build complete', 'index');
  }
  return success;
}

async function buildLegal() {
  if (building.legal) {
    log('Legal build already in progress, skipping...', 'legal');
    return;
  }
  building.legal = true;
  log('Building legal...', 'legal');
  const success = await runCommand('npm run build:legal');
  building.legal = false;
  if (success) {
    log('Legal build complete', 'legal');
  }
  return success;
}

async function buildPages() {
  if (building.pages) {
    log('Pages build already in progress, skipping...', 'pages');
    return false;
  }
  building.pages = true;
  log('Building pages...', 'pages');
  const success = await runCommand('npm run build:pages');
  building.pages = false;
  if (success) {
    log('Pages build complete', 'pages');
  }
  return success;
}

async function buildProtocol() {
  if (building.protocol) {
    log('Protocol build already in progress, skipping...', 'protocol');
    return;
  }
  building.protocol = true;
  log('Building protocol...', 'protocol');
  const success = await runCommand('npm run build:proto');
  building.protocol = false;
  if (success) {
    log('Protocol build complete', 'protocol');
  }
  return success;
}


function shouldIgnorePath(filePath) {
  const normalizedPath = filePath.replace(/\\/g, '/');
  
  // Ignore temporary timestamp files created by VitePress/Vite (e.g., vite.config.js.timestamp-123456.mjs)
  if (/\.timestamp-\d+\.(mjs|js|ts)$/.test(normalizedPath)) {
    return true;
  }
  
  // Ignore common dependency and build directories
  const ignorePatterns = [
    '/node_modules/',
    '/dist/',
    '/.git/',
    '/.vite/',
    '/.vitepress/cache/',
    '/.vitepress/dist/',
    '/S3/',
    '/build/',
    '/.next/',
    '/coverage/',
    '/.nyc_output/',
    '/.cache/',
    '/package-lock.json',
    '/yarn.lock',
    '/pnpm-lock.yaml',
  ];
  
  // Check if path contains any ignore pattern
  for (const pattern of ignorePatterns) {
    if (normalizedPath.includes(pattern)) {
      return true;
    }
  }
  
  // Ignore hidden files/directories (except .vitepress config files)
  // .vitepress/cache and .vitepress/dist are already handled by ignorePatterns
  const parts = normalizedPath.split('/');
  for (const part of parts) {
    if (part.startsWith('.') && part !== '.vitepress' && part !== '.') {
      return true;
    }
  }
  
  return false;
}

function determineProject(filePath) {
  const normalizedPath = filePath.replace(/\\/g, '/');
  if (normalizedPath.includes('/src/index/')) {
    return 'index';
  }
  if (normalizedPath.includes('/src/legal/')) {
    return 'legal';
  }
  if (normalizedPath.includes('/src/pages/')) {
    return 'pages';
  }
  if (normalizedPath.includes('/src/protocol/')) {
    return 'protocol';
  }
  return null;
}

// Debounce function to avoid multiple builds for rapid file changes
const debounceTimers = new Map();

function debounce(key, fn, delay = 500) {
  if (debounceTimers.has(key)) {
    clearTimeout(debounceTimers.get(key));
  }
  const timer = setTimeout(() => {
    fn();
    debounceTimers.delete(key);
  }, delay);
  debounceTimers.set(key, timer);
}

// Watch a directory recursively using chokidar (more reliable than fs.watch on macOS)
function watchDirectory(dir, onChange) {
  try {
    const watcher = chokidar.watch(dir, {
      ignored: (path) => {
        const normalizedPath = path.replace(/\\/g, '/');
        return shouldIgnorePath(normalizedPath);
      },
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 100,
        pollInterval: 50
      }
    });

    watcher.on('change', (filePath) => {
      const normalizedPath = filePath.replace(/\\/g, '/');
      
      // First check: Must be within a source directory (src/index, src/legal, src/pages, src/protocol)
      // This prevents watching S3 or any other directories
      if (!normalizedPath.includes('/src/index/') && 
          !normalizedPath.includes('/src/legal/') && 
          !normalizedPath.includes('/src/pages/') && 
          !normalizedPath.includes('/src/protocol/')) {
        return;
      }
      
      // Second check: Ignore node_modules, dist, and other non-source files
      if (shouldIgnorePath(filePath)) {
        return;
      }
      
      // Third check: Only process actual source files (not build outputs)
      // Ensure the path is actually within the watched directory
      const relativePath = normalizedPath.replace(rootDir.replace(/\\/g, '/'), '').replace(/^\//, '');
      if (!relativePath.startsWith('src/')) {
        return;
      }
      
      const project = determineProject(filePath);
      if (project) {
        debounce(project, () => onChange(project, filePath));
      }
    });

    watcher.on('add', (filePath) => {
      // Handle new files the same way as changes
      const normalizedPath = filePath.replace(/\\/g, '/');
      if (!normalizedPath.includes('/src/index/') && 
          !normalizedPath.includes('/src/legal/') && 
          !normalizedPath.includes('/src/pages/') && 
          !normalizedPath.includes('/src/protocol/')) {
        return;
      }
      if (shouldIgnorePath(filePath)) {
        return;
      }
      const relativePath = normalizedPath.replace(rootDir.replace(/\\/g, '/'), '').replace(/^\//, '');
      if (!relativePath.startsWith('src/')) {
        return;
      }
      const project = determineProject(filePath);
      if (project) {
        debounce(project, () => onChange(project, filePath));
      }
    });

    watcher.on('error', (error) => {
      log(`Watcher error for ${dir}: ${error.message}`, 'watch');
      console.error(error);
      // Note: chokidar is generally reliable, but if errors persist,
      // the watcher will need to be restarted manually
    });

    watcher.on('ready', () => {
      log(`Watching: ${dir}`, 'watch');
    });

    return watcher;
  } catch (error) {
    log(`Failed to watch directory ${dir}: ${error.message}`, 'watch');
    return null;
  }
}

// Helper to wait for file system to settle after writes
function waitForFileSystem(ms = 200) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function handleChange(project, filePath) {
  try {
    log(`Change detected: ${filePath}`, project);

    switch (project) {
      case 'index':
        await buildIndex();
        await waitForFileSystem();
        break;
      case 'legal':
        await buildLegal();
        await waitForFileSystem();
        break;
      case 'pages':
        // Pages change requires both pages and protocol rebuild (pages first, then protocol)
        // Protocol depends on pages existing, so we must rebuild pages first
        const pagesSuccess = await buildPages();
        if (pagesSuccess) {
          await waitForFileSystem();
          await buildProtocol();
          await waitForFileSystem();
        }
        break;
      case 'protocol':
        // Protocol change requires both pages and protocol rebuild (pages first, then protocol)
        // Protocol depends on pages existing, so we must rebuild pages first
        const pagesSuccess2 = await buildPages();
        if (pagesSuccess2) {
          await waitForFileSystem();
          await buildProtocol();
          await waitForFileSystem();
        }
        break;
    }
    
    // Check if preview server is still running after build
    if (previewProcess) {
      if (typeof previewProcess.close === 'function') {
        // HTTP server - check if it's listening
        if (!previewProcess.listening) {
          log(`Preview server appears to have stopped after build.`, 'server');
        }
      } else if (previewProcess.killed || (previewProcess.exitCode !== null && previewProcess.exitCode !== 0)) {
        log(`Preview server appears to have stopped after build. It should restart automatically.`, 'server');
      }
    }
  } catch (error) {
    log(`Error handling change: ${error.message}`, project);
    console.error(error);
  }
}

async function main() {
  log('Starting dev mode...');
  log('Building all projects first...');

  // Build everything first
  await Promise.all([
    buildIndex(),
    buildLegal(),
    buildPages(),
  ]);
  
  // Protocol depends on pages, so build it after pages
  await buildProtocol();

  log('Initial build complete!');
  
  // Verify index.html exists before starting server
  const indexPath = join(rootDir, 'S3', 'index.html');
  if (!existsSync(indexPath)) {
    log('ERROR: index.html not found in S3. Rebuilding index...', 'index');
    await buildIndex();
  }
  
  log('Starting preview server...');

  // Use a simple Node.js HTTP server instead of vite to avoid crashes
  // when files change in S3 directory
  const S3_DIR = join(rootDir, 'S3');
  const PORT = 5575;
  
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.woff': 'application/font-woff',
    '.woff2': 'application/font-woff2',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
    '.xml': 'application/xml',
    '.md': 'text/markdown',
  };

  const httpServer = createServer((req, res) => {
    let filePath = join(S3_DIR, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
    
    // Security: prevent directory traversal
    if (!filePath.startsWith(S3_DIR)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    
    // Check if file exists
    if (!existsSync(filePath)) {
      // Try index.html for directory requests
      const indexPath = join(filePath, 'index.html');
      if (existsSync(indexPath)) {
        filePath = indexPath;
      } else {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
    }
    
    // Check if it's a directory
    try {
      const stats = statSync(filePath);
      if (stats.isDirectory()) {
        const indexPath = join(filePath, 'index.html');
        if (existsSync(indexPath)) {
          filePath = indexPath;
        } else {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
      }
    } catch (err) {
      res.writeHead(500);
      res.end('Internal Server Error');
      return;
    }
    
    // Determine content type
    const ext = extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Serve file
    res.writeHead(200, { 'Content-Type': contentType });
    const stream = createReadStream(filePath);
    stream.pipe(res);
    stream.on('error', (err) => {
      log(`Error serving file ${filePath}: ${err.message}`, 'server');
      if (!res.headersSent) {
        res.writeHead(500);
        res.end('Internal Server Error');
      }
    });
  });

  httpServer.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      log(`Port ${PORT} is already in use. Trying to use a different approach...`, 'server');
      // Try using vite as fallback
      const proc = exec(`npx vite S3 --host --port ${PORT}`, { cwd: rootDir });
      proc.stdout?.pipe(process.stdout);
      proc.stderr?.pipe(process.stderr);
      previewProcess = proc;
    } else {
      log(`HTTP server error: ${error.message}`, 'server');
      console.error(error);
    }
  });

  httpServer.listen(PORT, async () => {
    const url = `http://localhost:${PORT}`;
    // Display URL in green and bold
    const greenBold = '\x1b[1m\x1b[32m';
    const reset = '\x1b[0m';
    console.log(`\n${greenBold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}`);
    console.log(`${greenBold}  Preview server running at: ${url}${reset}`);
    console.log(`${greenBold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}\n`);
    log(`Serving files from: ${S3_DIR}`, 'server');
    
    // Auto-open the browser
    try {
      await open(url);
      log(`Browser opened automatically`, 'server');
    } catch (error) {
      log(`Failed to open browser automatically: ${error.message}`, 'server');
    }
  });

  previewProcess = httpServer; // Store reference for cleanup

  // Watch all source directories
  log('Watching for changes...');
  log('Watching: src/index/, src/legal/, src/pages/, src/protocol/');

  const watchers = [
    watchDirectory(join(rootDir, 'src/index'), handleChange),
    watchDirectory(join(rootDir, 'src/legal'), handleChange),
    watchDirectory(join(rootDir, 'src/pages'), handleChange),
    watchDirectory(join(rootDir, 'src/protocol'), handleChange),
  ].filter(w => w !== null);

  // Handle cleanup on exit
  const cleanup = () => {
    log('Shutting down...');
    watchers.forEach(watcher => {
      if (watcher && typeof watcher.close === 'function') {
        watcher.close();
      }
    });
    if (previewProcess) {
      if (typeof previewProcess.close === 'function') {
        // HTTP server
        previewProcess.close();
      } else if (typeof previewProcess.kill === 'function' && !previewProcess.killed) {
        // Child process
        previewProcess.kill();
      }
    }
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  
  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    log(`Unhandled rejection: ${reason}`, 'error');
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  
  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    log(`Uncaught exception: ${error.message}`, 'error');
    console.error(error);
    cleanup();
  });
}

main().catch((error) => {
  log(`Fatal error: ${error.message}`, 'error');
  console.error(error);
  process.exit(1);
});


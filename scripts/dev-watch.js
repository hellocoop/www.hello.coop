import { exec } from 'child_process';
import { promisify } from 'util';
import { watch, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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

// Watch a directory recursively
function watchDirectory(dir, onChange) {
  try {
    const watcher = watch(dir, { recursive: true }, (eventType, filename) => {
      if (filename && (eventType === 'change' || eventType === 'rename')) {
        const filePath = join(dir, filename);
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
      }
    });

    watcher.on('error', (error) => {
      console.error(`Watcher error for ${dir}:`, error);
    });

    return watcher;
  } catch (error) {
    console.error(`Failed to watch directory ${dir}:`, error);
    return null;
  }
}

async function handleChange(project, filePath) {
  log(`Change detected: ${filePath}`, project);

  switch (project) {
    case 'index':
      await buildIndex();
      break;
    case 'legal':
      await buildLegal();
      break;
    case 'pages':
      // Pages change requires both pages and protocol rebuild (pages first, then protocol)
      // Protocol depends on pages existing, so we must rebuild pages first
      const pagesSuccess = await buildPages();
      if (pagesSuccess) {
        await buildProtocol();
      }
      break;
    case 'protocol':
      // Protocol change requires both pages and protocol rebuild (pages first, then protocol)
      // Protocol depends on pages existing, so we must rebuild pages first
      const pagesSuccess2 = await buildPages();
      if (pagesSuccess2) {
        await buildProtocol();
      }
      break;
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

  // Start preview server in background (serve S3 without building)
  const previewProcess = exec('npx vite S3 --open --port 5575', { cwd: rootDir });
  previewProcess.stdout?.pipe(process.stdout);
  previewProcess.stderr?.pipe(process.stderr);

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
  process.on('SIGINT', () => {
    log('Shutting down...');
    watchers.forEach(watcher => watcher.close());
    previewProcess.kill();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    log('Shutting down...');
    watchers.forEach(watcher => watcher.close());
    previewProcess.kill();
    process.exit(0);
  });
}

main().catch(console.error);


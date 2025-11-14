import { readdirSync, statSync, copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import TurndownService from 'turndown';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = 'S3/markdown';

// Ensure output directory exists
function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

// Copy markdown files from source to destination
function copyMarkdownFiles(sourceDir, destDir) {
  ensureDir(destDir);
  
  const files = readdirSync(sourceDir);
  let copiedCount = 0;
  
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const stat = statSync(sourcePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules, assets, and .vitepress directories
      if (file === 'node_modules' || file === 'assets' || file === '.vitepress' || file.startsWith('.')) {
        continue;
      }
      // Recursively copy subdirectories
      copyMarkdownFiles(sourcePath, path.join(destDir, file));
    } else if (file.endsWith('.md')) {
      const destPath = path.join(destDir, file);
      copyFileSync(sourcePath, destPath);
      copiedCount++;
    }
  }
  
  return copiedCount;
}

// Convert HTML to markdown
function htmlToMarkdown(htmlPath, outputPath, note = null) {
  try {
    const html = readFileSync(htmlPath, 'utf-8');
    
    // Extract body content
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (!bodyMatch) {
      console.warn(`  ⚠️  Could not extract body from ${htmlPath}`);
      return false;
    }
    
    const bodyHtml = bodyMatch[1];
    
    // Initialize Turndown
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
    });
    
    // Convert to markdown
    let markdown = turndownService.turndown(bodyHtml);
    
    // Extract title from HTML
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : path.basename(htmlPath, '.html');
    
    // Add frontmatter and note
    let frontmatter = `---\n`;
    frontmatter += `title: ${title}\n`;
    if (note) {
      frontmatter += `note: ${note}\n`;
    }
    frontmatter += `---\n\n`;
    
    markdown = frontmatter + markdown;
    
    // Ensure output directory exists
    ensureDir(path.dirname(outputPath));
    
    // Write markdown file
    writeFileSync(outputPath, markdown, 'utf-8');
    return true;
  } catch (error) {
    console.warn(`  ⚠️  Error converting ${htmlPath} to markdown:`, error.message);
    return false;
  }
}

function copyMarkdown() {
  console.log('📄 Copying and converting markdown files to S3/markdown/...');
  
  let totalCopied = 0;
  
  // Copy pages markdown files
  const pagesCount = copyMarkdownFiles('src/pages', path.join(outputDir, 'pages'));
  totalCopied += pagesCount;
  console.log(`  ✅ Copied ${pagesCount} markdown files from src/pages/`);
  
  // Copy legal markdown files
  const legalCount = copyMarkdownFiles('src/legal', path.join(outputDir, 'legal'));
  totalCopied += legalCount;
  console.log(`  ✅ Copied ${legalCount} markdown files from src/legal/`);
  
  // Convert HTML files to markdown
  let convertedCount = 0;
  
  // Convert index.html
  if (existsSync('S3/index.html')) {
    if (htmlToMarkdown('S3/index.html', path.join(outputDir, 'index.md'))) {
      convertedCount++;
      console.log(`  ✅ Converted S3/index.html to markdown`);
    }
  }
  
  // Convert products.html
  if (existsSync('S3/products.html')) {
    if (htmlToMarkdown('S3/products.html', path.join(outputDir, 'products.md'))) {
      convertedCount++;
      console.log(`  ✅ Converted S3/products.html to markdown`);
    }
  }
  
  // Convert pages/protocol.html (special case - note it's from Svelte source)
  if (existsSync('S3/pages/protocol.html')) {
    if (htmlToMarkdown('S3/pages/protocol.html', path.join(outputDir, 'pages', 'protocol.md'), 'Source is a Svelte application, not markdown')) {
      convertedCount++;
      console.log(`  ✅ Converted S3/pages/protocol.html to markdown (from Svelte source)`);
    }
  }
  
  totalCopied += convertedCount;
  console.log(`✅ Total: ${totalCopied} markdown files (${pagesCount + legalCount} copied, ${convertedCount} converted)`);
}

copyMarkdown();


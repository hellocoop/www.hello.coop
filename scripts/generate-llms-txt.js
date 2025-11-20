import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = 'https://www.hello.coop';
const outputFile = 'S3/llms.txt';

// Extract text content from HTML (simple version, removes tags)
function extractText(html, maxLength = 200) {
  // Remove script and style tags
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, ' ');
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();
  // Truncate if needed
  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + '...';
  }
  return text;
}

// Extract description from HTML body content
function extractDescriptionFromHtml(html) {
  // Try to find the first meaningful paragraph or heading in the body
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (!bodyMatch) return null;
  
  const body = bodyMatch[1];
  
  // Try to find first h1 or h2 with following text
  const h1Match = body.match(/<h1[^>]*>([^<]+)<\/h1>[\s\S]{0,500}(?:<p[^>]*>([^<]+)<\/p>|<div[^>]*>([^<]{50,200})<\/div>)/i);
  if (h1Match) {
    const desc = (h1Match[2] || h1Match[3] || h1Match[1]).trim();
    if (desc.length > 30) {
      return desc.substring(0, 200).replace(/\s+/g, ' ').trim();
    }
  }
  
  // Try to find first paragraph with substantial content
  const pMatches = body.match(/<p[^>]*>([^<]{50,300})<\/p>/gi);
  if (pMatches && pMatches.length > 0) {
    const firstP = pMatches[0].replace(/<[^>]+>/g, '').trim();
    if (firstP.length > 30) {
      return firstP.substring(0, 200).replace(/\s+/g, ' ').trim();
    }
  }
  
  // Fallback: extract first substantial text block
  const text = extractText(body, 200);
  if (text.length > 30) {
    return text;
  }
  
  return null;
}

// Extract description from markdown content
function extractDescriptionFromMarkdown(markdownPath) {
  try {
    const content = readFileSync(markdownPath, 'utf-8');
    
    // Remove frontmatter
    let md = content.replace(/^---[\s\S]*?---\n\n?/, '');
    
    // Try to find first paragraph after first heading
    const headingMatch = md.match(/^#+\s+.+?\n\n(.+?)(?:\n\n|$)/s);
    if (headingMatch) {
      const desc = headingMatch[1].trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
      if (desc.length > 30 && desc.length < 300) {
        return desc;
      }
    }
    
    // Try to find first substantial paragraph
    const paraMatch = md.match(/^(.+?)(?:\n\n|$)/m);
    if (paraMatch) {
      const desc = paraMatch[1].trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
      if (desc.length > 30 && desc.length < 300) {
        return desc;
      }
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

// Extract metadata from HTML
function extractMetadata(html, filePath) {
  const metadata = {
    title: null,
    description: null,
    url: null,
  };

  // Extract title from <title> tag
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    metadata.title = titleMatch[1].trim();
  }

  // Extract description from meta tags first
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                     html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
  let description = descMatch ? descMatch[1].trim() : null;
  
  // If meta description is generic, try to extract from content
  if (!description || description === 'Co-operatively Building the Internet Identity Layer') {
    const contentDesc = extractDescriptionFromHtml(html);
    if (contentDesc) {
      description = contentDesc;
    }
  }
  
  metadata.description = description;

  // Determine URL from file path
  const relativePath = path.relative('S3', filePath);
  if (relativePath === 'index.html') {
    metadata.url = '/';
  } else if (relativePath.startsWith('pages/')) {
    const pageName = relativePath.replace('pages/', '').replace('.html', '');
    metadata.url = `/pages/${pageName === 'index' ? '' : pageName}`;
  } else {
    const fileName = path.basename(relativePath, '.html');
    metadata.url = `/${fileName === 'index' ? '' : fileName}`;
  }

  // Check for markdown version
  metadata.markdownUrl = null;
  if (relativePath === 'index.html') {
    // Check for converted markdown
    const markdownPath = 'S3/markdown/index.md';
    if (existsSync(markdownPath)) {
      metadata.markdownUrl = '/markdown/index.md';
      // Try to get better description from markdown
      const mdDesc = extractDescriptionFromMarkdown(markdownPath);
      if (mdDesc && (!metadata.description || metadata.description === 'Co-operatively Building the Internet Identity Layer')) {
        metadata.description = mdDesc;
      }
    }
  } else if (relativePath === 'products.html') {
    // Check for converted markdown
    const markdownPath = 'S3/markdown/products.md';
    if (existsSync(markdownPath)) {
      metadata.markdownUrl = '/markdown/products.md';
      // Try to get better description from markdown
      const mdDesc = extractDescriptionFromMarkdown(markdownPath);
      if (mdDesc && (!metadata.description || metadata.description === 'Co-operatively Building the Internet Identity Layer')) {
        metadata.description = mdDesc;
      }
    }
  } else if (relativePath.startsWith('pages/')) {
    const pageName = relativePath.replace('pages/', '').replace('.html', '');
    const markdownPath = `S3/markdown/pages/${pageName === 'index' ? 'index' : pageName}.md`;
    if (existsSync(markdownPath)) {
      metadata.markdownUrl = `/markdown/pages/${pageName === 'index' ? 'index' : pageName}.md`;
      // Try to get better description from markdown
      const mdDesc = extractDescriptionFromMarkdown(markdownPath);
      if (mdDesc && (!metadata.description || metadata.description === 'Co-operatively Building the Internet Identity Layer')) {
        metadata.description = mdDesc;
      }
    }
  } else {
    const fileName = path.basename(relativePath, '.html');
    // Check for legal markdown files
    const markdownPath = `S3/markdown/legal/${fileName}.md`;
    if (existsSync(markdownPath)) {
      metadata.markdownUrl = `/markdown/legal/${fileName}.md`;
      // Try to get better description from markdown
      const mdDesc = extractDescriptionFromMarkdown(markdownPath);
      if (mdDesc && (!metadata.description || metadata.description === 'Co-operatively Building the Internet Identity Layer')) {
        metadata.description = mdDesc;
      }
    }
  }

  return metadata;
}

// Get all HTML files recursively
function getHtmlFiles(dir, base = '') {
  const files = readdirSync(dir);
  const htmlFiles = [];
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and assets directories
      if (file === 'node_modules' || file === 'assets') {
        continue;
      }
      htmlFiles.push(...getHtmlFiles(fullPath, path.join(base, file)));
    } else if (file.endsWith('.html') && file !== '404.html') {
      htmlFiles.push(fullPath);
    }
  }
  
  return htmlFiles;
}

// Generate llms.txt content
function generateLlmsTxt() {
  const pages = [];
  
  // Process root S3 directory
  const rootFiles = getHtmlFiles('S3');
  for (const filePath of rootFiles) {
    // Skip files in pages directory (we'll process those separately)
    if (filePath.includes(path.join('S3', 'pages'))) {
      continue;
    }
    
    try {
      const html = readFileSync(filePath, 'utf-8');
      const metadata = extractMetadata(html, filePath);
      if (metadata.title) {
        pages.push(metadata);
      }
    } catch (error) {
      console.warn(`Warning: Could not read ${filePath}:`, error.message);
    }
  }
  
  // Process S3/pages directory
  const pageFiles = getHtmlFiles('S3/pages');
  for (const filePath of pageFiles) {
    try {
      const html = readFileSync(filePath, 'utf-8');
      const metadata = extractMetadata(html, filePath);
      if (metadata.title) {
        pages.push(metadata);
      }
    } catch (error) {
      console.warn(`Warning: Could not read ${filePath}:`, error.message);
    }
  }
  
  // Sort pages: homepage first, then alphabetically
  pages.sort((a, b) => {
    if (a.url === '/') return -1;
    if (b.url === '/') return 1;
    return a.url.localeCompare(b.url);
  });
  
  // Generate markdown content
  let content = `# ${hostname} - Site Information for AI Agents\n\n`;
  content += `This file provides structured information about the ${hostname} website to help AI agents understand and navigate the site.\n\n`;
  
  content += `## Site Overview\n\n`;
  content += `**Name:** Hellō\n`;
  content += `**Description:** Co-operatively Building the Internet Identity Layer\n`;
  content += `**Base URL:** ${hostname}\n\n`;
  
  content += `## Site Structure\n\n`;
  content += `The site is organized into the following sections:\n\n`;
  content += `- **Homepage** (\`/\`): Main landing page with product information\n`;
  content += `- **Products** (\`/products.html\`): Detailed product information\n`;
  content += `- **Pages** (\`/pages/\`): Documentation and informational pages (also available as markdown in \`/markdown/pages/\`)\n`;
  content += `- **Legal** (\`/privacy-policy.html\`, \`/terms-of-service.html\`, etc.): Legal documents (also available as markdown in \`/markdown/legal/\`)\n\n`;
  content += `## Markdown Sources\n\n`;
  content += `Many pages on this site are generated from markdown source files. Markdown versions are available in the \`/markdown/\` directory for easier parsing by AI agents:\n\n`;
  content += `- **Pages markdown:** \`/markdown/pages/\` - Source markdown for documentation pages\n`;
  content += `- **Legal markdown:** \`/markdown/legal/\` - Source markdown for legal documents\n\n`;
  
  content += `## Available Pages\n\n`;
  
  for (const page of pages) {
    content += `### ${page.title}\n`;
    content += `- **URL:** ${hostname}${page.url}\n`;
    if (page.markdownUrl) {
      content += `- **Markdown:** ${hostname}${page.markdownUrl}\n`;
    }
    content += `\n`;
  }
  
  content += `## Navigation\n\n`;
  content += `The site includes the following main navigation sections:\n\n`;
  content += `### Products\n`;
  content += `- Hellō B2C SSO\n`;
  content += `- Hellō B2B SSO\n`;
  content += `- Hellō Lifecycle\n`;
  content += `- GitHub Offboarding\n`;
  content += `- Coding Platforms\n\n`;
  
  content += `### Documentation Pages\n`;
  content += `- Approach: Hellō's approach to identity\n`;
  content += `- Cooperative: Information about Hello Identity Co-op\n`;
  content += `- Standards: Standards and specifications\n`;
  content += `- Tenets: Guiding principles\n`;
  content += `- Protecting Privacy: Laws of Identity\n`;
  content += `- Computing Architecture: Technical architecture\n`;
  content += `- Data Governance: Data governance policies\n`;
  content += `- Hellō Protocol: Protocol documentation\n\n`;
  
  content += `## External Resources\n\n`;
  content += `The site references the following external resources:\n`;
  content += `- Developer Documentation: https://hello.dev/\n`;
  content += `- Developer Console: https://console.hello.coop/\n`;
  content += `- Playground: https://playground.hello.dev/\n`;
  content += `- Status Page: https://status.hello.coop/\n\n`;
  
  content += `## Sitemap\n\n`;
  content += `A complete sitemap is available at: ${hostname}/sitemap.xml\n\n`;
  
  content += `---\n`;
  content += `*This file was automatically generated. Last updated: ${new Date().toISOString()}*\n`;
  
  // Write to file
  writeFileSync(outputFile, content, 'utf-8');
  console.log(`✅ llms.txt generated at ${outputFile}`);
  console.log(`📊 Generated information for ${pages.length} pages`);
}

generateLlmsTxt();


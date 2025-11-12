import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { readdirSync, statSync } from 'fs';
import path from 'path';

const hostname = 'https://www.hello.coop';
const outputFile = 'S3/sitemap.xml';

function getHtmlFiles(dir, base = '') {
  const files = readdirSync(dir);
  const urls = [];
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      // Only recurse into subdirectories if we're not already in a pages directory
      if (dir === 'S3' && file === 'pages') {
        // Skip the pages directory when scanning root S3
        continue;
      }
      urls.push(...getHtmlFiles(fullPath, path.join(base, file)));
    } else if (file.endsWith('.html')) {
      // Skip 404 pages
      if (file === '404.html') {
        continue;
      }
      
      let route;
      if (file === 'index.html') {
        // For index.html files, use the directory path
        route = base;
      } else {
        // For other HTML files, keep the .html extension and use the full path
        route = path.join(base, file);
      }
      
      // Clean up the route
      route = '/' + route.replace(/\\/g, '/').replace(/^\/+/, '');
      if (route === '/') {
        route = '/';
      }
      
      urls.push(route);
    }
  }
  return urls;
}

async function generateSitemap() {
  const stream = new SitemapStream({ hostname });
  const writeStream = createWriteStream(outputFile);
  stream.pipe(writeStream);

  // Collect all URLs and remove duplicates
  const allUrls = new Set();
  
  // Process root S3 directory (for index.html and legal pages)
  const rootUrls = getHtmlFiles('S3');
  for (const url of rootUrls) {
    allUrls.add(url);
  }
  
  // Process S3/pages directory (for page content)
  const pageUrls = getHtmlFiles('S3/pages');
  for (const url of pageUrls) {
    // Add /pages/ prefix for content pages
    const prefixedUrl = url === '/' ? '/pages/' : '/pages' + url;
    allUrls.add(prefixedUrl);
  }

  // Write unique URLs to sitemap
  for (const url of allUrls) {
    stream.write({ url });
  }

  stream.end();
  await streamToPromise(stream);
  console.log(`✅ Sitemap generated at ${outputFile}`);
  console.log(`📊 Generated ${allUrls.size} unique URLs`);
}

generateSitemap();

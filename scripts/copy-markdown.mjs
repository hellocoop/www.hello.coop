import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Convert .mdx to .md and copy to S3/markdown/ with proper structure
function copyMarkdownFiles() {
    const markdownDir = 'S3/markdown'

    // Create markdown directory structure
    if (!existsSync(markdownDir)) {
        mkdirSync(markdownDir, { recursive: true })
    }
    if (!existsSync(path.join(markdownDir, 'approach'))) {
        mkdirSync(path.join(markdownDir, 'approach'), { recursive: true })
    }
    if (!existsSync(path.join(markdownDir, 'legal'))) {
        mkdirSync(path.join(markdownDir, 'legal'), { recursive: true })
    }

    // Copy homepage
    const homepageMdx = 'app/page.mdx'
    if (existsSync(homepageMdx)) {
        const content = readFileSync(homepageMdx, 'utf-8')
        writeFileSync(path.join(markdownDir, 'index.md'), content, 'utf-8')
        console.log('✅ Copied homepage to S3/markdown/index.md')
    }

    // Copy products page
    const productsMdx = 'app/products/page.mdx'
    if (existsSync(productsMdx)) {
        const content = readFileSync(productsMdx, 'utf-8')
        writeFileSync(path.join(markdownDir, 'products.md'), content, 'utf-8')
        console.log('✅ Copied products to S3/markdown/products.md')
    }

    // Copy approach pages
    const approachDir = 'app/approach'
    if (existsSync(approachDir)) {
        const approachPages = [
            'cooperative',
            'architecture',
            'data-governance',
            'laws-of-identity',
            'protocol',
            'standards',
            'tenets',
        ]

        for (const page of approachPages) {
            const mdxPath = path.join(approachDir, page, 'page.mdx')
            if (existsSync(mdxPath)) {
                const content = readFileSync(mdxPath, 'utf-8')
                writeFileSync(path.join(markdownDir, 'approach', `${page}.md`), content, 'utf-8')
                console.log(`✅ Copied approach/${page} to S3/markdown/approach/${page}.md`)
            }
        }
    }

    // Copy legal pages
    const legalPages = ['privacy-policy', 'terms-of-service', 'trademark-disclaimer']
    for (const page of legalPages) {
        const mdxPath = path.join('app', page, 'page.mdx')
        if (existsSync(mdxPath)) {
            const content = readFileSync(mdxPath, 'utf-8')
            writeFileSync(path.join(markdownDir, 'legal', `${page}.md`), content, 'utf-8')
            console.log(`✅ Copied ${page} to S3/markdown/legal/${page}.md`)
        }
    }

    console.log('✅ Markdown files copied to S3/markdown/')

    // Copy legal HTML pages to root as .html files for backwards compatibility
    // (Google app registrations still reference the old .html URLs)
    const legalHtmlPages = ['privacy-policy', 'terms-of-service']
    for (const page of legalHtmlPages) {
        const htmlPath = path.join('S3', page, 'index.html')
        if (existsSync(htmlPath)) {
            const content = readFileSync(htmlPath, 'utf-8')
            writeFileSync(path.join('S3', `${page}.html`), content, 'utf-8')
            console.log(`✅ Copied ${page}/index.html to S3/${page}.html`)
        }
    }
}

copyMarkdownFiles()

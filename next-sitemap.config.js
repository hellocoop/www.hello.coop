/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.hello.coop',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    outDir: './S3',
    trailingSlash: true,
    exclude: ['/404', '/_not-found'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
}

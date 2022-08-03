export default {
    title: 'Hellō Docs',
    appearance: false,
    lang: 'en-US',
    outDir: '../../S3/pages',
    base: '/pages/',
    themeConfig: {
        siteTitle: 'Hellō Docs',
        sidebar: [
            {
                items: [
                    { text: 'Terms of Service', link: '/terms-of-service' },
                    { text: 'Privacy Policy', link: '/privacy-policy' },
                    { text: 'Trademark Disclaimer', link: '/trademark-disclaimer' }
                ]
            }
        ],
        editLink: {
            pattern: 'https://github.com/hellocoop/www.hello.coop/edit/main/pages-src/docs/:path',
            text: 'Propose changes to this page'
        }
    }
}

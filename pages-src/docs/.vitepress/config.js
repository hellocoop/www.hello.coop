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
                    { text: 'Privacy Policy', link: '/privacy-policy' }
                ]
            }
        ],
        editLink: {
            pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
            text: 'Propose changes to this page'
        }
    }
}

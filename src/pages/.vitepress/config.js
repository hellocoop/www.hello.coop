export default {
    title: 'Hellō Pages',
    appearance: false,
    lang: 'en-US',
    outDir: '../../S3/pages',
    base: '/pages/',
    head: [
        ['script', { src: 'https://cdn.hello.coop/js/wc-footer.js'}]
    ],
    themeConfig: {
        siteTitle: 'Hellō Pages',
        sidebar: [
            {
                items: [
                    { text: 'Hellō Tenets', link: '/hello-tenets' }
                ]
            }
        ],
        editLink: {
            pattern: 'https://github.com/hellocoop/www.hello.coop/edit/main/src/pages/:path',
            text: 'Propose changes to this page'
        }
    }
}

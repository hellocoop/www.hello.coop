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
                    { text: 'Thesis', link: '/thesis' },
                    { text: 'Tenets', link: '/tenets' },
                    { text: 'Cooperative', link: '/cooperative' },
                    { text: 'Architecture', link: '/architecture' },
                    { text: 'Financing Model', link: '/financing' },
                    { text: 'Hellō & the Laws of Identity', link: '/laws-of-identity' },
                    { text: 'FAQs', link: '/FAQs' },
                ]
            }
        ],
        editLink: {
            pattern: 'https://github.com/hellocoop/www.hello.coop/edit/main/src/pages/:path',
            text: 'Propose changes to this page'
        }
    }
}

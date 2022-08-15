export default {
    title: 'Hellō Pages',
    appearance: false,
    lang: 'en-US',
    outDir: '../S3/',
    head: [
        ['script', { src: 'https://cdn.hello.coop/js/wc-footer.js'}]
    ],
    themeConfig: {
        siteTitle: 'Hellō Pages',
        sidebar: {
            '/root/': [
                {
                    items: [
                        { text: 'Terms of Service', link: '/terms-of-service' },
                        { text: 'Privacy Policy', link: '/privacy-policy' },
                        { text: 'Trademark Disclaimer', link: '/Trademark Disclaimer' },
                    ]
                }
            ],
            '/pages/': [
                {
                    items: [
                        { text: 'Thesis', link: '/pages/thesis' },
                        { text: 'Tenets', link: '/pages/tenets' },
                        { text: 'Cooperative', link: '/pages/cooperative' },
                        { text: 'Architecture', link: '/pages/architecture' },
                        { text: 'Financing Model', link: '/pages/financing' },
                        { text: 'Hellō & the Laws of Identity', link: '/pages/laws-of-identity' },
                        { text: 'FAQs', link: '/pages/faqs' },
                    ]
                }
            ]
        },
        editLink: {
            pattern: 'https://github.com/hellocoop/www.hello.coop/edit/main/src/:path',
            text: 'Propose changes to this page'
        }
    }
}

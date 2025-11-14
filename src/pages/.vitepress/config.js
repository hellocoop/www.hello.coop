export default {
    title: 'Hellō Pages',
    titleTemplate: false,
    description: "Co-operatively Building the Internet Identity Layer",
    base: '/pages/',
    appearance: false,
    lang: 'en-US',
    outDir: '../../S3/pages/',
    vite: {
        build: {
            // Don't empty the output directory - just overwrite files
            // This prevents cleaning out the S3/pages directory which contains files from other builds
            emptyOutDir: false,
        }
    },
    head: [
        ['meta', { name: 'theme-color', content: '#303030' }],
        ['script', { src: 'https://cdn.hello.coop/js/relative-wc-footer.js'}],
        ['link', { rel: 'icon', media: '(prefers-color-scheme: light)', href: 'https://cdn.hello.coop/images/favicon-light.png' }],
        ['link', { rel: 'icon', media: '(prefers-color-scheme: dark)', href: 'https://cdn.hello.coop/images/favicon-dark.png' }]
    ],
    themeConfig: {
        sidebar: [
            {
                items: [
                    { text: 'Hellō Approach', link: '/approach' },
                    { text: 'Hello Identity Co-op', link: '/cooperative' },
                    { text: 'Standards', link: '/standards' },
                    { text: 'Guiding Tenets', link: '/tenets' },
                    { text: 'Protecting Privacy', link: '/laws-of-identity' },
                    { text: 'Computing Architecture', link: '/architecture' },
                    { text: 'Data Governance', link: '/data-governance' },
                    { text: 'Hellō Protocol', link: '/protocol' },
                ]
            }
        ],
        editLink: {
            pattern: 'https://github.com/hellocoop/www.hello.coop/edit/main/src/pages/:path',
            text: 'Propose changes to this page'
        },
    }
}
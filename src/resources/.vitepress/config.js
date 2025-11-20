export default {
    title: 'Hellō Pages',
    titleTemplate: false,
    description: "Goodbye SSO tax. Hyperscale security for all.",
    base: '/resources/',
    appearance: false,
    lang: 'en-US',
    outDir: '../../S3/resources/',
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
        siteTitle: false,
        sidebar: false,
        editLink: {
            pattern: 'https://github.com/hellocoop/www.hello.coop/edit/main/src/pages/:path',
            text: 'Propose changes to this page'
        },
    }
}
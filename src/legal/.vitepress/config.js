export default {
    title: 'Hellō',
    titleTemplate: false,
    description: "Goodbye SSO tax. Hyperscale security for all.",
    appearance: false,
    lang: 'en-US',
    outDir: '../../S3/',
    vite: {
        build: {
            // Don't empty the output directory - just overwrite files
            // This prevents cleaning out the S3 directory which contains files from other builds
            emptyOutDir: false,
        }
    },
    head: [
        ['meta', { name: 'theme-color', content: '#303030' }],
        ['script', {'data-domain': 'hello.coop' , 'src': '/js/script.hash.js'}],
        ['script', { src: 'https://cdn.hello.coop/js/relative-wc-footer.js'}],
        ['link', { rel: 'icon', media: '(prefers-color-scheme: light)', href: 'https://cdn.hello.coop/images/favicon-light.png' }],
        ['link', { rel: 'icon', media: '(prefers-color-scheme: dark)', href: 'https://cdn.hello.coop/images/favicon-dark.png' }]
    ],
    themeConfig: {
        siteTitle: false,
        sidebar: false,
        editLink: {
            pattern: 'https://github.com/hellocoop/www.hello.coop/edit/main/src/legal/:path',
            text: 'Propose changes to this page'
        },
    },
}
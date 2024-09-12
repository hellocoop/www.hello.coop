export default {
    title: 'Hellō',
    titleTemplate: false,
    description: "Co-operatively Building the Internet Identity Layer",
    appearance: false,
    lang: 'en-US',
    outDir: '../../S3/',
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
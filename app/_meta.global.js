export default {
    index: {
        type: 'page',
        display: 'hidden'
    },
    products: {
        type: 'page',
        display: 'hidden',
        theme: {
            typesetting: 'article',
            layout: 'full',
            toc: true
        }
    },
    'privacy-policy': {
        type: 'page',
        display: 'hidden',
        theme: {
            typesetting: 'article',
            toc: false,
        }
    },
    'terms-of-service': {
        type: 'page',
        display: 'hidden',
        theme: {
            typesetting: 'article',
            toc: false,
        }
    },
    'trademark-disclaimer': {
        type: 'page',
        display: 'hidden',
        theme: {
            typesetting: 'article',
            toc: false,
        }
    },
    approach: {
        type: 'page',
        theme: {
            breadcrumb: false,
        },
        items: {
            "index": "Hello Approach",
            "cooperative": "Hello Identity Co-op",
            "tenets": "Guiding Tenets",
            "laws-of-identity": "Protecting Privacy",
            "architecture": "Computing Architecture",
            "data-governance": "Data Governance",
            "protocol": "Protocol",
            "standards": {
                type: 'page',
                display: 'hidden',
                theme: {
                    typesetting: 'article',
                    // toc: {
                    //     depth: 2
                    // }
                }
            }
        }
    }
}
export default {
    index: {
        type: 'page',
        display: 'hidden'
    },
    products: {
        type: 'page',
        display: 'hidden'
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
    pages: {
        type: 'page',
        theme: {
            breadcrumb: false,
        },
        items: {
            "approach": "Hello Approach",
            "cooperative": "Hello Identity Co-op",
            "tenets": "Guiding Tenets",
            "laws-of-identity": "Protecting Privacy",
            "architecture": "Computing Architecture",
            "data-governance": "Data Governance",
            "protocol": "Protocol",
        }
    },
    resources: {
        type: 'page',
        items: {
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
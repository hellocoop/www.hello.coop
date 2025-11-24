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
        }
    },
    'privacy-policy': {
        type: 'page',
        display: 'hidden',
        theme: {
            typesetting: 'article',
            layout: 'full'
        }
    },
    'terms-of-service': {
        type: 'page',
        display: 'hidden',
        theme: {
            typesetting: 'article',
            layout: 'full'
        }
    },
    'trademark-disclaimer': {
        type: 'page',
        display: 'hidden',
        theme: {
            typesetting: 'article',
            layout: 'full'
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
                    layout: 'full'
                }
            }
        }
    }
}
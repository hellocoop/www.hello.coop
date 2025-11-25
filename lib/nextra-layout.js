import { Layout } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'

export default async function RootLayout({ children }) {
    return (
        <Layout
            pageMap={await getPageMap()}
            docsRepositoryBase="https://github.com/hellocoop/www.hello.coop/tree/main/"
            copyPageButton={false}
            darkMode={false}
            sidebar={{
                toggleButton: false,
                defaultMenuCollapseLevel: 1,
            }}
        >
            <div className="max-w-[88rem] mx-auto pt-6">{children}</div>
        </Layout>
    )
}

import { Layout } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'

export default async function RootLayout({ children }) {
    return (
        <>
            <Head/>
            <Layout
                pageMap={await getPageMap()}
                docsRepositoryBase='https://github.com/hellocoop/www.hello.coop/tree/main/'
                copyPageButton={false}
                darkMode={false}
                sidebar={{
                    toggleButton: false,
                    defaultMenuCollapseLevel: 1,
                }}
            >
                <div className='max-w-[88rem] mx-auto'>
                    {children}
                </div>
            </Layout>
        </>
    )
}
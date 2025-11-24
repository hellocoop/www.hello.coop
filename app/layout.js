import "./globals.css";
import { Head } from 'nextra/components'
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
    title: "Hellō",
    description: "Goodbye SSO tax. Hyperscale security for all.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="theme-color" content="#303030" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.hello.coop/" />
                <meta property="og:title" content="Hellō" />
                <meta property="og:description" content="Goodbye SSO tax. Hyperscale security for all." />
                <meta property="og:image" content="https://cdn.hello.coop/images/og-preview.png" />
                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://www.hello.coop/" />
                <meta property="twitter:title" content="Hellō" />
                <meta property="twitter:description" content="Goodbye SSO tax. Hyperscale security for all." />
                <meta property="twitter:image" content="https://cdn.hello.coop/images/og-preview.png" />
                {/* Favicons */}
                <link href="https://cdn.hello.coop/images/favicon-light.png" rel="icon" media="(prefers-color-scheme: light)" />
                <link href="https://cdn.hello.coop/images/favicon-dark.png" rel="icon" media="(prefers-color-scheme: dark)" />
                {/* Plausible */}
                <script defer data-domain="hello.coop" src="/plausible.js"></script>
            </Head>
            <body
                className="bg-white text-charcoal dark:bg-[#151515] dark:text-gray overflow-x-hidden font-sans"
            >
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}

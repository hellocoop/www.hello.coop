import nextra from 'nextra'

// Set up Nextra with its configuration
const withNextra = nextra({
    contentDirBasePath: '/pages',
    // ... Add Nextra-specific options here
})

// Export the final Next.js config with Nextra included
export default withNextra({
    async rewrites() {
        return [
            {
                // Match any path ending with .html
                source: '/:path*.html',
                // Map to the corresponding page without .html
                destination: '/:path*',
            },
        ];
    },
})
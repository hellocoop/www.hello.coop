import nextra from 'nextra'

// Set up Nextra with its configuration
const withNextra = nextra({
    contentDirBasePath: '/pages',
    // ... Add Nextra-specific options here
})

// Export the final Next.js config with Nextra included
export default withNextra({
    async redirects() {
      return [
        {
          source: '/:path*.html',
          destination: '/:path*',
          permanent: false,
        },
      ]
    },
  })
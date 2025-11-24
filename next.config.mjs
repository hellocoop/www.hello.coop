import nextra from 'nextra'

// Set up Nextra with its configuration
const withNextra = nextra({
  // ... Add Nextra-specific options here
})

// Export the final Next.js config with Nextra included
export default withNextra({
  output: 'export',
  distDir: 'S3',
  trailingSlash: true,
  swcMinify: true,
  images: {
    // https://stackoverflow.com/a/74752466/9747630
    unoptimized: true
  }
})
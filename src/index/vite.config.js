import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 5170,
  },
  build: {
    outDir: '../../S3/',
    // Don't empty the output directory - just overwrite files
    // This prevents cleaning out the S3 directory which contains files from other builds
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: './index.html',
        products: './products.html',
      },
    },
  },
  plugins: [
    tailwindcss(),
  ],
})
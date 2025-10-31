import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 5170,
  },
  build: {
    outDir: '../../S3/',
  },
  plugins: [
    tailwindcss(),
  ],
})
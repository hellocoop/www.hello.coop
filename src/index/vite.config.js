import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 5170,
    proxy: {
      '/privacy-policy.html': 'http://localhost:5171/privacy-policy.html',
    },
  },
  plugins: [
    tailwindcss(),
  ],
})
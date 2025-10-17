import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import svgLoader from "vite-svg-loader"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    //to avoid confusing when running pages and protocol simultaneously
    base: mode === "production" ? "/pages/" : "/protocol/",
    plugins: [svelte(), svgLoader()],
    build: {
      outDir: "./dist",
      chunkSizeWarningLimit: 1024,
      rollupOptions: {
        external: ['/js/script.hash.js']
      }
    },
    server: {
      port: 7002,
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..']
      }
    },
  }
})

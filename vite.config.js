import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    //vite preview by defaults tries to server /dist dir, this overrides that default
    outDir: "./S3", 
  },
})

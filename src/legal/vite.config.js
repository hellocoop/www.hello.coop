import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 5171,
    },
    build: {
        // Don't empty the output directory - just overwrite files
        // This prevents cleaning out the S3 directory which contains files from other builds
        emptyOutDir: false,
    }
});
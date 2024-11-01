import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/story': {
        // target: 'http://192.168.1.130:9595',
        target: 'http://127.0.0.1:8000/',
        changeOrigin: true,
        rewrite: (path) => {
          console.log(`Proxying request to: ${path}`); // Log the path being proxied
          return path;
        },
      },
    },
  }
})

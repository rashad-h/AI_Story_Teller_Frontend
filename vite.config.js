import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/AI_Story_Teller_Frontend/',
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
        target: 'https://mtx9ed9krb.eu-west-2.awsapprunner.com/',
        changeOrigin: true,
        rewrite: (path) => {
          console.log(`Proxying request to: ${path}`); // Log the path being proxied
          return path;
        },
      },
    },
  }
})

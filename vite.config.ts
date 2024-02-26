import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    modules: {

    }
  },
  resolve: {
    alias: {
      '@icons': fileURLToPath(new URL('./src/assets/icons', import.meta.url)),
      '@modules': fileURLToPath(new URL('./node_modules', import.meta.url)),
      '@inputs': fileURLToPath(new URL('./src/components/inputs', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

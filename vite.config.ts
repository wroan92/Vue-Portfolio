import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
 /*  base: 'http://anderswroldsen.com/', */
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
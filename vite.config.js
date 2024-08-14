import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/wep': {
        target: 'https://wep-backend.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wep/, ''),
      },
    },
  },
})

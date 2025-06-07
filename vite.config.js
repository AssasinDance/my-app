import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      // Настройте алиасы как в вашем проекте
      src: '/src',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
  },
})

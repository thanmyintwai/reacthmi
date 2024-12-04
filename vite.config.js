import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  base: '/reacthmi/',
  plugins: [
    preact(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  server: {
    port: 9000,
  },
  resolve: {
    alias: {
      react: 'preact/compat',
    },
  },
})

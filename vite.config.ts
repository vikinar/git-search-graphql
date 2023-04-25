import autoprefixer from 'autoprefixer'
import path from 'path'
import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'
import viteSvgr from 'vite-plugin-svgr'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin('all', {
      prefix: 'VITE_',
    }),
    viteSvgr({
      exportAsDefault: false,
      include: '**/*.svg',
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/app/assets'),
      '@icons': path.resolve(__dirname, './src/app/assets/icons'),
      '@features': path.resolve(__dirname, './src/features'),
      '@ui': path.resolve(__dirname, './src/features/ui'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@api': path.resolve(__dirname, './src/shared/api'),
      '@src': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['graphql'],
  },
  server: {
    port: 3000,
  },
})

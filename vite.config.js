import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@heroicons/react', 'framer-motion']
        }
      }
    },
    assetsInlineLimit: 0 // Ensure assets are not inlined as base64
  },
  server: {
    host: true,
    port: 3000
  },
  optimizeDeps: {
    include: ['firebase/app', 'firebase/firestore', 'firebase/auth', 'firebase/storage']
  },
  base: '/',
  publicDir: 'public'
});
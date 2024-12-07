import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240
    }),
    ViteImageOptimizer({
      jpg: {
        quality: 80,
        progressive: true
      },
      png: {
        quality: 80,
        progressive: true
      },
      webp: {
        lossless: true,
        quality: 85
      },
      avif: {
        quality: 80
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
          'ui-vendor': ['@heroicons/react'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: process.env.NODE_ENV === 'development',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      }
    },
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    modulePreload: true,
    reportCompressedSize: false,
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    manifest: true
  },
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },
  preview: {
    port: 4173,
    host: true,
    strictPort: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', '@heroicons/react'],
    exclude: ['@vercel/analytics']
  }
});
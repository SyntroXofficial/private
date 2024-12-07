import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// Configuration for image optimization
const imageOptimizerConfig = {
  jpg: { quality: 80, progressive: true },
  png: { quality: 80, progressive: true },
  webp: { lossless: true, quality: 85 },
  avif: { quality: 80 }
};

// Configuration for compression plugins
const compressionConfig = {
  gzip: { algorithm: 'gzip', ext: '.gz', threshold: 10240 },
  brotli: { algorithm: 'brotliCompress', ext: '.br', threshold: 10240 }
};

// Build configuration
const buildConfig = {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'animation-vendor': ['framer-motion'],
        'ui-vendor': ['@heroicons/react']
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
};

// Server configuration
const serverConfig = {
  port: 3000,
  host: true,
  strictPort: true,
  headers: {
    'Cache-Control': 'public, max-age=31536000'
  }
};

// Preview configuration
const previewConfig = {
  port: 4173,
  host: true,
  strictPort: true
};

// Dependencies optimization configuration
const depsConfig = {
  include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', '@heroicons/react'],
  exclude: ['@vercel/analytics']
};

export default defineConfig({
  plugins: [
    react(),
    compression(compressionConfig.gzip),
    compression(compressionConfig.brotli),
    ViteImageOptimizer(imageOptimizerConfig)
  ],
  build: buildConfig,
  server: serverConfig,
  preview: previewConfig,
  optimizeDeps: depsConfig
});
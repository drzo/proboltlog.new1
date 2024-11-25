import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['tau-prolog'],
    exclude: ['fs', 'path']
  },
  resolve: {
    alias: {
      fs: 'virtual:fs',
      path: 'virtual:path'
    }
  },
  define: {
    'process.env': {},
    global: 'globalThis'
  }
});
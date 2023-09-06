import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['com'],
  },
  build: {
    commonjsOptions: {
      include: [/com/, /node_modules/],
    },
  },
});

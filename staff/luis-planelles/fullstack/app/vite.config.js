import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['com'],
  },
  build: {
    commonjsOptions: {
      include: [/com/, /node_modules/],
    },
  },
});

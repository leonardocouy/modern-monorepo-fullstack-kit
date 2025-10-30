import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src/modules'),
    },
  },
  server: {
    port: 5173,
  },
});

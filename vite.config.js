import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'nginx/dulina-site-visit',
  },
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line
      '@components': path.resolve(__dirname, 'src/components'),
      // eslint-disable-next-line
      '@tarotSketch': path.resolve(__dirname, 'src/components/TarotP5Sketch'),
      // eslint-disable-next-line
      '@sections': path.resolve(__dirname, 'src/components/sections'),
      // eslint-disable-next-line
      '@utils': path.resolve(__dirname, 'src/utils'),
      // eslint-disable-next-line
      '@store': path.resolve(__dirname, 'src/store'),
    },
  },
});

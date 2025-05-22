import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line
      '@components': path.resolve(__dirname, 'src/components'),
      // eslint-disable-next-line
      '@tarotSketch': path.resolve(__dirname, 'src/components/TarotP5Sketch'),
      // eslint-disable-next-line
      '@sections': path.resolve(__dirname, 'src/components/sections'),
    },
  },
});

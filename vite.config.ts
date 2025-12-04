import { defineConfig } from 'vite';

export default defineConfig({
  base: '/dog-treat-game/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});


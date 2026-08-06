import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: false,
  },
  build: {
    sourcemap: true,
    assetsDir: 'assets',
  },
});

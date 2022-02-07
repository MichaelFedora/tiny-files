import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
  root: resolve(__dirname, 'src/'),
  plugins: [ createVuePlugin() ],
  server: {
    port: 6565
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src/')
      }
    ]
  },

  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, 'docs/'),
  }
});

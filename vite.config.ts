/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defaultHost } from './src/config';

const srcPath = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: defaultHost,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': srcPath,
      '~normalize.css': 'normalize.css',
      '~mixin': srcPath + '/assets/styles',
      classnames: 'classnames-es-ts',
    },
  },
  test: {
    global: true, // 添加全局变量
    environment: 'jsdom', // node环境下dom
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "~mixin/mixins.scss";`,
      },
    },
  },
  plugins: [react()],
  publicDir: 'static',
});

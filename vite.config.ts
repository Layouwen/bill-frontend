/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defaultHost } from './src/config';

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
      '@': resolve(__dirname, 'src/'),
      '~normalize.css': 'normalize.css',
      classnames: 'classnames-es-ts',
    },
  },
  test: {
    global: true, // 添加全局变量
    environment: 'jsdom', // node环境下dom
  },
  plugins: [react()],
});

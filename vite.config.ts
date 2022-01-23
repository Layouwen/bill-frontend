/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:3000',
        target: 'http://192.168.0.103:3000',
        // target: 'https://bwrearend.c1.sidoc.cn',
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

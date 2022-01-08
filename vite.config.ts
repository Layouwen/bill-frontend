/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/'),
      classnames: "classnames-es-ts"
    },
  },
  test: {
    global: true, // 添加全局变量
    environment: 'jsdom', // node环境下dom
  },
  plugins: [react()],
});

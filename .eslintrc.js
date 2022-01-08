module.exports = {
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:cypress/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'cypress', 'jest'],
  rules: {
    'react/react-in-jsx-scope': 0, // vite自动引入react不需要手动引入
    'jsx-quotes': 2, // jsx使用双引号
    semi: 2, // 需要分号
    '@typescript-eslint/no-unused-vars': 2, // 不需要未使用的变量
  },
};

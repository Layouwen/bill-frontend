module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 0, // vite自动引入react不需要手动引入
    'jsx-quotes': 2, // jsx使用双引号
    semi: [2, 'never'], // 不需要分号
    '@typescript-eslint/no-unused-vars': 2, // 不需要未使用的变量
  },
}

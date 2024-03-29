module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {},
  extends: [
    './.eslintrc-auto-import.json',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended', // 添加 prettier 插件
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'import', 'simple-import-sort'],
  rules: {
    'no-console': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    // 'import/order': ['error'],
    'vue/multi-word-component-names': 'off',

    'simple-import-sort/imports': 'error',
    // 'simple-import-sort/exports': 'error',
  },
};

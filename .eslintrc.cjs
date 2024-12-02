module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  plugins: ['@stylistic'],
  rules: {
    '@stylistic/indent': ['error', 2],
    '@stylistic/quotes': [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    'prettier/prettier': ['error', { singleQuote: true }],
    'vue/no-multiple-template-root': 'off',
  },
};

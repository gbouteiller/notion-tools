/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {project: true, sourceType: 'module', ecmaVersion: 2020},
  env: {browser: true, es2017: true, node: true},
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['*.cjs'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/ban-types': ['error', {types: {'{}': false}}],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': ["error", { "ignoreRestArgs": true }],
    '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],  
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
};

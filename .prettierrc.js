/** @type {import("prettier").Config} */
export default {
  arrowParens: 'always',
  bracketSpacing: false,
  printWidth: 140,
  proseWrap: 'always',
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  pluginSearchDirs: false,
};

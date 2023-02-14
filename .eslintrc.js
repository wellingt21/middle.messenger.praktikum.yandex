module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  parser: '@typescript-eslint/parser',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.hbs'],
      project: './tsconfig.json'
  },
  ignorePatterns: '**/*/hbs',
  rules: {
  }
}

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
  },
};

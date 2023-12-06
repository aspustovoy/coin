module.exports = {
  root: true,
  plugins: ['prettier', 'jest'],
  extends: ['airbnb-base', 'plugin:jest/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  env: {
    browser: true,
    'jest/globals': true,
  },
  rules: {
    'import/no-cycle': 0,
    'prettier/prettier': 'error',
    'no-var': 'error',
    'no-alert': 0,
    'no-param-reassign': [2, { props: false }],
    'no-plusplus': 0,
    'no-iterator': 0,
    'no-restricted-syntax': [2, 'WithStatement'],
    'func-style': 0,
    // 'ignoreExternal': true,
  },
};

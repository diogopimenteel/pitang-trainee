module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 0,
    'no-console': 0,
    'class-methods-use-this': 0,
    'consistent-return': 0,
    'no-plusplus': 0,
  },
};

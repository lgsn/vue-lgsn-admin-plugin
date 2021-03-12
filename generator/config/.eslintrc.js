module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  globals: {
    Promise: true,
    axios: true,
    android: true,
    _dataFromApp: true,
    ActiveXObject: true
  },
  parserOptions: {
    parser: 'babel-eslint',
  }
};

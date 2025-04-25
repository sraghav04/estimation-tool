module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    // 'no-underscore-dangle': ['error', { allow: ['__get__'] }],
    'no-underscore-dangle': 'off',
  },
};

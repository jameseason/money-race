module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2020': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'google',
  ],
  'parserOptions': {
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 11,
  },
  'plugins': [
    'react',
  ],
  'rules': {
  },
};

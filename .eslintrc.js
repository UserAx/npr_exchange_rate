module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'linebreak-style': 'off',
    'no-console': 'off',
    semi: ['error', 'always'],
    'react/react-in-jsx-scope': 0,
    'react/jsx-uses-react': 0,
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/alt-text': 'off',
    'react/button-has-type': 'off',
    'consistent-return': 'off',
    'no-unused-vars': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/iframe-has-title': 'off',
    'no-loop-func': 'off',
    'no-param-reassign': 'off',
    'react/prop-types': 'off',
    ' react/function-component-definition': 'off',
    'import/no-named-as-default': 'off',
    'react/no-array-index-key': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    "react/jsx-props-no-spreading": [true, {
      "html": "ignore",
      "exceptions": ['']
  }]
  },
};

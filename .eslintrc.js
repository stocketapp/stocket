module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    semi: 'off',
    'no-bracket-spacing': 'off',
    'react/jsx-closing-bracket-location': [1, {
      nonEmpty: 'tag-aligned',
      selfClosing: 'tag-aligned'
    }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-inline-styles': 'off'
  }
};

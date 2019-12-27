module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    semi: 'off',
    'no-bracket-spacing': 'off',
    'react/jsx-closing-bracket-location': [1, {
      nonEmpty: 'tag-aligned',
      selfClosing: 'tag-aligned'
    }]
  }
};

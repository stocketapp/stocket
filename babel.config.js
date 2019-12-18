module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          views: './views',
          components: './components',
          utils: './utils',
          navigation: './navigation',
          // hooks: './hooks',
        },
      },
    ],
  ],
}

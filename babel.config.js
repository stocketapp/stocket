module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        views: './src/views',
        components: './src/components',
        utils: './src/utils',
        navigation: './src/navigation',
        // hooks: './src/hooks',
      },
    ],
  ],
}

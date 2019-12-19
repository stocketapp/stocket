module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        alias: {
          stocket: './',
          views: './src/views',
          components: './src/components',
          utils: './src/utils',
          navigation: './src/navigation',
          'stocket-hooks': './src/hooks',
        },
      },
    ],
  ],
}

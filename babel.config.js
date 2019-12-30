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
          'stocket-components': './src/components',
          utils: './src/utils',
          navigation: './src/navigation',
          'stocket-hooks': './src/hooks',
          'stocket-api': './src/api',
          'stocket-icons': './src/components/Icons',
          StocketTypes: './src/Types',
        },
      },
    ],
  ],
}

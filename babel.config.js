module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          stocket: './',
          views: '/Users/henry/Projects/React Native/stocket/src/views',
          '@components': './src/components',
          '@utils': './src/utils/',
          navigation:
            '/Users/henry/Projects/React Native/stocket/src/navigation',
          hooks: '/Users/henry/Projects/React Native/stocket/src/hooks',
          api: '/Users/henry/Projects/React Native/stocket/src/api',
          icons:
            '/Users/henry/Projects/React Native/stocket/src/components/Icons',
          types: '/Users/henry/Projects/React Native/stocket/src/Types',
        },
      },
    ],
  ],
}

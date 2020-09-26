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
          '@stocket': './',
          '@views': '/Users/henry/Projects/ReactNative/stocket/src/views',
          '@components':
            '/Users/henry/Projects/ReactNative/stocket/src/components',
          '@utils': '/Users/henry/Projects/ReactNative/stocket/src/utils',
          '@navigation':
            '/Users/henry/Projects/ReactNative/stocket/src/navigation',
          '@hooks': './stocket/src/hooks',
          '@api': '/Users/henry/Projects/ReactNative/stocket/src/api',
          '@icons':
            '/Users/henry/Projects/ReactNative/stocket/src/components/Icons',
          types: '/Users/henry/Projects/ReactNative/stocket/src/types',
          '@selector':
            '/Users/henry/Projects/ReactNative/stocket/src/redux/selector.ts',
        },
      },
    ],
  ],
}

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
          '@views': './src/views',
          '@components': './src/components',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
          '@hooks': './stocket/src/hooks',
          '@api': './src/api',
          '@icons': './src/components/Icons',
          types: './src/types',
        },
      },
    ],
  ],
}

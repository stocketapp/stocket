module.exports = {
  presets: [['module:metro-react-native-babel-preset', { useTransformReactJSXExperimental: true }]],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@stocket': './',
          '@views': './src/views',
          '@components': './src/components',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
          '@hooks': './src/hooks',
          '@api': './src/api',
          '@icons': './src/components/Icons',
          types: './src/types',
          '@selectors': './src/redux/selectors.ts',
          '@assets': './src/assets',
          '@products-assets': './src/assets/products',
          '@queries': './src/graphql/queries',
          '@mutations': './src/graphql/mutations',
          '@svg': './src/assets/svg',
          '@styledComponents': './src/components/StyledComponents',
          '@theme': './src/theme.ts',
          '@cache': './src/Cache.ts',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}

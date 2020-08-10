module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        alias: {
          stocket: './',
          views: '/Users/henry/Projects/React Native/stocket/src/views',
          components:
            '/Users/henry/Projects/React Native/stocket/src/components',
          utils: '/Users/henry/Projects/React Native/stocket/src/utils',
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

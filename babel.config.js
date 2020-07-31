module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        alias: {
          stocket: './',
          views: '/Users/henry/Projects/stocket/src/views',
          components: '/Users/henry/Projects/stocket/src/components',
          utils: '/Users/henry/Projects/stocket/src/utils',
          navigation: '/Users/henry/Projects/stocket/src/navigation',
          hooks: '/Users/henry/Projects/stocket/src/hooks',
          api: '/Users/henry/Projects/stocket/src/api',
          icons: '/Users/henry/Projects/stocket/src/components/Icons',
          types: '/Users/henry/Projects/stocket/src/Types',
        },
      },
    ],
  ],
}

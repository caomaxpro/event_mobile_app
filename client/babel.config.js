module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'EVENT_HUB_ENV',
        moduleName: '@env',
        path: './client/.env',
        blocklist: null,
        allowlist: null,
        safe: true,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src', './'],
        alias: {
          '@src': './src',
          '@root': './',
          '@env': './.env',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

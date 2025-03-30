const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

console.log('Resolved @src path:', path.resolve(__dirname, 'src'));

// Custom config for Metro bundler
const config = {
  reanimated: {
    // Disable strict mode
    strict: false,
  },
};

// Merge default config with your custom config
const defaultConfig = getDefaultConfig(__dirname);
const mergedConfig = mergeConfig(defaultConfig, config);

// Wrap with Reanimated-specific Metro config
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);

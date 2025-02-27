const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

console.log('Resolved @src path:', path.resolve(__dirname, 'src'));

// Default config for Metro bundler
const config = {
  
};

// Merge default config with your custom config
const defaultConfig = getDefaultConfig(__dirname);
const mergedConfig = mergeConfig(defaultConfig, config);

// Wrap with Reanimated-specific Metro config if using Reanimated
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from '@src/app/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';

// import store from '@src/redux/store';
// import { Provider } from 'react-redux';
import {SettingProvider} from '@src/context/SettingContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import store from '@src/redux/store';
// import {AuthProvider} from '@src/context/AuthContext';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const Root: React.FC = () => (
  <Provider store={store}>
    <GestureHandlerRootView style={{flex: 1}}>
      <SettingProvider>
        <App />
      </SettingProvider>
    </GestureHandlerRootView>
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);

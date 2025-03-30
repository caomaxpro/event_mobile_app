/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from '@src/app/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import store from '@src/redux/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import {CalendarProvider} from '@src/contexts/CalendarProvider';

// Configure Reanimated logger
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

const Root: React.FC = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <Provider store={store}>
      <CalendarProvider>
        <SafeAreaProvider>
          <KeyboardProvider>
            <App />
          </KeyboardProvider>
        </SafeAreaProvider>
      </CalendarProvider>
    </Provider>
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => Root);

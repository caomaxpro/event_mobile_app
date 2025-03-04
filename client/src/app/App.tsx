/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {defaultStyle} from '@src/styles/defaultStyles';
import SplashScreen from '@src/screens/SplashScreen';
import AuthNavigator from '@src/navigation/AuthNavigator';
import ScreenComponent from '@src/components/ScreenComponent';
import OnboardingScreen from '@src/screens/onboarding/OnboardingScreen';
import {NavigationContainer} from '@react-navigation/native';
import MainTabNavigator from '@src/navigation/MainNavigator';
import LoginScreen from '@src/screens/auth/LoginScreen';
import RegisterScreen from '@src/screens/auth/RegisterScreen';
import VerificationScreen from '@src/screens/auth/VerificationScreen';
import {ResetPasswordScreen} from '@src/screens/auth/ResetPasswordScreen';
// import BASE_URL from '@src/utils/envVariables';
import {loadState} from '@src/utils/storageUtils';
import MainNavigator from '@src/navigation/MainNavigator';
import TabNavigator from '@src/navigation/TabNavigator';
import AppRouters from '@src/navigation/AppRouter';

type user = {
  email: string;
  name: string;
  login: boolean;
};

const user1: user = {
  email: 'lecao1234@gmail.com',
  name: 'Cao Le',
  login: false,
};

function App(): React.JSX.Element {
  return (
    <View style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        translucent={true}
      />

      <NavigationContainer>
        <AppRouters />
      </NavigationContainer>
    </View>

    // <ScreenComponent
    //   customStyle={{flex: 1, width: '100%', height: '100%'}}
    //   contentStyle={{flex: 1, width: '100%', height: '100%'}}
    //   displayBackgroundImage={false}
    //   >

    //   {/* <OnboardingScreen /> */}

    // </ScreenComponent>
  );
}

const styles = StyleSheet.create({});

export default App;

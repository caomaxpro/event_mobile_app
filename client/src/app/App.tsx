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
import AuthNavigator from '@src/navigation/AuthNavigation';
import ScreenComponent from '@src/components/ScreenComponent';
import OnboardingScreen from '@src/screens/onboarding/OnboardingScreen';
import {NavigationContainer} from '@react-navigation/native';
import MainTabNavigator from '@src/navigation/MainNavigation';
import LoginScreen from '@src/screens/auth/LoginScreen';
import RegisterScreen from '@src/screens/auth/RegisterScreen';
import VerificationScreen from '@src/screens/auth/VerificationScreen';
import {ResetPasswordScreen} from '@src/screens/auth/ResetPasswordScreen';
import BASE_URL from '@src/utils/envVariables';

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
  const [splashScreen, setSplashScreen] = useState<boolean>(true);

  useEffect(() => {
    console.log(BASE_URL);

    //   const timer = setTimeout(() => {
    //     setSplashScreen(false);
    //   }, 2000);

    //   return () => clearTimeout(timer);
  });

  return (
    <ScreenComponent>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        translucent={true}
      />

      <ResetPasswordScreen />

      {/* <VerificationScreen /> */}
      {/* <RegisterScreen /> */}
      {/* <LoginScreen /> */}

      {/* <NavigationContainer>
        {user1 && user1.login ? <MainTabNavigator /> : <AuthNavigator />}
      </NavigationContainer> */}

      {/* {splashScreen ? <SplashScreen /> : <AuthNavigator />} */}
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({});

export default App;

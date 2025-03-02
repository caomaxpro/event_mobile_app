import React, {useEffect, useRef, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {Linking} from 'react-native';
import OnboardingScreen from '@src/screens/onboarding/OnboardingScreen';
import LoginScreen from '@src/screens/auth/LoginScreen';
import RegisterScreen from '@src/screens/auth/RegisterScreen';
import {ResetPasswordScreen} from '@src/screens/auth/ResetPasswordScreen';
import VerificationScreen from '@src/screens/auth/VerificationScreen';
import {loadState} from '@src/utils/storageUtils';
import HomeScreen from '@src/screens/home/HomeScreen';

export type RootStackParamList = {
  HomeScreen: undefined;
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  VerificationScreen: undefined;
  ResetPasswordScreen: {isEmailVerified: boolean};
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function AuthNavigator() {
  // fetch user data
  const [user, setUser] = useState<any>();

  useEffect(() => {
    // load state
    const _loadState = async () => {
      const state = await loadState();
      const user = state?.user;

      if (user) {
        setUser(_loadState);
      }
    };

    _loadState();
  }, []);

  // const Stack = createNativeStack

  //   const navigationRef =
  //     useRef<NavigationContainerRef<RootStackParamList>>(null);

  //   useEffect(() => {
  //     const handleDeepLink = (event: {url: string}) => {
  //       const url = event.url;
  //       if (url.includes('reset-password')) {
  //         const token = url.split('token=')[1];

  //         if (token && navigationRef.current) {
  //           navigationRef.current.navigate('ResetPasswordScreen', {token});
  //         }
  //       }
  //     };

  //     // Lắng nghe deep link
  //     const subscription = Linking.addEventListener('url', handleDeepLink);

  //     // Kiểm tra nếu app đã mở sẵn với deep link
  //     Linking.getInitialURL().then(url => {
  //       if (url) handleDeepLink({url});
  //     });

  //     return () => {
  //       subscription.remove();
  //     };
  //   }, []);

  return (
    <RootStack.Navigator
      initialRouteName={user ? 'HomeScreen' : 'LoginScreen'}
      screenOptions={{headerShown: true}}>
      <RootStack.Screen name="HomeScreen" component={HomeScreen} />
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <RootStack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        initialParams={{isEmailVerified: false}}
      />
      <RootStack.Screen
        name="VerificationScreen"
        component={VerificationScreen}
      />
    </RootStack.Navigator>
  );
}

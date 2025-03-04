import React, {useEffect, useRef, useState} from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import {loadState, saveState} from '@src/utils/storageUtils';
import HomeScreen from '@src/screens/bottom_tab/HomeScreen';
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';

export type AuthStackParamList = {
  LoginScreen: undefined;
  OnboardingScreen: undefined;
  RegisterScreen: undefined;
  ResetPasswordScreen: undefined;
  VerificationScreen: undefined;
  DrawerNavigator: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator({navigation}: any) {
  //   const [isViewBoarding, setViewBoarding] = useState<boolean>(false);

  // fetch user data
  //   useEffect(() => {
  //     // load state

  //     const _loadState = async () => {
  //       const state = await loadState();

  //       //   if (!state.user.onboarding_view) {
  //       //     await saveState({
  //       //       ...state,
  //       //       user: {...state.user, onboarding_view: true},
  //       //     });
  //       //   }

  //       setViewBoarding(state.user.onboarding_view);
  //     };

  //     _loadState();
  //   }, []);
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
    <AuthStack.Navigator
      initialRouteName={'LoginScreen'}
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <AuthStack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <AuthStack.Screen
        name="VerificationScreen"
        component={VerificationScreen}
      />
      <AuthStack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </AuthStack.Navigator>
  );
}

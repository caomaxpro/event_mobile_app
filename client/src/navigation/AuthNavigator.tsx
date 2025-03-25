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
  return (
    <AuthStack.Navigator
      initialRouteName={'RegisterScreen'}
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

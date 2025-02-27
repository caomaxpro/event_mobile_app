// AuthNavigator.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@src/screens/auth/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from '@src/screens/onboarding/OnboardingScreen';
import RegisterScreen from '@src/screens/auth/RegisterScreen';

export type AuthStackParamList = {
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

const AuthStack = createStackNavigator();

// interface AuthNavigatorProps {
//   setUser: React.Dispatch<React.SetStateAction<boolean>>;
// }

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

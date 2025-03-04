// MainTabNavigator.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@src/screens/bottom_tab/HomeScreen';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type RootStackParamList = {
  AuthNavigator: undefined;
  DrawerNavigator: undefined;
};

const MainStack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="AuthNavigator" component={AuthNavigator} />
      <MainStack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </MainStack.Navigator>
  );
}

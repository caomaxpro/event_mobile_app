import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@src/screens/bottom_tab/HomeScreen';
import EventScreen from '@src/screens/bottom_tab/EventScreen';
import MapScreen from '@src/screens/bottom_tab/MapScreen';
import ProfileScreen from '@src/screens/bottom_tab/ProfileScreen';

export type TabParamList = {
  HomeScreen: undefined;
  EventScreen: undefined;
  MapScreen: undefined;
  ProfileScreen: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="EventScreen" component={EventScreen} />
      <Tab.Screen name="MapScreen" component={MapScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});

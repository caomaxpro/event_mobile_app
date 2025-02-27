import React, {createContext, useState, useContext, ReactNode} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  useAnimatedReaction,
  withTiming,
} from 'react-native-reanimated';

// Device dimensions
export const DEVICE_WIDTH = Dimensions.get('window').width;

// Item dimensions
export const ITEM_HEIGHT = 50;
export const ITEM_MARGIN = 20;

// Define context type
interface NavigationContextType {}

// Create the context with an initial value
export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);

// Create a provider component
interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const value = {};

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

// Custom hook for easier usage of NavigationContext
export const useNavigationContext = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      'useNavigationContext must be used within a NavigationProvider',
    );
  }
  return context;
};

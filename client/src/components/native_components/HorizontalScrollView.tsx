import {SCREEN_WIDTH} from '@src/utils/appInfo';
import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';

interface CustomScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  scrollViewRef?: any;
}

const CustomHorizontalScrollView: React.FC<CustomScrollViewProps> = ({
  children,
  containerStyle,
  scrollViewRef,
  ...props
}) => {
  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, containerStyle]}
      {...props}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    // paddingHorizontal: 10,
    borderWidth: 2,
    // alignItems: 'center', // Ensures proper alignment
  },
});

export default CustomHorizontalScrollView;

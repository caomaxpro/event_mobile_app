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
}

const CustomHorizontalScrollView: React.FC<CustomScrollViewProps> = ({
  children,
  containerStyle,
  ...props
}) => {
  return (
    <ScrollView
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
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderWidth: 2,
    // alignItems: 'center', // Ensures proper alignment
  },
});

export default CustomHorizontalScrollView;

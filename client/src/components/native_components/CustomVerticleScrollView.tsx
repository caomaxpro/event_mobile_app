import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';

interface CustomScrollViewProps extends ScrollViewProps {
  contentContainerStyle?: ViewStyle;
  children: React.ReactNode;
}

const CustomVerticleScrollView: React.FC<CustomScrollViewProps> = ({
  contentContainerStyle,
  children,
  ...props
}) => {
  const [height, setHeight] = useState<number>(0);

  return (
    <ScrollView
      {...props}
      onLayout={event => {
        setHeight(event.nativeEvent.layout.height);
      }}
      contentContainerStyle={[{height: height}, contentContainerStyle]}
      showsVerticalScrollIndicator={false} // Hide scroll indicator
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    // paddingVertical: 16, // Add vertical padding
    // paddingHorizontal: 16, // Add horizontal padding
  },
});

export default CustomVerticleScrollView;

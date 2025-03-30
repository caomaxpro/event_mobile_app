import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

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
  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    'worklet';
    if (event?.contentOffset?.y !== undefined) {
      scrollOffset.value = event.contentOffset.y;
    }
  });

  return (
    <Animated.ScrollView
      {...props}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      onLayout={event => {
        if (event?.nativeEvent?.layout?.height) {
          setHeight(event.nativeEvent.layout.height);
        }
      }}
      contentContainerStyle={[{height: height}, contentContainerStyle]}
      showsVerticalScrollIndicator={true}
    >
      {children}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    // paddingVertical: 16, // Add vertical padding
    // paddingHorizontal: 16, // Add horizontal padding
  },
});

export default CustomVerticleScrollView;

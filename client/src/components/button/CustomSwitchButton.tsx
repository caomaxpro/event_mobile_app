import React, {useEffect} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import {useReduxSelector} from '@src/hooks/useReduxSelector';

interface CustomSwitchButtonProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  width?: number;
  height?: number;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  disabled?: boolean;
}

const CustomSwitchButton: React.FC<CustomSwitchButtonProps> = ({
  value,
  onValueChange,
  width = 50,
  height = 30,
  activeColor,
  inactiveColor,
  thumbColor = '#FFFFFF',
  disabled = false,
}) => {
  const {theme} = useReduxSelector();

  // Default colors if not provided
  const activeTrackColor = activeColor || theme.primary;
  const inactiveTrackColor = inactiveColor || theme.inputBorder;

  const thumbSize = height - 4; // 2px padding on each side
  const trackPadding = 2;
  const travel = width - thumbSize - trackPadding * 2;

  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(value ? 1 : 0, {
      mass: 1,
      damping: 15,
      stiffness: 120,
      overshootClamping: false,
      restSpeedThreshold: 0.001,
      restDisplacementThreshold: 0.001,
    });
  }, [value]);

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(progress.value * travel, {
            mass: 1,
            damping: 15,
            stiffness: 120,
          }),
        },
      ],
    };
  });

  const trackStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [inactiveTrackColor, activeTrackColor],
    );

    return {
      backgroundColor,
    };
  });

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <Pressable onPress={handlePress} disabled={disabled}>
      <Animated.View
        style={[
          styles.track,
          trackStyle,
          {
            width,
            height,
            borderRadius: height / 2,
            opacity: disabled ? 0.5 : 1,
          },
        ]}>
        <Animated.View
          style={[
            styles.thumb,
            thumbStyle,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: thumbColor,
              margin: trackPadding,
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CustomSwitchButton;

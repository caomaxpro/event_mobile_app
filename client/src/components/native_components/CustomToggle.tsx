import React, {useEffect} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import CustomText from './CustomText';

type CustomToggleProps = {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  sideMessage?: string;
};

const CustomToggle: React.FC<CustomToggleProps> = ({
  value,
  setValue,
  sideMessage,
}) => {
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, {duration: 200});
  }, [value]);

  const toggleSwitch = () => {
    setValue(!value);
  };

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{translateX: progress.value * 15}],
  }));

  const animatedTrackStyle = useAnimatedStyle(() => ({
    backgroundColor: progress.value ? '#4C6EF5' : '#ccc',
  }));

  return (
    <Pressable onPress={toggleSwitch} style={styles.container}>
      <Animated.View style={[styles.switch, animatedTrackStyle]}>
        <Animated.View style={[styles.circle, animatedThumbStyle]} />
      </Animated.View>
      {sideMessage && (
        <CustomText customStyle={styles.label}>{sideMessage}</CustomText>
      )}
    </Pressable>
  );
};

export default CustomToggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    width: 34,
    height: 19,
    borderRadius: 15,
    padding: 2,
    justifyContent: 'center',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 9,
    backgroundColor: '#fff',
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000',
  },
});

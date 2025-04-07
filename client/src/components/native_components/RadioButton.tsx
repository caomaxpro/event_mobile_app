import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import CustomText from './CustomText';

interface RadioOption<T> {
  value: T;
  label: string;
}

interface RadioButtonProps<T> {
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  direction?: 'horizontal' | 'vertical';
}

function RadioButton<T>({
  options,
  value,
  onChange,
  direction = 'horizontal',
}: RadioButtonProps<T>) {
  return (
    <View
      style={[
        styles.container,
        direction === 'horizontal'
          ? styles.horizontalContainer
          : styles.verticalContainer,
      ]}>
      {options.map((option, index) => (
        <Pressable
          key={index}
          style={[
            styles.option,
            direction === 'horizontal' && styles.horizontalOption,
          ]}
          onPress={() => onChange(option.value)}>
          <View style={styles.radio}>
            <View style={styles.outerCircle}>
              {value === option.value && <View style={styles.innerCircle} />}
            </View>
          </View>
          <CustomText customStyle={styles.label}>{option.label}</CustomText>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalContainer: {
    flexDirection: 'column',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  horizontalOption: {
    marginHorizontal: 16,
  },
  radio: {
    marginRight: 8,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#5669FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#5669FF',
  },
  label: {
    fontSize: 16,
    color: '#1A1D1E',
  },
});

export default RadioButton;

import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, TextInput, Platform} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  clamp,
  useDerivedValue,
} from 'react-native-reanimated';
import {useReduxSelector} from '@src/hooks/useReduxSelector';
import CustomText from '../native_components/CustomText';
import {ms, vs, hs} from '@src/utils/rNResponsive';
import {CustomInputFieldCard} from './CustomInputFieldCard';
import CustomContainerComponent from '../native_components/ContainerComponent';
import {InputField} from '@src/types/types';
import {generateRandomArray} from '@src/utils/dummyData';
import ChartItem from './range_input_component/ChartItem';

const THUMB_SIZE = 28;
const THUMB_RADIUS = THUMB_SIZE / 2;
const RANGE_OFFSET = 14;
const TRACK_WIDTH = 250;

interface CustomRangeInputFieldProps {
  minInputField: InputField;
  maxInputField: InputField;
  title?: string;
  showTitle?: boolean;
  minValue?: number;
  maxValue?: number;
  step?: number;
  formatValue?: (value: number) => string;
}

const CustomRangeInputField: React.FC<CustomRangeInputFieldProps> = ({
  maxInputField,
  minInputField,
  title = 'Range',
  showTitle = true,
  minValue = 0,
  maxValue = 1000,
  step = 1,
  formatValue = (value: number) => `$${value.toLocaleString()}`,
}) => {
  const {theme} = useReduxSelector();
  const [sliderWidth, setSliderWidth] = useState(0);
  const [lowValue, setLowValue] = useState(minValue);
  const [highValue, setHighValue] = useState(maxValue);

  // Animated values for both thumbs
  const leftThumbX = useSharedValue(-THUMB_SIZE);
  const rightThumbX = useSharedValue(TRACK_WIDTH);

  const leftRange = useDerivedValue(() => leftThumbX.value + THUMB_SIZE);
  const rangeWidth = useDerivedValue(() => rightThumbX.value - leftRange.value);

  const leftContextX = useSharedValue(0);
  const rightContextX = useSharedValue(TRACK_WIDTH - THUMB_SIZE);

  const leftThumbMoving = useSharedValue<boolean>(false);

  // Convert position to value
  //   const positionToValue = useCallback(
  //     (position: number) => {
  //       'worklet';
  //       const range = maxValue - minValue;
  //       const value =
  //         Math.round(((position / sliderWidth) * range + minValue) / step) * step;
  //       return Math.max(minValue, Math.min(maxValue, value));
  //     },
  //     [sliderWidth, minValue, maxValue, step],
  //   );

  // Convert value to position
  //   const valueToPosition = useCallback(
  //     (value: number) => {
  //       const range = maxValue - minValue;
  //       return ((value - minValue) / range) * sliderWidth;
  //     },
  //     [sliderWidth, minValue, maxValue],
  //   );

  // Update input field
  const updateInputField = useCallback(
    (low: number, high: number) => {
      minInputField.onChange(low.toString());
      maxInputField.onChange(high.toString());
    },
    [minInputField, maxInputField],
  );

  // Handle manual input changes
  //   const handleLowValueChange = (text: string) => {
  //     const value = Math.max(
  //       minValue,
  //       Math.min(highValue - step, Number(text) || minValue),
  //     );
  //     setLowValue(value);
  //     leftThumbX.value = withSpring(valueToPosition(value));
  //     updateInputField(value, highValue);
  //   };

  const handleHighValueChange = (text: string) => {
    const value = Math.max(
      lowValue + step,
      Math.min(maxValue, Number(text) || maxValue),
    );

    // detect rigth bound

    // console.log('right bound', value);

    setHighValue(value);
    // rightThumbX.value = withSpring(valueToPosition(value));
    updateInputField(lowValue, value);
  };

  // Gesture handlers
  const leftPanGesture = Gesture.Pan()
    .onStart(() => {
      leftContextX.value = leftThumbX.value;
      leftThumbMoving.value = true;
    })
    .onUpdate(event => {
      //   console.log('[Left Pan Gesture]:', event.translationX);

      //   const newPosition = contextX.value + event.translationX;

      //   console.log('[Left Pan Gesture]:', newPosition);

      //   leftThumbX.value = newPosition;

      const newPosition = leftContextX.value + event.translationX;
      leftThumbX.value = clamp(
        newPosition,
        -THUMB_SIZE,
        rightThumbX.value - THUMB_SIZE,
      );

      //   console.log('[Left Pan Gesture]:', leftThumbX.value + THUMB_SIZE);

      //   const newValue = positionToValue(leftThumbX.value);
      //   runOnJS(setLowValue)(newValue);
    })
    .onEnd(() => {
      //   const low = positionToValue(leftThumbX.value);
      //   const high = positionToValue(rightThumbX.value);
      //   runOnJS(updateInputField)(low, high);
    });

  const rightPanGesture = Gesture.Pan()
    .onStart(() => {
      rightContextX.value = rightThumbX.value;
      leftThumbMoving.value = false;
    })
    .onUpdate(event => {
      const newPosition = rightContextX.value + event.translationX;
      rightThumbX.value = clamp(
        newPosition,
        leftThumbX.value + THUMB_SIZE,
        TRACK_WIDTH,
      );

      //   console.log('[Right Pan Gesture]:', rightThumbX.value);
      //   console.log('[Right Pan Gesture] sliderWidth:', sliderWidth);

      // detect if the thumb hits the right bound
      if (rightThumbX.value + THUMB_RADIUS > sliderWidth) {
      }

      //   const newValue = positionToValue(rightThumbX.value);
      //   runOnJS(setHighValue)(newValue);
    })
    .onEnd(() => {
      //   const low = positionToValue(leftThumbX.value);
      //   const high = positionToValue(rightThumbX.value);
      //   runOnJS(updateInputField)(low, high);
    });

  // Animated styles
  const leftThumbStyle = useAnimatedStyle(() => ({
    transform: [{translateX: leftThumbX.value}],
  }));

  const rightThumbStyle = useAnimatedStyle(() => ({
    transform: [{translateX: rightThumbX.value}],
  }));

  const rangeStyle = useAnimatedStyle(() => ({
    left: leftRange.value,
    width: rangeWidth.value,
  }));

  // Initialize slider
  const onLayout = useCallback(
    (event: any) => {
      const width = event.nativeEvent.layout.width - THUMB_SIZE;
      setSliderWidth(width);

      // Set initial positions
      const initialLow = minValue;
      const initialHigh = maxValue;

      //   leftThumbX.value = valueToPosition(initialLow);
      //   rightThumbX.value = valueToPosition(initialHigh);

      setLowValue(initialLow);
      setHighValue(initialHigh);
      updateInputField(initialLow, initialHigh);
    },
    [minValue, maxValue, updateInputField],
  );

  return (
    <CustomInputFieldCard title={title} showTitle={showTitle}>
      <CustomContainerComponent
        customStyle={[styles.container, {borderColor: theme.inputBorder}]}
        contentStyle={{display: 'flex', flexDirection: 'column'}}>
        {/* <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                {color: theme.textInput, fontFamily: theme.fontFamily},
              ]}
              value={String(lowValue)}
              keyboardType="numeric"
              placeholder={String(minValue)}
              placeholderTextColor={theme.placeHolder}
            />
          </View>
          <CustomText customStyle={styles.separator}>-</CustomText>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                {color: theme.textInput, fontFamily: theme.fontFamily},
              ]}
              value={String(highValue)}
              onChangeText={handleHighValueChange}
              keyboardType="numeric"
              placeholder={String(maxValue)}
              placeholderTextColor={theme.placeHolder}
            />
          </View>
        </View> */}

        <CustomContainerComponent
          customStyle={styles.chartContainer}
          contentStyle={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            // alignContent: 'flex-start',
            // overflow: 'visible',
          }}>
          {generateRandomArray().map((item, index) => {
            return (
              <ChartItem
                key={index.toString()}
                index={index}
                leftThumbMoving={leftThumbMoving.value}
                leftThumbX={leftThumbX}
                rightThumbX={rightThumbX}
                height={useSharedValue(item)}
                left={useSharedValue(index * 25)}
              />
            );
          })}
        </CustomContainerComponent>

        <CustomContainerComponent customStyle={styles.track}>
          <Animated.View style={[styles.range, rangeStyle]} />

          <GestureDetector gesture={leftPanGesture}>
            <Animated.View
              style={[
                styles.thumb,
                {borderTopRightRadius: 0, borderBottomRightRadius: 0},
                {backgroundColor: theme.primary},
                leftThumbStyle,
              ]}
            />
          </GestureDetector>

          <GestureDetector gesture={rightPanGesture}>
            <Animated.View
              style={[
                styles.thumb,
                {borderTopLeftRadius: 0, borderBottomLeftRadius: 0},
                {backgroundColor: theme.primary},
                rightThumbStyle,
              ]}
            />
          </GestureDetector>
        </CustomContainerComponent>
      </CustomContainerComponent>
    </CustomInputFieldCard>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // padding: 16,
    // borderWidth: 2,
    borderRadius: 12,
    height: 100,
    width: 317,
    overflow: 'visible',
  },

  chartContainer: {
    position: 'absolute',
    height: 100,
    width: 250,
    borderWidth: 1,
    bottom: -100,
    // overflow: 'visible',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    flex: 1,
    maxWidth: 120,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 16,
    textAlign: 'center',
    padding: 0,
  },
  separator: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  track: {
    position: 'absolute',
    bottom: -114,
    width: TRACK_WIDTH,
    height: 28,
    borderRadius: 2,
    backgroundColor: 'transparent',
    overflow: 'visible',
  },

  range: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 28,
    borderRadius: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  thumb: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 50,
    top: 0,
    left: 0,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  label: {
    fontSize: 12,
    opacity: 0.7,
  },
});

export default CustomRangeInputField;

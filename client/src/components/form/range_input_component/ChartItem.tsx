import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {AnimatedCustomContainerComponent} from '@src/components/native_components/ContainerComponent';

type ChartItemProps = {
  index: number;
  leftThumbMoving: boolean;
  leftThumbX: SharedValue<number>;
  rightThumbX: SharedValue<number>;
  height: SharedValue<number>;
  left: SharedValue<number>;
};

const ChartItem: React.FC<ChartItemProps> = ({
  index,
  leftThumbMoving,
  leftThumbX,
  rightThumbX,
  height,
  left,
}) => {
  const width = useSharedValue<number>(25);
  const itemWidth = useSharedValue<number>(25);
  const animatedColor = useSharedValue<string>('blue');

  useAnimatedReaction(
    () => {
      return {leftThumbX: leftThumbX.value, rightThumbX: rightThumbX.value};
    },
    ({leftThumbX, rightThumbX}) => {
      const leftThumbXY = leftThumbX + 28;

      const leftRange = Math.trunc(leftThumbXY / width.value);
      const rightRange = Math.trunc(rightThumbX / width.value);

      console.log(
        '[Chart Item]: ',
        leftThumbXY / width.value === rightThumbX / width.value,
        leftRange,
        rightRange,
      );

      if (index >= leftRange && index <= rightRange) {
        animatedColor.value = 'red';
      } else if (index < leftRange || index > rightRange) {
        animatedColor.value = 'blue';
      }

      if (leftThumbXY / width.value === rightThumbX / width.value) {
        animatedColor.value = 'blue';
      }
    },
    [leftThumbX, rightThumbX],
  );

  const animatedChartItemStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: height.value,
    width: itemWidth.value,
    backgroundColor: animatedColor.value,
  }));

  return (
    <AnimatedCustomContainerComponent
      customStyle={{
        height: height.value,
        position: 'absolute',
        bottom: -100,
        left: left.value,
        width: 25,
        backgroundColor: 'lightblue',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderTopLeftRadius: 7.5,
        borderTopRightRadius: 7.5,
      }}>
      {/* <Text>{index}</Text> */}
      <Animated.View style={[animatedChartItemStyle]} />
    </AnimatedCustomContainerComponent>
  );
};

export default ChartItem;

const styles = StyleSheet.create({});

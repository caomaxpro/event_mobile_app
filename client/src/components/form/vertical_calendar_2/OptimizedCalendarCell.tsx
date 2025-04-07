import React, {memo, useCallback, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import CustomText from '@src/components/native_components/CustomText';
import {CalendarDayItem, useCalendar} from '@src/contexts/CalendarProvider';
import {DRAGGER_COLORS} from '@src/contexts/CalendarProvider';
import {CALENDAR_CONSTANTS} from './constants';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface OptimizedCalendarCellProps {
  item: CalendarDayItem;
  isInRange: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  isMovableDay: boolean;
  onPress: () => void;
}

const OptimizedCalendarCell: React.FC<OptimizedCalendarCellProps> = React.memo(
  ({item, isInRange, isStartDate, isEndDate, isMovableDay, onPress}) => {
    // const backgroundColor = useSharedValue('transparent');
    // const borderTopLeftRadius = useSharedValue(5);
    // const borderBottomLeftRadius = useSharedValue(5);
    // const borderTopRightRadius = useSharedValue(5);
    // const borderBottomRightRadius = useSharedValue(5);

    // useEffect(() => {
    //   console.log(
    //     `Item: ${item.day}, isInRange: ${isInRange}, isMovableDay: ${isMovableDay}, isStartDate: ${isStartDate}, isEndDate: ${isEndDate}`,
    //   );
    // }, [isInRange, isMovableDay, isStartDate, isEndDate]);

    // useEffect(() => {
    //   console.log(`[Optimized Calendar Cell]: Re-rendering`);
    // }, []);

    // const animatedStyle = useAnimatedStyle(() => {
    //   // console.log(
    //   //   `Item: ${item.day}, isInRange: ${isInRange}, isMovableDay: ${isMovableDay}, isStartDate: ${isStartDate}, isEndDate: ${isEndDate}`,
    //   // );

    //   return {
    //     backgroundColor: withSpring(
    //       isInRange
    //         ? DRAGGER_COLORS.IN_RANGE
    //         : isMovableDay
    //         ? DRAGGER_COLORS.MOVABLE
    //         : isStartDate || isEndDate
    //         ? DRAGGER_COLORS.SELECTED
    //         : 'transparent',
    //       {damping: 15, stiffness: 100},
    //     ),
    //     borderTopLeftRadius: withSpring(isStartDate ? 20 : 5, {
    //       damping: 15,
    //       stiffness: 100,
    //     }),
    //     borderBottomLeftRadius: withSpring(isStartDate ? 20 : 5, {
    //       damping: 15,
    //       stiffness: 100,
    //     }),
    //     borderTopRightRadius: withSpring(isEndDate ? 20 : 5, {
    //       damping: 15,
    //       stiffness: 100,
    //     }),
    //     borderBottomRightRadius: withSpring(isEndDate ? 20 : 5, {
    //       damping: 15,
    //       stiffness: 100,
    //     }),
    //   };
    // }, [isInRange, isMovableDay, isStartDate, isEndDate]);

    const cellStyle = {
      backgroundColor: isInRange
        ? DRAGGER_COLORS.IN_RANGE
        : isMovableDay
        ? DRAGGER_COLORS.MOVABLE
        : isStartDate || isEndDate
        ? DRAGGER_COLORS.SELECTED
        : 'transparent',
      borderTopLeftRadius: isStartDate ? 20 : 5,
      borderBottomLeftRadius: isStartDate ? 20 : 5,
      borderTopRightRadius: isEndDate ? 20 : 5,
      borderBottomRightRadius: isEndDate ? 20 : 5,
    };

    // useEffect(() => {
    //   backgroundColor.value = withSpring(
    //     isInRange
    //       ? DRAGGER_COLORS.IN_RANGE
    //       : isMovableDay
    //       ? DRAGGER_COLORS.MOVABLE
    //       : isStartDate || isEndDate
    //       ? DRAGGER_COLORS.SELECTED
    //       : 'transparent',
    //   );

    //   borderTopLeftRadius.value = withSpring(isStartDate ? 20 : 5);
    //   borderBottomLeftRadius.value = withSpring(isStartDate ? 20 : 5);
    //   borderTopRightRadius.value = withSpring(isEndDate ? 20 : 5);
    //   borderBottomRightRadius.value = withSpring(isEndDate ? 20 : 5);
    // }, [isInRange, isMovableDay, isStartDate, isEndDate]);

    return (
      <TouchableOpacity
        disabled={item.day === 0}
        style={[{opacity: item.day === 0 ? 0 : 1}, styles.cell]}
        onPress={() => {
          onPress();
        }}>
        <Animated.View style={[styles.pressable, cellStyle]}>
          <CustomText>{item.day > 0 ? item.day : ''}</CustomText>
        </Animated.View>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => prevProps.item === nextProps.item,
  // prevProps.isInRange === nextProps.isInRange &&
  // prevProps.isMovableDay === nextProps.isMovableDay &&
  // prevProps.isStartDate === nextProps.isStartDate &&
  // prevProps.isEndDate === nextProps.isEndDate,
);

export default OptimizedCalendarCell;

const styles = StyleSheet.create({
  cell: {
    width: CALENDAR_CONSTANTS.CELL_SIZE,
    height: CALENDAR_CONSTANTS.CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  head: {
    backgroundColor: DRAGGER_COLORS.SELECTED,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  tail: {
    backgroundColor: DRAGGER_COLORS.SELECTED,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  inRange: {
    backgroundColor: DRAGGER_COLORS.IN_RANGE,
  },
  movable: {
    backgroundColor: DRAGGER_COLORS.MOVABLE,
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inRangeText: {
    color: 'white',
  },
});

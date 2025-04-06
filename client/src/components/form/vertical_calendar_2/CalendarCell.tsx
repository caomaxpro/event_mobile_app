import React, {useEffect, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  CALENDAR_UI_CONSTANTS,
  CalendarDayItem,
  useCalendar,
  DRAGGER_COLORS,
} from '@src/contexts/CalendarProvider';
import {getCoordinatesFromIndex} from '@src/contexts/CalendarProvider';
import {iteratee} from 'lodash';
import {ColorValue} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

interface CalendarCellProps {
  index: number;
  item: CalendarDayItem;
}

const CalendarCell: React.FC<CalendarCellProps> = React.memo(
  ({index, item}) => {
    const cellX = useSharedValue<number>(0);
    const cellY = useSharedValue<number>(0);
    const contextX = useSharedValue<number>(0);
    const contextY = useSharedValue<number>(0);
    const isToday = useSharedValue<boolean>(false);
    const isHead = useSharedValue<boolean>(false);
    const isTail = useSharedValue<boolean>(false);
    const isInRange = useSharedValue<boolean>(false);
    const isMoving = useSharedValue<boolean>(false);
    const isSelected = useSharedValue<boolean>(false);
    const cellColor = useSharedValue<ColorValue>(DRAGGER_COLORS.DEFAULT);

    const {
      scrollOffset,
      leftX,
      leftY,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      selectionMode,
    } = useCalendar();

    // useEffect - calculate cell position

    const animatedStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: cellColor.value,
        transform: [{translateX: 0}, {translateY: 0}],
      };
    });

    const handlePress = () => {};

    const handleCellSelection = useCallback(() => {
      'worklet';
      isSelected.value = !isSelected.value;
      if (isSelected.value) {
        cellColor.value = DRAGGER_COLORS.SELECTED;
      } else {
        cellColor.value = DRAGGER_COLORS.DEFAULT;
      }
    }, []);

    //   useAnimatedReaction(
    //     () => {
    //       return scrollOffset.value.y;
    //     },
    //     (current, previous) => {
    //       const offsetY = current - Math.trunc(current / 400) * 400;
    //       cellY.value = contextY.value + offsetY;
    //     },
    //     [scrollOffset],
    //   );

    const tapGesture = useMemo(
      () => Gesture.Tap().maxDuration(250).onStart(handleCellSelection),
      [handleCellSelection],
    );

    const longerTapGesture = Gesture.LongPress()
      .minDuration(1500)
      .onStart(() => {});

    return (
      <View style={[styles.cell]}>
        <GestureDetector gesture={tapGesture}>
          <Animated.View style={[styles.pressable, animatedStyle]}>
            <Text style={styles.cellText}>{item.day}</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    );
  },
  (prev, next) => {
    return (
      prev.index === next.index &&
      prev.item.date.getTime() === next.item.date.getTime()
    );
  },
);

const styles = StyleSheet.create({
  cell: {
    width: 50,
    height: 50,
    borderRadius: 0,
    borderWidth: 0,
    // position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  pressable: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    // backgroundColor: 'green',
  },
  cellText: {
    fontSize: 16,
    color: '#000000',
  },
  today: {
    backgroundColor: '#E3F2FD',
  },
  todayText: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  selected: {
    backgroundColor: '#2196F3',
  },
  selectedText: {
    color: 'white',
  },
  otherMonth: {
    opacity: 0.5,
  },
  otherMonthText: {
    color: '#757575',
  },
  pastDay: {
    opacity: 0.7,
  },
  pastDayText: {
    color: '#FF3B30',
  },
  disabled: {
    opacity: 0.3,
  },
  disabledText: {
    color: '#9E9E9E',
  },
  eventIndicators: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 2,
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});

export default React.memo(CalendarCell, (prev, next) => {
  // Custom comparison for better performance
  return (
    prev.index === next.index &&
    prev.item.day === next.item.day &&
    prev.item.isToday === next.item.isToday &&
    prev.item.isSelected === next.item.isSelected &&
    prev.item.isInRange === next.item.isInRange &&
    prev.item.isDisabled === next.item.isDisabled &&
    prev.item.isPastDay === next.item.isPastDay
  );
});

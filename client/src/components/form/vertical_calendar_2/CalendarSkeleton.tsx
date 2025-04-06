import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CALENDAR_CONSTANTS} from './constants';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

const CalendarSkeleton: React.FC = () => {
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, {duration: 1000}),
        withTiming(0.3, {duration: 1000}),
      ),
      -1,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={styles.container}>
      {/* Month Header */}
      <View style={styles.monthHeader}>
        <Animated.View style={[styles.monthText, animatedStyle]} />
      </View>

      {/* Week Days Header */}
      <View style={styles.weekDaysHeader}>
        {weekDays.map((_, index) => (
          <View key={index} style={styles.weekDayCell}>
            <Animated.View style={[styles.weekDayText, animatedStyle]} />
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      {[...Array(6)].map((_, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {[...Array(7)].map((_, colIndex) => (
            <View key={`${rowIndex}-${colIndex}`} style={styles.cellContainer}>
              <Animated.View style={[styles.cell, animatedStyle]} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CALENDAR_CONSTANTS.TOTAL_WIDTH,
    height: CALENDAR_CONSTANTS.TOTAL_HEIGHT,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  monthHeader: {
    height: CALENDAR_CONSTANTS.MONTH_HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    width: 120,
    height: 24,
    backgroundColor: '#E1E1E1',
    borderRadius: 4,
  },
  weekDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: CALENDAR_CONSTANTS.WEEKDAY_HEADER_HEIGHT,
    marginBottom: 8,
  },
  weekDayCell: {
    width: CALENDAR_CONSTANTS.CELL_SIZE,
    alignItems: 'center',
  },
  weekDayText: {
    width: 30,
    height: 16,
    backgroundColor: '#E1E1E1',
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: CALENDAR_CONSTANTS.CELL_ROW_HEIGHT,
  },
  cellContainer: {
    width: CALENDAR_CONSTANTS.CELL_SIZE,
    height: CALENDAR_CONSTANTS.CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    width: CALENDAR_CONSTANTS.CELL_SIZE * 0.8,
    height: CALENDAR_CONSTANTS.CELL_SIZE * 0.8,
    backgroundColor: '#E1E1E1',
    borderRadius: 4,
  },
});

export default CalendarSkeleton;

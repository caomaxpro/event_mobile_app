import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Calendar, useDateRange} from '@marceloterreiro/flash-calendar';
import {SCREEN_WIDTH} from '@src/utils/appInfo';
import CalendarErrorBoundary from '../ErrorBoundary';

const CALENDAR_CONSTANTS = {
  WIDTH: SCREEN_WIDTH * 0.9,
  HEIGHT: 450,
} as const;

const SnapVerticalCalender_Test = () => {
  const {
    calendarActiveDateRanges,
    onCalendarDayPress,
    dateRange,
    isDateRangeValid,
    onClearDateRange,
  } = useDateRange();

  return (
    <View style={styles.container}>
      <Calendar.List
        //   style={styles.calendar}
        calendarActiveDateRanges={calendarActiveDateRanges}
        onCalendarDayPress={onCalendarDayPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  calendar: {
    width: CALENDAR_CONSTANTS.WIDTH,
    height: CALENDAR_CONSTANTS.HEIGHT,
    borderWidth: 2,
  },
});

export default SnapVerticalCalender_Test;

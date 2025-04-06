import React, {useMemo, useCallback, useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import OptimizedCalendarCell from './OptimizedCalendarCell';
import {useCalendar} from '@src/contexts/CalendarProvider';
import CustomText from '@src/components/native_components/CustomText';
import {CALENDAR_CONSTANTS} from './constants';
import {CalendarDayItem} from '@src/contexts/CalendarProvider';

interface CalendarItemProps {
  itemMonth: number;
  itemYear: number;
}

const generateCalendarDays = (
  year: number,
  month: number,
): CalendarDayItem[] => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days: CalendarDayItem[] = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push({
      day: 0,
      date: new Date(year, month, -firstDay + i + 1),
      index: i,
      isToday: false,
      isSelected: false,
      isInRange: false,
      isDisabled: true,
      isMovable: false,
      isPastDay: true,
      coordinate: {
        row: Math.floor(i / 7),
        col: i % 7,
      },
    });
  }

  // Add actual days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const index = firstDay + i - 1;
    days.push({
      day: i,
      date,
      index,
      isToday: date.getTime() === today.getTime(),
      isSelected: false,
      isInRange: false,
      isDisabled: false,
      isMovable: false,
      isPastDay: date < today,
      coordinate: {
        row: Math.floor(index / 7),
        col: index % 7,
      },
    });
  }

  // Fill remaining cells in the last week
  const remainingCells = 42 - days.length; // 6 rows × 7 days = 42 total cells
  for (let i = 0; i < remainingCells; i++) {
    const index = days.length;
    days.push({
      day: 0,
      date: new Date(year, month + 1, i + 1),
      index,
      isToday: false,
      isSelected: false,
      isInRange: false,
      isDisabled: true,
      isMovable: false,
      isPastDay: true,
      coordinate: {
        row: Math.floor(index / 7),
        col: index % 7,
      },
    });
  }

  return days;
};

const MonthHeader: React.FC<{month: number; year: number}> = React.memo(
  ({month, year}) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return (
      <View style={styles.monthHeader}>
        <CustomText customStyle={styles.monthText}>
          {monthNames[month]} {year}
        </CustomText>
      </View>
    );
  },
);

const WeekDaysHeader: React.FC = React.memo(() => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={styles.weekDaysHeader}>
      {weekDays.map((day, index) => (
        <View key={index} style={styles.weekDayCell}>
          <CustomText customStyle={styles.weekDayText}>{day}</CustomText>
        </View>
      ))}
    </View>
  );
});

const CalendarItem: React.FC<CalendarItemProps> = ({itemMonth, itemYear}) => {
  const {
    startDate,
    endDate,
    movableDay,
    generateCalendarDays,
    handleCellPress,
  } = useCalendar();

  const [days, setDays] = useState<CalendarDayItem[]>(
    generateCalendarDays(itemYear, itemMonth),
  );

  useEffect(() => {
    const newDays = generateCalendarDays(itemYear, itemMonth).map(day => {
      const isInRange =
        startDate &&
        endDate &&
        day.date >= startDate.date &&
        day.date <= endDate.date;

      return {
        ...day,
        isSelected: isInRange,
        isInRange,
      };
    });

    setDays(
      newDays.map(day => ({
        ...day,
        isSelected: !!day.isSelected,
        isInRange: !!day.isInRange,
      })),
    );
  }, [startDate, endDate, itemMonth, itemYear]);

  return (
    <View style={styles.container}>
      <MonthHeader month={itemMonth} year={itemYear} />
      <WeekDaysHeader />
      {Array.from({length: 6}).map((_, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {days.slice(rowIndex * 7, (rowIndex + 1) * 7).map((day, colIndex) => (
            <OptimizedCalendarCell
              key={`${rowIndex}-${colIndex}`}
              item={day}
              isHead={startDate?.date.getTime() === day.date.getTime()}
              isTail={endDate?.date.getTime() === day.date.getTime()}
              isInRange={
                !!(
                  startDate?.date &&
                  endDate?.date &&
                  day.date >= startDate.date &&
                  day.date <= endDate.date
                )
              }
              isSelected={
                startDate?.date.getTime() === day.date.getTime() ||
                endDate?.date.getTime() === day.date.getTime()
              }
              isMovable={day.isMovable}
              onPress={() => handleCellPress(day)}
            />
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
  },
  monthHeader: {
    height: CALENDAR_CONSTANTS.MONTH_HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  weekDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: CALENDAR_CONSTANTS.WEEKDAY_HEADER_HEIGHT,
  },
  weekDayCell: {
    width: CALENDAR_CONSTANTS.CELL_SIZE,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 14,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: CALENDAR_CONSTANTS.CELL_ROW_HEIGHT,
  },
});

export default CalendarItem;

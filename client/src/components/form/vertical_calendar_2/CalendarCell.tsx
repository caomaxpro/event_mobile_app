import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {CalendarDayItem} from '@src/contexts/CalendarProvider';
import CustomText from '@src/components/native_components/CustomText';

interface CalendarCellProps {
  day: CalendarDayItem;
  onPress: () => void;
}

const CalendarCell: React.FC<CalendarCellProps> = React.memo(
  ({day, onPress}) => {
    const animatedStyle = useAnimatedStyle(() => ({
      backgroundColor: day.isSelected
        ? 'rgba(86, 105, 255, 0.85)'
        : day.isInRange
        ? 'rgba(86, 105, 255, 0.35)'
        : 'transparent',
    }));

    if (day.day === 0) {
      return <Animated.View style={[styles.cell, styles.emptyCell]} />;
    }

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={day.isDisabled}
        style={styles.touchable}>
        <Animated.View style={[styles.cell, animatedStyle]}>
          <CustomText
            style={[
              styles.text,
              day.isToday && styles.today,
              day.isDisabled && styles.disabled,
              (day.isSelected || day.isInRange) && styles.selectedText,
            ]}>
            {day.day}
          </CustomText>
        </Animated.View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    aspectRatio: 1,
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  emptyCell: {
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  today: {
    fontWeight: 'bold',
    color: '#5669FF',
  },
  disabled: {
    color: '#ccc',
  },
  selectedText: {
    color: '#fff',
  },
});

export default CalendarCell;

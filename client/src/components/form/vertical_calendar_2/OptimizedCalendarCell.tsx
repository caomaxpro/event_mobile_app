import React, {memo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import CustomText from '@src/components/native_components/CustomText';
import {CalendarDayItem} from '@src/contexts/CalendarProvider';
import {DRAGGER_COLORS} from '@src/contexts/CalendarProvider';
import {CALENDAR_CONSTANTS} from './constants';

interface OptimizedCalendarCellProps {
  item: CalendarDayItem;
  isHead: boolean;
  isTail: boolean;
  isInRange: boolean;
  isMovable: boolean; // Keeping for compatibility but not using it
  isSelected: boolean;
  onPress: () => void;
}

const OptimizedCalendarCell: React.FC<OptimizedCalendarCellProps> = ({
  item,
  isHead,
  isTail,
  isInRange,
  isMovable,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={item.day === 0}
      style={[{opacity: item.day === 0 ? 0 : 1}, styles.cell]}
      onPress={onPress}>
      <View
        style={[
          styles.pressable,
          isHead && styles.head,
          isTail && styles.tail,
          isInRange && styles.inRange,
          isMovable && styles.movable,
        ]}>
        <CustomText
          customStyle={[
            isSelected && styles.selectedText,
            isInRange && styles.inRangeText,
          ]}>
          {item.day > 0 ? item.day : ''}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

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

// Use React.memo with a custom comparison function for optimal performance
export default memo(
  OptimizedCalendarCell,
  (prev, next) =>
    prev.item.day === next.item.day &&
    prev.isHead === next.isHead &&
    prev.isTail === next.isTail &&
    prev.isInRange === next.isInRange &&
    prev.isSelected === next.isSelected &&
    prev.isMovable == next.isMovable,
);

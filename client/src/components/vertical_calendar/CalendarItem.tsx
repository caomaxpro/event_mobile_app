import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ViewProps} from 'react-native';
import {SCREEN_WIDTH} from '@src/utils/appInfo';
import CustomText from '../native_components/CustomText';
import CustomButton from '../native_components/ButtonComponent';
import CustomIcon from '../native_components/CustomIcon';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {DraggingButton} from '@src/assets/svg/bottom_bar_svg/DraggingButton';
import CalendarDragger from './CalendarDraggerComponent';
import {CalendarDayItem, useCalendar} from '@src/contexts/CalendarProvider';

type CalendarItemProps = ViewProps & {
  itemMonth: number;
  itemYear: number;
};

const AnimatedDraggingButton = Animated.createAnimatedComponent(DraggingButton);

const CalendarItem: React.FC<CalendarItemProps> = ({itemMonth, itemYear}) => {
  const calendarHook = useCalendar();

  const [days, setDays] = useState<CalendarDayItem[]>(() => {
    return calendarHook.generateCalendarDays(itemYear, itemMonth);
  });

  // Update isToday flag khi component mount

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        {/* <CustomButton
          customStyle={styles.arrowButton}
          onPress={() => calendarHook.changeCalander('previous')}>
          <CustomIcon type="AntDesign" name="left" size={22}></CustomIcon>
        </CustomButton> */}
        <CustomText>
          {calendarHook.formatMonthYear(new Date(itemYear, itemMonth + 1, 0))}
        </CustomText>
        {/* <CustomButton
          customStyle={styles.arrowButton}
          onPress={() => calendarHook.changeCalander('next')}>
          <CustomIcon type="AntDesign" name="right" size={22}></CustomIcon>
        </CustomButton> */}
      </View>
      <View style={styles.daysWrapper}>
        <CalendarDragger
          isLeft={true}
          draggerStyle={calendarHook.leftDraggerStyle}
          panGesture={calendarHook.leftDragger}
          draggerMonth={calendarHook.leftDraggerMonth}
          draggerYear={calendarHook.leftDraggerYear}
          currentMonth={itemMonth}
          currentYear={itemYear}
        />

        <CalendarDragger
          draggerStyle={calendarHook.rightDraggerStyle}
          panGesture={calendarHook.rightDragger}
          draggerMonth={calendarHook.rightDraggerMonth}
          draggerYear={calendarHook.rightDraggerYear}
          currentMonth={itemMonth}
          currentYear={itemYear}
        />

        {/* Rest of your calendar cells */}
        {days.map((item, index) => {
          return (
            <View
              key={index.toString()}
              //   onLayout={event => {
              //     const coordinate: `${number},${number}` = `${item.coordinate.row},${item.coordinate.col}`;
              //     setDayCells(prev => ({
              //       ...prev,
              //       [coordinate]: index,
              //     }));
              //   }}
              style={{
                width: 50,
                height: 50,
                borderWidth: 0,
                borderRadius: 5,
                elevation: 5,
                backgroundColor: item.isSelected
                  ? '#007AFF'
                  : item.isInRange
                  ? '#E5F1FF'
                  : item.isPastDay
                  ? '#FFE5E5' // Màu đỏ nhạt cho ngày trong quá khứ
                  : 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: item.isSelected
                    ? 'white'
                    : item.isPastDay
                    ? '#FF3B30' // Màu text đỏ đậm cho ngày trong quá khứ
                    : 'black',
                  fontWeight: item.isToday ? 'bold' : 'normal',
                }}>
                {item.day}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

// Thêm memo với custom comparison function
export default React.memo(CalendarItem, (prevProps, nextProps) => {
  // Only compare the basic month/year props since they determine the calendar's content
  return (
    prevProps.itemMonth === nextProps.itemMonth &&
    prevProps.itemYear === nextProps.itemYear
  );
});

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.9,
    height: 450,
    // borderWidth: 2,
    // borderRadius: 12,
    overflow: 'visible',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    // columnGap: 10,
    rowGap: 10,
  },

  containerHeader: {
    width: 50 * 6 + 3 * 7,
    height: 50,
    // borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  daysWrapper: {
    width: 50 * 6 + 3 * 5,
    // borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
  },

  arrowButton: {
    height: 35,
    width: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

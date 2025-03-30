import {throttle} from 'lodash';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ViewToken,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import CalendarItem from './CalendarItem';
import {SCREEN_WIDTH} from '@src/utils/appInfo';
import CalendarErrorBoundary from '../ErrorBoundary';
import {
  CalendarProvider,
  useCalendar,
  CALENDAR_UI_CONSTANTS,
} from '@src/contexts/CalendarProvider';
import {runOnJS, useAnimatedReaction} from 'react-native-reanimated';

// Constants for calendar dimensions
const CALENDAR_CONSTANTS = {
  WIDTH: SCREEN_WIDTH * 0.9,
  HEIGHT: 450,
  SNAP_INTERVAL: 450,
} as const;

// Constants
const INITIAL_LOAD_MONTHS = 12; // Load 12 tháng ban đầu
const LOAD_MORE_THRESHOLD = 2; // Load thêm khi còn 2 tháng
const MONTHS_PER_LOAD = 6; // Load thêm 6 tháng mỗi lần
const MAX_YEARS_RANGE = 5; // Giới hạn 5 năm về quá khứ và tương lai

interface CalendarRange {
  startDate: Date;
  endDate: Date;
}

interface CalendarMonth {
  month: number;
  year: number;
}

const SnapVerticalCalenderInner = () => {
  const YEARS_RANGE = 5; // 5 năm trước và sau hiện tại
  const TOTAL_MONTHS = YEARS_RANGE * 2 * 12; // 120 tháng

  const calendarHook = useCalendar();

  // Thêm hàm tính index của tháng hiện tại
  const getCurrentMonthIndex = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const startYear = currentYear - YEARS_RANGE;

    return (currentYear - startYear) * 12 + currentMonth;
  };

  // Cập nhật INITIAL_SCROLL_INDEX
  const INITIAL_SCROLL_INDEX = getCurrentMonthIndex();

  const [viewableIndex, setViewableIndex] = useState(INITIAL_SCROLL_INDEX);
  const flatListRef = useRef<FlatList>(null);

  // Pre-load all months at initialization
  const [calendars] = useState<CalendarMonth[]>(() => {
    const currentDate = new Date();
    const startYear = currentDate.getFullYear() - YEARS_RANGE;
    const months: CalendarMonth[] = [];

    for (let year = startYear; year <= startYear + YEARS_RANGE * 2; year++) {
      for (let month = 0; month < 12; month++) {
        months.push({month, year});
      }
    }
    return months;
  });

  // Add function to scroll to next month
  const scrollToNextMonth = useCallback(() => {
    if (flatListRef.current && viewableIndex < calendars.length - 1) {
      flatListRef.current.scrollToIndex({
        index: viewableIndex + 1,
        animated: true,
      });
    }
  }, [viewableIndex, calendars.length]);

  // Add function to scroll to previous month
  const scrollToPreviousMonth = useCallback(() => {
    if (flatListRef.current && viewableIndex > 0) {
      flatListRef.current.scrollToIndex({
        index: viewableIndex - 1,
        animated: true,
      });
    }
  }, [viewableIndex]);

  // Connect with calendarHook
  useEffect(() => {
    if (calendarHook.onMonthChange) {
      calendarHook.onMonthChange = (direction: 'next' | 'previous') => {
        if (direction === 'next') {
          scrollToNextMonth();
        } else {
          scrollToPreviousMonth();
        }
      };
    }
  }, [calendarHook, scrollToNextMonth, scrollToPreviousMonth]);

  useEffect(() => {
    const currentDate = new Date();
    const startYear = currentDate.getFullYear() - YEARS_RANGE;
    
    // Calculate the target index based on current month and year
    const targetIndex = (calendarHook.year - startYear) * 12 + calendarHook.month;
    
    // Only scroll if the target index is different from current viewable index
    // and not the initial render
    if (targetIndex !== viewableIndex && flatListRef.current) {
      console.log('Scrolling to month:', calendarHook.month, 'year:', calendarHook.year);
      flatListRef.current.scrollToIndex({
        index: targetIndex,
        animated: true,
      });
    }
  }, [calendarHook.month, calendarHook.year, viewableIndex]);

  // Cập nhật month và year khi viewableIndex thay đổi
  useEffect(() => {
    const currentDate = new Date();
    const startYear = currentDate.getFullYear() - YEARS_RANGE;

    // Tính toán month và year từ viewableIndex
    const yearOffset = Math.floor(viewableIndex / 12);
    const monthOffset = viewableIndex % 12;

    const newYear = startYear + yearOffset;
    const newMonth = monthOffset;

    // Cập nhật giá trị trong calendarHook
    calendarHook.setMonth(newMonth);
    calendarHook.setYear(newYear);
  }, [viewableIndex]);

  // Đơn giản hóa viewability callback
  const handleViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (!viewableItems.length) return;
      const currentIndex = viewableItems[0].index;
      if (typeof currentIndex === 'number') {
        setViewableIndex(currentIndex);
      }
    },
    [],
  );

  // Tối ưu render performance
  const renderItem = useMemo(
    () =>
      ({item}: {item: CalendarMonth}) =>
        <CalendarItem itemMonth={item.month} itemYear={item.year} />,
    [calendarHook],
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: CALENDAR_CONSTANTS.HEIGHT,
      offset: CALENDAR_CONSTANTS.HEIGHT * index,
      index,
    }),
    [],
  );

  const keyExtractor = useCallback(
    (item: CalendarMonth, index: number) =>
      `${item.month}-${item.year}-${index}`,
    [],
  );

  //   // Thêm constant cho lower bound
  //   const UPPER_BOUND_THRESHOLD = -CALENDAR_UI_CONSTANTS.SAFE_ZONE_PADDING;
  //   const LOWER_BOUND_THRESHOLD =
  //     CALENDAR_UI_CONSTANTS.GRID_HEIGHT + CALENDAR_UI_CONSTANTS.SAFE_ZONE_PADDING;

  //   useAnimatedReaction(
  //     () => {
  //       const leftY = calendarHook.leftDraggerY?.value ?? 0;
  //       return leftY;
  //     },
  //     (currentY, previousY) => {
  //       if (!previousY) return;

  //       // Kiểm tra nếu vượt quá lower bound
  //       if (currentY > LOWER_BOUND_THRESHOLD) {
  //         // Sử dụng runOnJS để gọi scrollToNextMonth vì đây là JS function
  //         runOnJS(scrollToNextMonth)();

  //         // Có thể thêm logic để reset position của dragger nếu cần
  //         // if (calendarHook.leftDraggerY) {
  //         //   calendarHook.leftDraggerY.value = 0;
  //         // }
  //       }
  //     },
  //     [calendarHook.leftDraggerY],
  //   );

  return (
    <CalendarErrorBoundary>
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <FlatList
            ref={flatListRef}
            data={calendars}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            initialScrollIndex={INITIAL_SCROLL_INDEX}
            showsVerticalScrollIndicator={false}
            // Viewability configuration
            onViewableItemsChanged={handleViewableItemsChanged}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 50,
              minimumViewTime: 100,
            }}
            // Performance optimizations
            removeClippedSubviews={true}
            initialNumToRender={12} // Render 1 năm đầu tiên
            maxToRenderPerBatch={6} // Render 6 tháng mỗi batch
            windowSize={5} // Giữ 5 screens trong memory
            // Scrolling behavior
            decelerationRate="fast"
            snapToInterval={CALENDAR_CONSTANTS.HEIGHT}
            snapToAlignment="start"
            // Maintain scroll position when content changes
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
              autoscrollToTopThreshold: CALENDAR_CONSTANTS.HEIGHT * 2,
            }}
          />
        </View>
      </View>
    </CalendarErrorBoundary>
  );
};

const SnapVerticalCalender = () => {
  return (
    <CalendarErrorBoundary>
      <SnapVerticalCalenderInner />
    </CalendarErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarContainer: {
    width: CALENDAR_CONSTANTS.WIDTH,
    height: CALENDAR_CONSTANTS.HEIGHT,
    overflow: 'hidden',
    borderWidth: 2,
  },
});

export default SnapVerticalCalender;

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import CalendarItem from './CalendarItem';
import CalendarErrorBoundary from '@src/components/ErrorBoundary';
import {useCalendar} from '@src/contexts/CalendarProvider';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnUI,
  Extrapolation,
} from 'react-native-reanimated';
import CustomSwitchButton from '@src/components/button/CustomSwitchButton';
import CustomText from '@src/components/native_components/CustomText';
import {CALENDAR_CONSTANTS} from './constants';
import CalendarSkeleton from './CalendarSkeleton';
import {VisibleMonth} from '@src/contexts/CalendarProvider';
import SelectionModeOptions from './SelectionOptionModes';

interface CalendarMonth {
  month: number;
  year: number;
  position: {
    top: number;
    bottom: number;
  };
}

const viewabilityConfig = {
  itemVisiblePercentThreshold: 10,
  minimumViewTime: 100,
} as const;

const SnapVerticalCalenderInner = () => {
  const YEARS_RANGE = 5;
  const {
    month,
    year,
    scrollOffset: contextScrollOffset,
    selectionMode,
    setSelectionMode,
    setVisibleMonths,
  } = useCalendar();
  const scrollOffset = useSharedValue({x: 0, y: 0});
  const scrollingSpeed = useSharedValue<number>(0);
  const flashListRef = useRef<FlashList<CalendarMonth>>(null);
  const lastScrollEvent = useRef({timestamp: 0, offset: 0});
  const [showSkeleton, setShowSkeleton] = useState(false);
  const skeletonTimeoutRef = useRef<NodeJS.Timeout>();

  // Add these shared values
  const smoothVelocity = useSharedValue(0);
  const opacity = useSharedValue(1);
  //   const scrollTimer = useSharedValue<number | null>(null);

  // Add this worklet function
  const updateSmoothVelocity = (newVelocity: number) => {
    ('worklet');

    // if (scrollTimer.value !== null) {
    //   clearTimeout(scrollTimer.value);
    // }

    // Smooth out the velocity
    smoothVelocity.value =
      smoothVelocity.value * 0.85 + Math.abs(newVelocity) * 0.15;

    // Set timer to reset velocity when no scroll events received
    // scrollTimer.value = setTimeout(() => {
    //   smoothVelocity.value = 0;
    //   opacity.value = withSpring(1, {
    //     mass: 0.5,
    //     damping: 12,
    //     stiffness: 90,
    //   });
    // }, 150) as any; // 150ms timeout

    // Log smooth velocity
    // console.log('Start=========>');
    console.log(`Smooth Velocity: ${smoothVelocity.value.toFixed(2)}`);

    // Animate opacity based on smooth velocity
    opacity.value = withSpring(
      interpolate(
        smoothVelocity.value,
        [0, 3, 4], // velocity thresholds
        [1, 0.8, 0.3], // opacity values
        Extrapolation.CLAMP,
      ),
      {
        mass: 0.5, // lighter spring for faster response
        damping: 12, // adjust for desired bounce
        stiffness: 90, // adjust for desired speed
      },
    );
  };

  const getCurrentMonthIndex = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const startYear = currentYear - YEARS_RANGE;
    return (currentYear - startYear) * 12 + currentMonth;
  };

  // console.log keep track of scrolling speed here
  const flashListAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const [calendars] = useState<CalendarMonth[]>(() => {
    const currentDate = new Date();
    const startYear = currentDate.getFullYear() - YEARS_RANGE;
    const months: CalendarMonth[] = [];

    for (let year = startYear; year <= startYear + YEARS_RANGE * 2; year++) {
      for (let month = 0; month < 12; month++) {
        const index = (year - startYear) * 12 + month;
        months.push({
          month,
          year,
          position: {
            top: index * CALENDAR_CONSTANTS.TOTAL_HEIGHT,
            bottom: (index + 1) * CALENDAR_CONSTANTS.TOTAL_HEIGHT,
          },
        });
      }
    }
    return months;
  });

  // Quick filter function for visible months based on scroll offset
  const getVisibleMonths = useCallback(
    (scrollY: number) => {
      // Viewport boundaries relative to scroll position
      const viewportTop = scrollY;
      const viewportBottom = scrollY + CALENDAR_CONSTANTS.TOTAL_HEIGHT;

      return calendars.filter(item => {
        // Item is visible if:
        // 1. Its bottom edge is above -350px relative to viewport top
        // 2. Its top edge is below 400px relative to viewport top
        const relativeTop = item.position.top - viewportTop;
        const relativeBottom = item.position.bottom - viewportTop;

        return relativeBottom >= -350 && relativeTop <= 400;
      });
    },
    [calendars],
  );

  const logScrollingSpeed = useCallback((currentOffset: number) => {
    const now = Date.now();
    const timeDiff = now - lastScrollEvent.current.timestamp;

    if (timeDiff > 0) {
      const distance = Math.abs(currentOffset - lastScrollEvent.current.offset);
      const speed = (distance / timeDiff) * 1000; // px/s

      scrollingSpeed.value = speed;

      // Log speed
      //   let speedMessage = `${speed.toFixed(2)} px/s`;
      //   if (speed >= 1000) {
      //     console.log(`Scroll Speed (FAST): ${speedMessage}`);
      //   } else if (speed >= 500) {
      //     console.log(`Scroll Speed (MEDIUM): ${speedMessage}`);
      //   } else {
      //     console.log(`Scroll Speed (SLOW): ${speedMessage}`);
      //   }
    }

    lastScrollEvent.current = {
      timestamp: now,
      offset: currentOffset,
    };
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {contentOffset, velocity} = event.nativeEvent;
      //   const visibleMonths = getVisibleMonths(contentOffset.y);

      scrollOffset.value = {
        x: contentOffset.x,
        y: contentOffset.y,
      };

      contextScrollOffset.value = {
        x: contentOffset.x,
        y: contentOffset.y,
      };

      const now = Date.now();

      //   logVisibleMonths(visibleMonths);

      if (velocity?.y) {
        runOnUI(updateSmoothVelocity)(velocity.y);

        // Tính toán real velocity dựa trên khoảng cách và thời gian
        const timeDiff = now - lastScrollEvent.current.timestamp;
        const distanceDiff = contentOffset.y - lastScrollEvent.current.offset;
        const calculatedVelocity = timeDiff > 0 ? distanceDiff / timeDiff : 0;

        // console.log({
        //   timestamp: now,
        //   nativeVelocity: velocity.y.toFixed(2),
        //   calculatedVelocity: calculatedVelocity.toFixed(2),
        //   timeDiff,
        //   distanceDiff: distanceDiff.toFixed(2),
        // });

        lastScrollEvent.current = {
          timestamp: now,
          offset: contentOffset.y,
        };
      }

      // Log scrolling speed
      //   logScrollingSpeed(contentOffset.y);

      //   console.log(`[Velocity: ], ${event.nativeEvent.velocity?.y}`);

      // Update visible months in context if needed
      //   setVisibleMonths(visibleMonths);
    },
    [logScrollingSpeed],
  );

  const logVisibleMonths = useCallback(
    (items: ViewToken[]) => {
      console.log('=== FlashList Visible Months ===');
      items.forEach(item => {
        const month = item.item as CalendarMonth;
        console.log(`Month: ${month.month + 1}/${month.year}`, {
          isViewable: item.isViewable,
          index: item.index,
          position: month.position,
          offset: {
            top: month.position.top - scrollOffset.value.y,
            bottom: month.position.bottom - scrollOffset.value.y,
          },
        });
      });
      console.log('========================');
    },
    [scrollOffset.value.y],
  );

  const handleViewableItemsChanged = useCallback(
    ({
      viewableItems,
      changed,
    }: {
      viewableItems: Array<ViewToken>;
      changed: Array<ViewToken>;
    }) => {
      if (!viewableItems.length) return;

      // Update visible months in context
      // Tạo danh sách visibleMonths mới
      const newVisibleMonths = viewableItems.map(({item}) => ({
        month: item.month,
        year: item.year,
        position: {
          top: item.position.top,
          bottom: item.position.bottom,
        },
      }));

      // So sánh với visibleMonths hiện tại
      setVisibleMonths(prevVisibleMonths => {
        const isSame =
          prevVisibleMonths.length === newVisibleMonths.length &&
          prevVisibleMonths.every(
            (prev, index) =>
              prev.month === newVisibleMonths[index].month &&
              prev.year === newVisibleMonths[index].year,
          );

        // Nếu không có sự khác biệt, không cập nhật
        if (isSame) {
          return prevVisibleMonths;
        }

        // Nếu có sự khác biệt, cập nhật visibleMonths
        return newVisibleMonths;
      });
    },
    [scrollOffset.value.y],
  );

  const renderItem = useCallback(({item}: {item: CalendarMonth}) => {
    return <CalendarItem itemMonth={item.month} itemYear={item.year} />;
  }, []);

  useEffect(() => {
    // calculate index of current month
    flashListRef.current?.scrollToOffset({
      offset: getCurrentMonthIndex() * CALENDAR_CONSTANTS.TOTAL_HEIGHT,
      animated: false,
    });
  }, []);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (skeletonTimeoutRef.current) {
        clearTimeout(skeletonTimeoutRef.current);
      }
    };
  }, []);

  return (
    <CalendarErrorBoundary>
      <View style={styles.container}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            // justifyContent: 'center',
            // alignContent: 'center',
            // alignItems: 'center',
            height: 'auto',
            borderWidth: 1,
            width: 350,
          }}>
          <SelectionModeOptions />
        </View>

        <View>
          <View>
            <CalendarSkeleton />
          </View>

          <Animated.View
            style={[styles.calendarContainer, flashListAnimatedStyle]}>
            <FlashList
              ref={flashListRef}
              data={calendars}
              contentContainerStyle={{
                backgroundColor: 'white',
                padding: 0,
              }}
              renderItem={renderItem}
              estimatedItemSize={CALENDAR_CONSTANTS.TOTAL_HEIGHT}
              onScroll={handleScroll}
              keyExtractor={useCallback(
                (item: CalendarMonth, index: number) =>
                  `${item.month}-${item.year}-${index}`,
                [],
              )}
              showsVerticalScrollIndicator={false}
              onViewableItemsChanged={handleViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
              estimatedListSize={{
                width: CALENDAR_CONSTANTS.TOTAL_WIDTH,
                height: CALENDAR_CONSTANTS.TOTAL_HEIGHT,
              }}
              overrideItemLayout={layout => {
                layout.size = CALENDAR_CONSTANTS.TOTAL_HEIGHT;
              }}
              scrollEventThrottle={32}
              removeClippedSubviews={true}
              onScrollAnimationEnd={() => {
                console.log('Scroll animation ended');
              }}
              onMomentumScrollEnd={() => {
                console.log('Momentum scroll ended');
                smoothVelocity.value = 0;
                opacity.value = withSpring(1, {
                  mass: 0.5,
                  damping: 12,
                  stiffness: 90,
                });
              }}
            />
          </Animated.View>
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
    width: CALENDAR_CONSTANTS.TOTAL_WIDTH,
    height: CALENDAR_CONSTANTS.TOTAL_HEIGHT,
    overflow: 'hidden',
    // opacity: 0,
  },
});

export default SnapVerticalCalender;

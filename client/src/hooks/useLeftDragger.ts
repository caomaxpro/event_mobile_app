import {Gesture} from 'react-native-gesture-handler';
import {
  DRAGGER_COLORS,
  CALENDAR_UI_CONSTANTS,
} from '@src/contexts/CalendarProvider';
import {CalendarDayMap} from '@src/contexts/CalendarProvider';
import {useBaseDragger} from './useBaseDragger';
import {useEffect, useRef} from 'react';
import {
  useAnimatedReaction,
  runOnJS,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface UseLeftDraggerProps {
  defaultX: number;
  defaultY: number;
  initialMonth: number;
  initialYear: number;
  daysMap: CalendarDayMap;
  rightDraggerPosition: {
    x: number;
    y: number;
  };
  onDragBeyondBound?: () => void;
  onMonthChange: ((direction: 'next' | 'previous') => void) | null;
}

const LOWER_BOUND_THRESHOLD =
  CALENDAR_UI_CONSTANTS.GRID_HEIGHT + CALENDAR_UI_CONSTANTS.SAFE_ZONE_PADDING;

export const useLeftDragger = ({
  defaultX,
  defaultY,
  initialMonth,
  initialYear,
  daysMap,
  rightDraggerPosition,
  onDragBeyondBound,
  onMonthChange,
}: UseLeftDraggerProps) => {
  const daysMapRef = useRef(daysMap);
  const isChangingMonth = useRef(false);

  const baseDragger = useBaseDragger({
    defaultX,
    defaultY,
    initialMonth,
    initialYear,
  });

  // Log function that will run on JS thread
  const logDateChange = (month: number, year: number) => {
    console.log('[useLeftDragger] Date changed:', {month, year});
  };

  // Monitor month changes
  //   useAnimatedReaction(
  //     () => baseDragger.month.value,
  //     (currentMonth, previousMonth) => {
  //       if (previousMonth !== null && currentMonth !== previousMonth) {
  //         console.log('[useLeftDragger] Month changed:', currentMonth);
  //       }
  //     },
  //     [baseDragger.month],
  //   );

  //   // Monitor year changes
  //   useAnimatedReaction(
  //     () => baseDragger.year.value,
  //     (currentYear, previousYear) => {
  //       if (previousYear !== null && currentYear !== previousYear) {
  //         runOnJS(console.log)('[useLeftDragger] Year changed:', currentYear);
  //       }
  //     },
  //     [baseDragger.year],
  //   );

  // Monitor both month and year changes
  useAnimatedReaction(
    () => ({
      month: baseDragger.month.value,
      year: baseDragger.year.value,
    }),
    (current, previous) => {
      if (
        previous !== null &&
        (current.month !== previous.month || current.year !== previous.year)
      ) {
        runOnJS(logDateChange)(current.month, current.year);
      }
    },
    [baseDragger.month, baseDragger.year],
  );

  useEffect(() => {
    daysMapRef.current = daysMap;
  }, [daysMap]);

  const calculateCoordinateFromPosition = (
    posX: number,
    posY: number,
  ): [number, number] => {
    const row = Math.floor(posY / 53);
    const column = Math.floor(posX / 53);
    return [row, column];
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      baseDragger.isDragging.value = true;
      baseDragger.contextX.value = baseDragger.x.value;
      baseDragger.contextY.value = baseDragger.y.value;
      baseDragger.backgroundColor.value = DRAGGER_COLORS.DRAGGING;
    })
    .onUpdate(event => {
      const newX = baseDragger.contextX.value + event.translationX;
      const newY = baseDragger.contextY.value + event.translationY;

      // Cập nhật x trước
      baseDragger.x.value = newX;

      if (newY > LOWER_BOUND_THRESHOLD && !isChangingMonth.current) {
        isChangingMonth.current = true;

        if (onDragBeyondBound) {
          onDragBeyondBound();
        }

        // Update month/year
        if (baseDragger.month.value === 11) {
          baseDragger.year.value = baseDragger.year.value + 1;
          baseDragger.month.value = 0;
        } else {
          baseDragger.month.value = baseDragger.month.value + 1;
        }

        // Notify parent
        if (onMonthChange) {
          runOnJS(onMonthChange)('next');
        }

        // Reset position với animation
        baseDragger.y.value = withTiming(
          CALENDAR_UI_CONSTANTS.SAFE_ZONE_PADDING,
          {
            duration: 300,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          },
          finished => {
            if (finished) {
              runOnJS(() => {
                isChangingMonth.current = false;
                // Reset context chỉ sau khi animation hoàn thành
                baseDragger.contextY.value =
                  CALENDAR_UI_CONSTANTS.SAFE_ZONE_PADDING;
              })();
            }
          },
        );
      } else {
        // Cập nhật y bình thường nếu chưa vượt ngưỡng
        baseDragger.y.value = newY;
      }
    })
    .onEnd(() => {
      if (!isChangingMonth.current) {
        baseDragger.isDragging.value = false;
        baseDragger.x.value = Math.floor((baseDragger.x.value + 25) / 53) * 53;
        baseDragger.y.value = Math.floor((baseDragger.y.value + 25) / 53) * 53;
        baseDragger.backgroundColor.value = DRAGGER_COLORS.DEFAULT;
      }
    })
    .runOnJS(true);

  return {
    ...baseDragger,
    panGesture,
  };
};

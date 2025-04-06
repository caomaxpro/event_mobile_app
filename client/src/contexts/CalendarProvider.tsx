import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  SharedValue,
  AnimatedStyle,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureType} from 'react-native-gesture-handler';
import {ViewStyle, FlatList} from 'react-native';
import {useRightDragger} from '../hooks/useRightDragger';
import {useLeftDragger} from '../hooks/useLeftDragger';
import {useBaseDragger} from '../hooks/useBaseDragger';

export type CalendarCoordinate = {
  row: number;
  col: number;
};

export interface VisibleMonth {
  month: number;
  year: number;
  position: {
    top: number;
    bottom: number;
  };
}

export type CalendarDayItem = {
  day: number;
  date: Date;
  index: number;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isDisabled: boolean;
  isPastDay: boolean;
  isMovable: boolean;
  coordinate: CalendarCoordinate;
};

export type CalendarDayMap = {
  [key: `${number},${number}`]: CalendarDayItem & {
    key: string;
  };
};

export const DRAGGER_COLORS = {
  IN_RANGE: 'rgba(86, 105, 255, 1)', // Semi-transparent primary blue
  DEFAULT: 'rgba(107, 114, 128, 0.35)', // Semi-transparent gray
  DRAGGING: 'rgba(96, 165, 250, 0.35)', // Semi-transparent light blue
  ERROR: 'rgba(239, 68, 68, 0.35)', // Semi-transparent red
  SELECTED: 'rgba(86, 105, 255, 0.85)', // More opaque primary blue
  MOVABLE: 'rgba(86, 105, 255, 0.35)', // Semi-transparent primary blue
} as const;

export const CALENDAR_UI_CONSTANTS = {
  CELL_SIZE: 53,
  GRID_WIDTH: 53 * 5, // CELL_SIZE * 5
  GRID_HEIGHT: 53 * 5, // CELL_SIZE * 5
  SAFE_ZONE_PADDING: 35,
  THUMB_SIZE: 25,
} as const;

type Bound = {
  upper: number;
  upperContext: number;
  lower: number;
  lowerContext: number;
};

export type SelectionMode = 'single' | 'range';

// Context interface
interface CalendarContextValue {
  // State
  month: SharedValue<number>;
  year: SharedValue<number>;
  date: Date;

  // Animated values
  leftX: SharedValue<number>;
  leftY: SharedValue<number>;

  scrollOffset: SharedValue<{x: number; y: number}>;

  // Gestures
  leftDragger: GestureType;
  rightDragger: GestureType;

  // Styles
  leftDraggerStyle: AnimatedStyle<ViewStyle>;
  rightDraggerStyle: AnimatedStyle<ViewStyle>;

  // Methods
  formatMonthYear: (date: Date) => string;
  highlightPastDays: (day: number) => string;
  changeCalander: (type: 'next' | 'previous') => void;
  generateCalendarDays: (
    itemYear: number,
    itemMonth: number,
  ) => CalendarDayItem[];
  onMonthChange: ((direction: 'next' | 'previous') => void) | null;
  handleCellPress: (item: CalendarDayItem) => void;
  setOnMonthChange: React.Dispatch<
    React.SetStateAction<((direction: 'next' | 'previous') => void) | null>
  >;

  // Thêm các giá trị x, y của dragger
  leftDraggerX: SharedValue<number>;
  leftDraggerY: SharedValue<number>;
  rightDraggerX: SharedValue<number>;
  rightDraggerY: SharedValue<number>;

  // add bounds
  bound1: SharedValue<Bound>;
  bound2: SharedValue<Bound>;

  startDate: CalendarDayItem | null;
  setStartDate: React.Dispatch<React.SetStateAction<CalendarDayItem | null>>;
  endDate: CalendarDayItem | null;
  setEndDate: React.Dispatch<React.SetStateAction<CalendarDayItem | null>>;
  movableDay: CalendarDayItem | null;
  setMovableDay: React.Dispatch<React.SetStateAction<CalendarDayItem | null>>;
  selectionMode: boolean;
  setSelectionMode: React.Dispatch<React.SetStateAction<boolean>>;

  visibleDays: CalendarDayItem[];
  setVisibleDays: React.Dispatch<React.SetStateAction<CalendarDayItem[]>>;

  visibleMonths: VisibleMonth[];
  setVisibleMonths: React.Dispatch<React.SetStateAction<VisibleMonth[]>>;
}

// Create context
const CalendarContext = createContext<CalendarContextValue | undefined>(
  undefined,
);

// Provider component
export const CalendarProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  // Constants
  const {CELL_SIZE} = CALENDAR_UI_CONSTANTS;

  // Get current date info
  const today = new Date();
  const currentDayIndex = today.getDate() - 1;
  const [currentRow, currentColumn] = [
    Math.floor(currentDayIndex / 6),
    currentDayIndex % 6,
  ];

  // State
  const currentDate = new Date();
  const month = useSharedValue<number>(currentDate.getMonth());
  const year = useSharedValue<number>(currentDate.getFullYear());
  const scrollOffset = useSharedValue({x: 0, y: 0});
  const [visibleDays, setVisibleDays] = useState<CalendarDayItem[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [daysMap, setDaysMap] = useState<CalendarDayMap>({});
  const [onMonthChange, setOnMonthChange] = useState<
    ((direction: 'next' | 'previous') => void) | null
  >(null);

  const leftX = useSharedValue(0);
  const leftY = useSharedValue(0);

  const bound1 = useSharedValue<Bound>({
    upper: 0,
    upperContext: 0,
    lower: 0,
    lowerContext: 0,
  });

  const bound2 = useSharedValue<Bound>({
    upper: 0,
    upperContext: 0,
    lower: 0,
    lowerContext: 0,
  });

  const [startDate, setStartDate] = useState<CalendarDayItem | null>(null);
  const [endDate, setEndDate] = useState<CalendarDayItem | null>(null);
  const [selectedDays, setSelectedDays] = useState<CalendarDayItem[]>([]);
  const [movableDay, setMovableDay] = useState<CalendarDayItem | null>(null);

  const [visibleMonths, setVisibleMonths] = useState<VisibleMonth[]>([]);
  const [selectionMode, setSelectionMode] = useState<boolean>(false);

  // Refs
  const flatListRef = useRef<FlatList>(null);
  const isMonthChangeCooldown = useSharedValue(false);

  // Default positions
  const defaultX = currentColumn * CELL_SIZE;
  const defaultY = currentRow * CELL_SIZE;

  //   useAnimatedReaction(
  //     () => scrollOffset.value.y,
  //     (cur, prev) => {
  //       // calculate offset
  //       const offset = cur - Math.trunc(cur / 300) * 300;
  //       bound1.value.upper = bound1.value.upperContext - offset;
  //       bound1.value.lower = bound1.value.upper + 300;

  //       bound2.value.upper = bound2.value.upperContext + 300 - offset;
  //       bound2.value.lower = bound2.value.upper + 300;

  //       //   console.log('[Bound 1: ] ', bound1);
  //       //   console.log('[Bound 2: ] ', bound2);
  //     },
  //     [scrollOffset],
  //   );

  // Batch updates
  const handleMonthChange = useCallback((direction: 'next' | 'previous') => {
    requestAnimationFrame(() => {
      if (direction === 'next') {
        if (month.value === 11) {
          year.value = year.value + 1;
          month.value = 0;
        } else {
          month.value = month.value + 1;
        }
      } else {
        if (month.value === 0) {
          year.value = year.value - 1;
          month.value = 11;
        } else {
          month.value = month.value - 1;
        }
      }
    });
  }, []);

  const leftDragger = useLeftDragger({
    defaultX,
    defaultY,
    initialMonth: month.value,
    initialYear: year.value,
    daysMap,
    rightDraggerPosition: {
      x: defaultX,
      y: defaultY,
    },
    onDragBeyondBound: () => {
      console.log('Dragged beyond bound');
    },
    onMonthChange: (direction: 'next' | 'previous') => {
      handleMonthChange(direction);
    },
  });

  const rightDragger = useRightDragger({
    defaultX,
    defaultY,
    initialMonth: month.value,
    initialYear: year.value,
    daysMap,
    leftDraggerPosition: {
      x: leftDragger.x.value,
      y: leftDragger.y.value,
      month: leftDragger.month.value,
      year: leftDragger.year.value,
    },
  });

  // Methods
  const formatMonthYear = useCallback((date: Date): string => {
    return date.toLocaleString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }, []);

  const generateCalendarDays = useCallback(
    (itemYear: number, itemMonth: number): CalendarDayItem[] => {
      const daysInMonth = new Date(itemYear, itemMonth + 1, 0).getDate();
      return Array.from({length: daysInMonth}, (_, index) => {
        const day = index + 1;
        const date = new Date(itemYear, itemMonth, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const row = Math.floor(index / 6);
        const col = index % 6;

        return {
          day,
          date,
          index,
          isToday:
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear(),
          isSelected: false,
          isInRange: false,
          isDisabled: false,
          isMovable: false,
          isPastDay: date < today,
          coordinate: {
            row: row,
            col: col,
          },
        };
      });
    },
    [],
  );

  // can only set moving day if startDate and endDate are set
  // moving day can only be startDate or endDate
  // can be disable if
  const setMovingDay = (item: CalendarDayItem) => {
    if (!startDate || !endDate) return;
    if (
      item.date.getTime() !== startDate.date.getTime() &&
      item.date.getTime() !== endDate.date.getTime()
    ) {
      return;
    }

    // if item is already movable, remove it
    if (movableDay?.date.getTime() === item.date.getTime()) {
      setMovableDay(null);
      return;
    }

    // if item is startDate or endDate, set it as movable
    // console.log('setMovingDay', item);

    let oldMovableDay = {...movableDay};

    // update days
    // setDays(prevState =>
    //   prevState.map(day => {
    //     if (day.date.getTime() === item.date.getTime()) {
    //       return {
    //         ...day,
    //         isMovable: true,
    //       };
    //     }

    //     if (
    //       oldMovableDay?.date &&
    //       day.date.getTime() === oldMovableDay?.date.getTime()
    //     ) {
    //       return {
    //         ...day,
    //         isMovable: false,
    //       };
    //     }
    //     return day;
    //   }),
    // );

    setMovableDay(item);
  };

  // if startDate, endDate and movingDay are set, and press cell is neither startDate nor endDate, then change movingDay to that cell
  const handleMovingDay = (item: CalendarDayItem) => {
    if (!startDate || !endDate || !movableDay) return;
    if (
      item.date.getTime() === startDate.date.getTime() ||
      item.date.getTime() === endDate.date.getTime()
    ) {
      return;
    }

    setMovingDay(item);
  };

  const handleCellPress = (item: CalendarDayItem) => {
    console.log('handleCellPress', startDate, endDate);

    if (item.day === 0 || item.isDisabled) return;

    if (!startDate && !endDate) {
      setStartDate(item);
      return;
    }

    if (startDate && !endDate) {
      setEndDate(item);
      return;
    }

    if (startDate && endDate) {
      setMovingDay(item);
      return;
    }

    if (movableDay) {
      handleMovingDay(item);
    }
  };

  const highlightPastDays = useCallback((day: number): string => {
    const date = new Date(year.value, month.value, day);
    const currentDate = new Date();
    let color = 'white';

    if (date < currentDate) {
      color = 'red';
    }

    if (date.toDateString() === currentDate.toDateString()) {
      color = 'green';
    }

    return color;
  }, []);

  // Scroll control
  const scrollToIndex = useCallback((index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  }, []);

  // Effects

  // Memoize context value more aggressively
  const value = useMemo(
    () => ({
      month,
      year,
      date,
      leftX,
      leftY,
      scrollOffset,
      leftDragger: leftDragger.panGesture,
      rightDragger: rightDragger.panGesture,
      leftDraggerStyle: leftDragger.style,
      rightDraggerStyle: rightDragger.style,
      formatMonthYear,
      highlightPastDays,
      changeCalander: handleMonthChange,
      generateCalendarDays,
      onMonthChange,
      handleCellPress,
      setOnMonthChange,
      scrollToIndex,
      leftDraggerX: leftDragger.x,
      leftDraggerY: leftDragger.y,
      rightDraggerX: rightDragger.x,
      rightDraggerY: rightDragger.y,
      bound1,
      bound2,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      movableDay,
      setMovableDay,
      selectionMode,
      setSelectionMode,

      visibleDays,
      setVisibleDays,

      visibleMonths,
      setVisibleMonths,
    }),
    [
      month.value,
      year.value,
      date,
      leftDragger,
      rightDragger,
      onMonthChange,
      startDate,
      endDate,
      movableDay,
      selectionMode,
      visibleDays,
      visibleMonths,
    ],
  );

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

// Custom hook to use the calendar context
export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};

export const getCoordinatesFromIndex = (index: number): [number, number] => {
  const row = Math.floor(index / 6);
  const column = index % 6;
  return [row, column];
};

export const convertListItemsToMap = (items: Array<any>) => {
  return items.reduce((acc, item) => {
    const coordinate = `${item.coordinate.row},${item.coordinate.col}`;
    acc[coordinate] = {
      ...item,
      key: coordinate,
    };
    return acc;
  }, {} as Record<string, any>);
};

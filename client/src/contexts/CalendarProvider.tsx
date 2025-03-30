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

export type CalendarDayItem = {
  day: number;
  date: Date;
  index: number;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isDisabled: boolean;
  isPastDay: boolean;
  coordinate: CalendarCoordinate;
};

export type CalendarDayMap = {
  [key: `${number},${number}`]: CalendarDayItem & {
    key: string;
  };
};

export const DRAGGER_COLORS = {
  DEFAULT: '#6B7280' + '59', // A lighter gray
  DRAGGING: '#60A5FA' + '59',
  ERROR: '#EF4444' + '59',
} as const;

export const CALENDAR_UI_CONSTANTS = {
  CELL_SIZE: 53,
  GRID_WIDTH: 53 * 5, // CELL_SIZE * 5
  GRID_HEIGHT: 53 * 5, // CELL_SIZE * 5
  SAFE_ZONE_PADDING: 35,
  THUMB_SIZE: 25,
} as const;

// Context interface
interface CalendarContextValue {
  // State
  month: number;
  year: number;
  date: Date;
  listDays: CalendarDayItem[];
  daysMap: CalendarDayMap;

  // Setters
  setDate: (date: Date) => void;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setListDays: React.Dispatch<React.SetStateAction<CalendarDayItem[]>>;
  setDaysMap: React.Dispatch<React.SetStateAction<CalendarDayMap>>;

  // Animated values
  leftDraggerMonth: SharedValue<number>;
  leftDraggerYear: SharedValue<number>;
  rightDraggerMonth: SharedValue<number>;
  rightDraggerYear: SharedValue<number>;

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
  setOnMonthChange: React.Dispatch<
    React.SetStateAction<((direction: 'next' | 'previous') => void) | null>
  >;

  // Scroll control
  scrollToIndex: (index: number) => void;

  // Thêm các giá trị x, y của dragger
  leftDraggerX: SharedValue<number>;
  leftDraggerY: SharedValue<number>;
  rightDraggerX: SharedValue<number>;
  rightDraggerY: SharedValue<number>;
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
  const [month, setMonth] = useState<number>(currentDate.getMonth());
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [date, setDate] = useState<Date>(new Date());
  const [listDays, setListDays] = useState<CalendarDayItem[]>([]);
  const [daysMap, setDaysMap] = useState<CalendarDayMap>({});
  const [onMonthChange, setOnMonthChange] = useState<
    ((direction: 'next' | 'previous') => void) | null
  >(null);

  // Refs
  const flatListRef = useRef<FlatList>(null);
  const isMonthChangeCooldown = useSharedValue(false);

  // Shared values
  const monthShared = useSharedValue(month);
  const yearShared = useSharedValue(year);

  // Default positions
  const defaultX = currentColumn * CELL_SIZE;
  const defaultY = currentRow * CELL_SIZE;

  // Initialize draggers
  const handleMonthChange = useCallback((direction: 'next' | 'previous') => {
    console.log('handleMonthChange', direction, 'running');

    if (direction === 'next') {
      if (monthShared.value === 11) {
        yearShared.value = yearShared.value + 1;
        monthShared.value = 0;
      } else {
        monthShared.value = monthShared.value + 1;
      }
    } else {
      if (monthShared.value === 0) {
        yearShared.value = yearShared.value - 1;
        monthShared.value = 11;
      } else {
        monthShared.value = monthShared.value - 1;
      }
    }

    // Update React state
    setMonth(monthShared.value);
    setYear(yearShared.value);
  }, []);

  const leftDragger = useLeftDragger({
    defaultX,
    defaultY,
    initialMonth: monthShared.value,
    initialYear: yearShared.value,
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
    initialMonth: monthShared.value,
    initialYear: yearShared.value,
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
          isPastDay: date < today,
          coordinate: {
            row: Math.floor(index / 6),
            col: index % 6,
          },
        };
      });
    },
    [],
  );

  const highlightPastDays = useCallback((day: number): string => {
    const date = new Date(yearShared.value, monthShared.value, day);
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
  useEffect(() => {
    const days = generateCalendarDays(year, month);
    setListDays(days);
  }, [month, year, generateCalendarDays]);

  useEffect(() => {
    setDaysMap(convertListItemsToMap(listDays));
  }, [listDays]);

  // Context value
  const value = useMemo(
    () => ({
      // State
      month,
      year,
      date,
      listDays,
      daysMap,

      // Setters
      setDate,
      setMonth,
      setYear,
      setListDays,
      setDaysMap,

      // Animated values
      leftDraggerMonth: leftDragger.month,
      leftDraggerYear: leftDragger.year,
      rightDraggerMonth: rightDragger.month,
      rightDraggerYear: rightDragger.year,

      // Gestures
      leftDragger: leftDragger.panGesture,
      rightDragger: rightDragger.panGesture,

      // Styles
      leftDraggerStyle: leftDragger.style,
      rightDraggerStyle: rightDragger.style,

      // Methods
      formatMonthYear,
      highlightPastDays,
      changeCalander: handleMonthChange,
      generateCalendarDays,
      onMonthChange,
      setOnMonthChange,

      // Scroll control
      scrollToIndex,

      // Thêm các giá trị x, y của dragger
      leftDraggerX: leftDragger.x,
      leftDraggerY: leftDragger.y,
      rightDraggerX: rightDragger.x,
      rightDraggerY: rightDragger.y,
    }),
    [
      month,
      year,
      date,
      listDays,
      daysMap,
      leftDragger,
      rightDragger,
      formatMonthYear,
      highlightPastDays,
      handleMonthChange,
      generateCalendarDays,
      onMonthChange,
      scrollToIndex,
      leftDragger.x,
      leftDragger.y,
      rightDragger.x,
      rightDragger.y,
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

const getCoordinatesFromIndex = (index: number): [number, number] => {
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

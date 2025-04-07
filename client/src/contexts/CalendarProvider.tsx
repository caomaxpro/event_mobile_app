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
  isStartDay: boolean;
  isEndDay: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isDisabled: boolean;
  isPastDay: boolean;
  isMovable: boolean;
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

export type SelectionMode = 'single' | 'multiple' | 'range';

// Context interface
interface CalendarContextValue {
  // State
  month: SharedValue<number>;
  year: SharedValue<number>;
  date: Date;

  scrollOffset: SharedValue<{x: number; y: number}>;

  selectedDay: CalendarDayItem | null;
  setSelectedDay: React.Dispatch<React.SetStateAction<CalendarDayItem | null>>;
  selectedDays: CalendarDayItem[];
  setSelectedDays: React.Dispatch<React.SetStateAction<CalendarDayItem[]>>;

  // Methods
  formatMonthYear: (date: Date) => string;
  generateCalendarDays: (
    itemYear: number,
    itemMonth: number,
  ) => CalendarDayItem[];
  startDate: CalendarDayItem | null;
  setStartDate: React.Dispatch<React.SetStateAction<CalendarDayItem | null>>;
  endDate: CalendarDayItem | null;
  setEndDate: React.Dispatch<React.SetStateAction<CalendarDayItem | null>>;
  movableDay: CalendarDayItem | null;
  setMovableDay: React.Dispatch<React.SetStateAction<CalendarDayItem | null>>;
  selectionMode: SelectionMode;
  setSelectionMode: React.Dispatch<React.SetStateAction<SelectionMode>>;

  visibleDays: CalendarDayItem[];
  setVisibleDays: React.Dispatch<React.SetStateAction<CalendarDayItem[]>>;

  visibleMonths: VisibleMonth[];
  setVisibleMonths: React.Dispatch<React.SetStateAction<VisibleMonth[]>>;

  handlePress: (pressedItem: CalendarDayItem) => void;
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

  // single mode
  const [selectedDay, setSelectedDay] = useState<CalendarDayItem | null>(null);

  // range mode
  const [startDate, setStartDate] = useState<CalendarDayItem | null>(null);
  const [endDate, setEndDate] = useState<CalendarDayItem | null>(null);
  const [movableDay, setMovableDay] = useState<CalendarDayItem | null>(null);

  // multiple mode
  const [selectedDays, setSelectedDays] = useState<CalendarDayItem[]>([]);

  const [visibleMonths, setVisibleMonths] = useState<VisibleMonth[]>([]);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('single');

  useEffect(() => {
    console.log('[Calendar Provider]', startDate, endDate);
  }, [startDate, endDate]);

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
          isStartDay: false,
          isEndDay: false,
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

  const setMovingDay = useCallback(
    (
      currentMovableDay: CalendarDayItem | null,
      pressedItem: CalendarDayItem,
    ) => {
      if (!startDate || !endDate) return;
      if (
        pressedItem.date.getTime() !== startDate.date.getTime() &&
        pressedItem.date.getTime() !== endDate.date.getTime()
      ) {
        return;
      }

      // If the pressed item is the same as the current movable day, reset the movable day
      if (currentMovableDay?.date.getTime() === pressedItem.date.getTime()) {
        setMovableDay(null);
        return;
      }

      // If the pressed item is the same as the start date, set the movable day to the

      setMovableDay(pressedItem);
    },
    [startDate, endDate, movableDay],
  );

  const handleMovingDay = useCallback(
    (
      currentMovableDay: CalendarDayItem,
      currentStartDate: CalendarDayItem,
      currentEndDate: CalendarDayItem,
      pressedItem: CalendarDayItem,
    ) => {
      if (!currentStartDate || !currentEndDate || !currentMovableDay) return;
      if (
        pressedItem.date.getTime() === currentStartDate.date.getTime() ||
        pressedItem.date.getTime() === currentEndDate.date.getTime()
      ) {
        return;
      }

      if (
        currentMovableDay.date.getTime() === currentStartDate.date.getTime()
      ) {
        setStartDate(pressedItem);
      } else {
        setEndDate(pressedItem);
      }
      setMovableDay(pressedItem);
    },
    [setStartDate, setEndDate, setMovingDay],
  );

  const handlePress = useCallback(
    (pressedItem: CalendarDayItem) => {
      if (pressedItem.day === 0 || pressedItem.isDisabled) return;

      if (!startDate && !endDate) {
        setStartDate(pressedItem);
        return;
      }

      if (startDate && !endDate) {
        setEndDate(pressedItem);
        return;
      }

      if (startDate && endDate && !movableDay) {
        setMovingDay(null, pressedItem);
        return;
      }

      if (startDate && endDate && movableDay) {
        // If the pressed item is the same as the current movable day, reset the movable day
        setMovingDay(movableDay, pressedItem);
        handleMovingDay(movableDay, startDate, endDate, pressedItem);
        return;
      }
    },
    [startDate, endDate, movableDay, setStartDate, setEndDate, handleMovingDay],
  );

  // can only set moving day if startDate and endDate are set
  // moving day can only be startDate or endDate
  // can be disable if

  // Effects

  // Memoize context value more aggressively
  const value = useMemo(
    () => ({
      month,
      year,
      date,
      scrollOffset,
      formatMonthYear,
      generateCalendarDays,
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

      selectedDay,
      setSelectedDay,

      selectedDays,
      setSelectedDays,

      handlePress,
    }),
    [
      month.value,
      year.value,
      date,
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

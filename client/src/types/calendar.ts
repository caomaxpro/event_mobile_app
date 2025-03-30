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
    key: `${number},${number}`;
  };
};

export const DRAGGER_COLORS = {
  DEFAULT: '#6B7280' + '59',
  DRAGGING: '#60A5FA' + '59',
  ERROR: '#EF4444' + '59',
} as const;

export const convertListItemsToMap = (items: CalendarDayItem[]) => {
  return items.reduce((acc, item) => {
    const coordinate =
      `${item.coordinate.row},${item.coordinate.col}` as const as `${number},${number}`;
    acc[coordinate] = {
      ...item,
      key: coordinate,
    };
    return acc;
  }, {} as CalendarDayMap);
};

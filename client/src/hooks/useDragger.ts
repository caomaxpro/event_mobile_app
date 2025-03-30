import {SharedValue, useSharedValue} from 'react-native-reanimated';

const DRAGGER_COLORS = {
  DEFAULT: '#6B7280' + '59', // A lighter gray
  DRAGGING: '#60A5FA' + '59',
  ERROR: '#EF4444' + '59',
} as const;

interface DraggerValues {
  x: SharedValue<number>;
  y: SharedValue<number>;
  contextX: SharedValue<number>;
  contextY: SharedValue<number>;
  opacity: SharedValue<number>;
  svgColor: SharedValue<string>;
  month: SharedValue<number>;
  year: SharedValue<number>;
  dragging: SharedValue<boolean>;
}

interface DraggerConfig {
  defaultX: number;
  defaultY: number;
  initialMonth: number;
  initialYear: number;
  initialOpacity?: number;
  initialColor?: string;
}

export const useDragger = ({
  defaultX,
  defaultY,
  initialMonth,
  initialYear,
  initialOpacity = 0.8,
  initialColor = DRAGGER_COLORS.DEFAULT,
}: DraggerConfig): DraggerValues => {
  return {
    x: useSharedValue(defaultX),
    y: useSharedValue(defaultY),
    contextX: useSharedValue(0),
    contextY: useSharedValue(0),
    opacity: useSharedValue(initialOpacity),
    svgColor: useSharedValue<string>(initialColor),
    month: useSharedValue(initialMonth),
    year: useSharedValue(initialYear),
    dragging: useSharedValue(false),
  };
};

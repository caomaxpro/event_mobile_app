import {useSharedValue, useAnimatedStyle} from 'react-native-reanimated';
import {ViewStyle} from 'react-native';
import {DRAGGER_COLORS} from '@src/contexts/CalendarProvider';

interface UseBaseDraggerProps {
  defaultX: number;
  defaultY: number;
  initialMonth: number;
  initialYear: number;
}

export const useBaseDragger = ({
  defaultX,
  defaultY,
  initialMonth,
  initialYear,
}: UseBaseDraggerProps) => {
  const x = useSharedValue(defaultX);
  const y = useSharedValue(defaultY);
  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);
  const opacity = useSharedValue(0.8);
  const backgroundColor = useSharedValue<string>(DRAGGER_COLORS.DEFAULT);
  const month = useSharedValue(initialMonth);
  const year = useSharedValue(initialYear);
  const isDragging = useSharedValue(false);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    top: y.value,
    left: x.value,
    backgroundColor: backgroundColor.value,
  }));

  const setPosition = (column: number, row: number) => {
    x.value = column * 53;
    y.value = row * 53;
  };

  const show = () => {
    opacity.value = 1;
  };

  const hide = () => {
    opacity.value = 0;
  };

  return {
    x,
    y,
    contextX,
    contextY,
    opacity,
    backgroundColor,
    month,
    year,
    isDragging,
    style,
    setPosition,
    show,
    hide,
  };
};

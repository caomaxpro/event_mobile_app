import {Gesture} from 'react-native-gesture-handler';
import {DRAGGER_COLORS} from '@src/contexts/CalendarProvider';
import {CalendarDayMap} from '@src/contexts/CalendarProvider';
import {useBaseDragger} from './useBaseDragger';
import {useEffect, useRef} from 'react';

interface UseRightDraggerProps {
  defaultX: number;
  defaultY: number;
  initialMonth: number;
  initialYear: number;
  daysMap: CalendarDayMap;
  leftDraggerPosition: {
    x: number;
    y: number;
    month: number;
    year: number;
  };
}

export const useRightDragger = ({
  defaultX,
  defaultY,
  initialMonth,
  initialYear,
  daysMap,
  leftDraggerPosition,
}: UseRightDraggerProps) => {
  const daysMapRef = useRef(daysMap);

  useEffect(() => {
    // console.log('[useRightDragger] daysMap updated:', daysMap);
    daysMapRef.current = daysMap;
  }, [daysMap]);

  const baseDragger = useBaseDragger({
    defaultX,
    defaultY,
    initialMonth,
    initialYear,
  });

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
      baseDragger.contextX.value = baseDragger.x.value;
      baseDragger.contextY.value = baseDragger.y.value;
      baseDragger.backgroundColor.value = DRAGGER_COLORS.DRAGGING;
    })
    .onUpdate(event => {
      const newX = baseDragger.contextX.value + event.translationX;
      const newY = baseDragger.contextY.value + event.translationY;

      const snappedX = Math.floor((newX + 25) / 53) * 53;
      const snappedY = Math.floor((newY + 25) / 53) * 53;

      const [newRow, newColumn] = calculateCoordinateFromPosition(
        snappedX,
        snappedY,
      );
      const [leftRow, leftColumn] = calculateCoordinateFromPosition(
        leftDraggerPosition.x,
        leftDraggerPosition.y,
      );

      const coordinate: `${number},${number}` = `${newRow},${newColumn}`;
      const leftCoordinate: `${number},${number}` = `${leftRow},${leftColumn}`;

      const isValidDayPosition = coordinate in daysMapRef.current;

      const rightIndex = daysMapRef.current[coordinate]?.index;
      const leftIndex = daysMapRef.current[leftCoordinate]?.index;
      const isInvalidPosition = rightIndex < leftIndex;

      if (isInvalidPosition) {
        baseDragger.backgroundColor.value = DRAGGER_COLORS.ERROR;
      } else {
        baseDragger.backgroundColor.value = DRAGGER_COLORS.DRAGGING;
      }

      if (isValidDayPosition) {
        baseDragger.x.value = snappedX;
        baseDragger.y.value = snappedY;
      }
    })
    .onEnd(() => {
      baseDragger.x.value = Math.floor((baseDragger.x.value + 25) / 53) * 53;
      baseDragger.y.value = Math.floor((baseDragger.y.value + 25) / 53) * 53;
      baseDragger.backgroundColor.value = DRAGGER_COLORS.DEFAULT;
    })
    .runOnJS(true);

  return {
    ...baseDragger,
    panGesture,
  };
};

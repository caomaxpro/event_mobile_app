import {useCallback, useMemo, useState} from 'react';
import {useSharedValue, useAnimatedStyle, clamp} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';

type CellCoordinate = {
  [key: `${number},${number}`]: number;
};

export const useCalendarCells = () => {
  // Animated values for left dragger
  const leftDraggerX = useSharedValue(-53);
  const leftDraggerY = useSharedValue(0);
  const leftDraggerContextX = useSharedValue(0);
  const leftDraggerContextY = useSharedValue(0);
  const leftDraggerOpacity = useSharedValue(1);

  // Animated values for right dragger
  const rightDraggerX = useSharedValue(-53);
  const rightDraggerY = useSharedValue(0);
  const rightDraggerContextX = useSharedValue(0);
  const rightDraggerContextY = useSharedValue(0);
  const rightDraggerOpacity = useSharedValue(1);

  const isHorizontalMovement = useSharedValue<boolean | undefined>(undefined);

  // Cell positions state
  const [dayCells, setDayCells] = useState<CellCoordinate>({});

  // Animated styles
  const leftDraggerStyle = useAnimatedStyle(() => ({
    opacity: leftDraggerOpacity.value,
    top: leftDraggerY.value,
    left: leftDraggerX.value,
  }));

  const rightDraggerStyle = useAnimatedStyle(() => ({
    opacity: rightDraggerOpacity.value,
    top: rightDraggerY.value,
    left: rightDraggerX.value,
  }));

  // Pan gesture handlers
  const panLeftDragger = Gesture.Pan()
    .onStart(() => {
      leftDraggerContextX.value = leftDraggerX.value;
      leftDraggerContextY.value = leftDraggerY.value;
    })
    .onUpdate(event => {
      isHorizontalMovement.value = determineMovementDirection(
        event,
        isHorizontalMovement.value,
      );

      if (isHorizontalMovement.value === undefined) return;

      if (isHorizontalMovement.value) {
        const date = new Date();

        // calculate current date coordinate
        const [currentDateRow, currentDatecolumn] =
          calculateCoordinateFromDayIndex()(date.getDay() - 1);

        // calculate left dragger coordinate
        const [leftDraggerRow, leftDraggerColumn] =
          calculateCoordinateFromPosition(
            leftDraggerX.value,
            leftDraggerY.value,
          );

        // calculate right dragger coordinate
        const [rightDraggerRow, rightDraggerColumn] =
          calculateCoordinateFromPosition(
            rightDraggerX.value,
            rightDraggerY.value,
          );

        // For horizontal movement:
        // 1. First snap Y to grid
        // leftDraggerY.value = Math.floor((leftDraggerY.value + 25) / 53) * 53;

        // 2. Calculate new X position
        const newX = leftDraggerContextX.value + event.translationX;

        // leftDraggerY.value = new;

        // 3. Don't allow moving beyond right dragger's column
        leftDraggerX.value = clamp(newX, 0, 53 * 5);

        if (
          leftDraggerRow >= currentDateRow &&
          leftDraggerColumn >= currentDatecolumn &&
          leftDraggerRow <= rightDraggerRow &&
          leftDraggerColumn <= rightDraggerColumn
        ) {
          leftDraggerY.value = leftDraggerRow * 53;
          leftDraggerX.value = leftDraggerColumn * 53;
        }
      } else {
        // For vertical movement:
        // 1. First snap X to grid
        leftDraggerX.value = Math.floor((leftDraggerX.value + 25) / 53) * 53;

        // 2. Calculate new Y position
        const newY = leftDraggerContextY.value + event.translationY;

        // 3. Don't allow moving beyond right dragger's row
        leftDraggerY.value = Math.min(newY, rightDraggerY.value);
      }
    })
    .onEnd(() => {
      // Snap both X and Y to grid
      leftDraggerX.value = Math.floor((leftDraggerX.value + 25) / 53) * 53;
      leftDraggerY.value = Math.floor((leftDraggerY.value + 25) / 53) * 53;
      isHorizontalMovement.value = undefined;
    })
    .runOnJS(true);

  const panRightDragger = Gesture.Pan()
    .onStart(() => {
      rightDraggerContextX.value = rightDraggerX.value;
      rightDraggerContextY.value = rightDraggerY.value;
    })
    .onUpdate(event => {
      // Calculate center position
      const centerX = rightDraggerContextX.value + event.translationX + 25;
      const centerY = rightDraggerContextY.value + event.translationY + 25;

      console.log('[center right]: ', centerX, centerY);

      // Calculate left dragger center position
      const leftDraggerCenterX = leftDraggerX.value + 25;
      const leftDraggerCenterY = leftDraggerY.value + 25;

      // Clamp center position
      const clampedCenterY = Math.max(
        leftDraggerCenterY,
        Math.min(centerY, 53 * 5 + 25),
      );

      const clampedCenterX = Math.max(
        clampedCenterY === leftDraggerCenterY ? leftDraggerCenterX : 25,
        Math.min(centerX, 53 * 5 + 25),
      );

      // Convert back to top-left position and snap to grid
      const newY = Math.floor((clampedCenterY - 25) / 53) * 53;
      let newX = Math.floor((clampedCenterX - 25) / 53) * 53;

      // Prevent moving beyond left dragger in same row
      if (newY === leftDraggerY.value && newX < leftDraggerX.value) {
        newX = leftDraggerX.value;
      }

      rightDraggerY.value = newY;
      rightDraggerX.value = newX;

      const cellCenter = [rightDraggerX.value + 25, rightDraggerY.value + 25];
      const row = Math.floor(cellCenter[1] / 53);
      const column = Math.floor(cellCenter[0] / 53);
      const coordinate: `${number},${number}` = `${row},${column}`;

      if (coordinate in dayCells) {
        console.log('hit cell index:', dayCells[coordinate]);
        console.log('[Day Cells]:', dayCells);
      }

      console.log('update right dragger:', row, column);
    })
    .onEnd(() => {
      console.log('end right dragger');
    })
    .runOnJS(true);

  // Helper functions
  const determineMovementDirection = (
    event: {translationX: number; translationY: number},
    currentDirection: boolean | undefined,
  ): boolean | undefined => {
    const MOVEMENT_THRESHOLD = 20;

    const significantHorizontal =
      Math.abs(event.translationX) > MOVEMENT_THRESHOLD;
    const significantVertical =
      Math.abs(event.translationY) > MOVEMENT_THRESHOLD;

    if (currentDirection !== undefined) return currentDirection;

    if (significantHorizontal && !significantVertical) {
      return true;
    } else if (!significantHorizontal && significantVertical) {
      return false;
    } else if (significantHorizontal && significantVertical) {
      return Math.abs(event.translationX) > Math.abs(event.translationY);
    }

    return undefined;
  };

  const isPastDay = (
    row: number,
    column: number,
    month: number,
    year: number,
  ): boolean => {
    const pastDays = generatePastDaysCoordinatesSet(month, year);
    return pastDays.has(`${row},${column}`);
  };

  const generatePastDaysCoordinatesSet = useCallback(
    (
      month: number = new Date().getMonth(),
      year: number = new Date().getFullYear(),
    ): Set<string> => {
      const today = new Date();
      const isCurrentMonth =
        month === today.getMonth() && year === today.getFullYear();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const pastCoordinates = new Set<string>();

      // If viewing a past month, include all days
      // If current month, include only past days
      // If future month, return empty set
      if (
        year < today.getFullYear() ||
        (year === today.getFullYear() && month < today.getMonth())
      ) {
        // Past month - include all days
        for (let day = 1; day <= daysInMonth; day++) {
          const index = day - 1;
          const row = Math.floor(index / 6);
          const column = index % 6;
          pastCoordinates.add(`${row},${column}`);
        }
      } else if (isCurrentMonth) {
        // Current month - include only past days
        for (let day = 1; day < today.getDate(); day++) {
          const index = day - 1;
          const row = Math.floor(index / 6);
          const column = index % 6;
          pastCoordinates.add(`${row},${column}`);
        }
      }
      // Future months - return empty set

      return pastCoordinates;
    },
    [],
  );

  const calculateCoordinateFromDayIndex = useCallback(
    () =>
      (index: number): [number, number] => {
        const row = Math.floor(index / 6);
        const column = index % 6;

        return [row, column];
      },
    [],
  );

  const calculateCoordinateFromPosition = useCallback(
    (x: number, y: number): [number, number] => {
      // Since each cell is 53x53, divide by 53 and floor to get row/column
      const row = Math.floor(y / 53);
      const column = Math.floor(x / 53);
      return [row, column];
    },
    [],
  );

  const updateCellPosition = (index: number) => {
    const row = Math.floor(index / 6);
    const column = index % 6;
    const coordinate: `${number},${number}` = `${row},${column}`;

    setDayCells(prev => ({
      ...prev,
      [coordinate]: index,
    }));

    return {row, column, coordinate};
  };

  const setLeftDraggerPosition = (column: number, row: number) => {
    leftDraggerX.value = column * 53;
    leftDraggerY.value = row * 53;
  };

  const setRightDraggerPosition = (column: number, row: number) => {
    rightDraggerX.value = column * 53;
    rightDraggerY.value = row * 53;
  };

  const showLeftDragger = () => {
    leftDraggerOpacity.value = 1;
  };

  const hideLeftDragger = () => {
    leftDraggerOpacity.value = 0;
  };

  const showRightDragger = () => {
    rightDraggerOpacity.value = 1;
  };

  const hideRightDragger = () => {
    rightDraggerOpacity.value = 0;
  };

  const resetDraggers = () => {
    // Reset left dragger
    leftDraggerX.value = -53;
    leftDraggerY.value = 0;
    leftDraggerContextX.value = 0;
    leftDraggerContextY.value = 0;
    leftDraggerOpacity.value = 1;

    // Reset right dragger
    rightDraggerX.value = -53;
    rightDraggerY.value = 0;
    rightDraggerContextX.value = 0;
    rightDraggerContextY.value = 0;
    rightDraggerOpacity.value = 1;
  };

  return {
    // Animated values
    leftDraggerX,
    leftDraggerY,
    leftDraggerOpacity,
    rightDraggerX,
    rightDraggerY,
    rightDraggerOpacity,

    // State
    dayCells,
    setDayCells,

    // Styles
    leftDraggerStyle,
    rightDraggerStyle,

    // Gestures
    panLeftDragger,
    panRightDragger,

    // Methods
    updateCellPosition,
    setLeftDraggerPosition,
    setRightDraggerPosition,
    showLeftDragger,
    hideLeftDragger,
    showRightDragger,
    hideRightDragger,
    resetDraggers,
  };
};

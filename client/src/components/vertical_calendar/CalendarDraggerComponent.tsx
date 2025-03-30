import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import {DraggingButton} from '@src/assets/svg/bottom_bar_svg/DraggingButton';

const AnimatedDraggingButton = Animated.createAnimatedComponent(DraggingButton);

interface CalendarDraggerProps {
  isLeft?: boolean;
  draggerStyle: any;
  panGesture: any;
  // Thêm các props mới
  draggerMonth: SharedValue<number>;
  draggerYear: SharedValue<number>;
  currentMonth: number;
  currentYear: number;
  isVisible?: boolean; // Optional prop để kiểm soát việc hiển thị từ parent
}

const CalendarDragger: React.FC<CalendarDraggerProps> = ({
  isLeft = false,
  draggerStyle,
  panGesture,
  draggerMonth,
  draggerYear,
  currentMonth,
  currentYear,
  isVisible = true,
}) => {
  // Sử dụng useAnimatedReaction để theo dõi thay đổi của draggerStyle
  useAnimatedReaction(
    () => {
      return {
        x: draggerStyle.left,
        y: draggerStyle.top,
        opacity: draggerStyle.opacity,
        color: draggerStyle.backgroundColor,
      };
    },
    (current, previous) => {
      'worklet';
      if (previous && JSON.stringify(current) !== JSON.stringify(previous)) {
        runOnJS(console.log)(`[${isLeft ? 'Left' : 'Right'} Dragger Style]:`, {
          current,
          previous,
        });
      }
    },
    [draggerStyle],
  );

  const shouldShow =
    isVisible &&
    draggerMonth.value === currentMonth &&
    draggerYear.value === currentYear;

  if (!shouldShow) {
    return null;
  }

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.draggerContainer,
          isLeft ? null : styles.rightDragger,
          draggerStyle,
        ]}>
        <AnimatedDraggingButton
          rotation={isLeft ? 180 : 0}
          translateX={isLeft ? -15 : 0}
          translateY={-1}
          // fillColor={draggerSvgColor}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  draggerContainer: {
    width: 50,
    height: 50,
    borderWidth: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    borderRadius: 5,
  },
  rightDragger: {
    opacity: 0.5,
  },
});

export default React.memo(CalendarDragger, (prevProps, nextProps) => {
  // Tối ưu re-render với memo
  return (
    prevProps.currentMonth === nextProps.currentMonth &&
    prevProps.currentYear === nextProps.currentYear &&
    prevProps.draggerMonth.value === nextProps.draggerMonth.value &&
    prevProps.draggerYear.value === nextProps.draggerYear.value &&
    prevProps.isVisible === nextProps.isVisible
  );
});

// import React from 'react';
// import {StyleSheet} from 'react-native';
// import {Gesture, GestureDetector} from 'react-native-gesture-handler';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   runOnJS,
//   useAnimatedReaction,
// } from 'react-native-reanimated';
// import {DraggingButton} from '@src/assets/svg/bottom_bar_svg/DraggingButton';
// import {DRAGGER_COLORS} from '@src/contexts/CalendarProvider';
// import {useCalendar} from '@src/contexts/CalendarProvider';

// const AnimatedDraggingButton = Animated.createAnimatedComponent(DraggingButton);

// export const RightDragger: React.FC = () => {
//   const {leftDraggerX, leftDraggerY} = useCalendar();

//   // Tính toán vị trí mặc định dựa trên ngày hiện tại
//   const currentDate = new Date();
//   const x = useSharedValue(currentDate.getDate() * 53);
//   const y = useSharedValue(Math.floor(currentDate.getDate() / 7) * 53);
//   const month = useSharedValue(currentDate.getMonth());
//   const year = useSharedValue(currentDate.getFullYear());

//   const topLeft = useSharedValue({x: x.value, y: y.value});
//   const topRight = useSharedValue({x: x.value + 53, y: y.value});
//   const bottomLeft = useSharedValue({x: x.value, y: y.value + 53});
//   const bottomRight = useSharedValue({x: x.value + 53, y: y.value + 53});

//   const contextX = useSharedValue(0);
//   const contextY = useSharedValue(0);
//   const backgroundColor = useSharedValue(DRAGGER_COLORS.DEFAULT);

//   useAnimatedReaction(
//     () => ({x: x.value, y: y.value}),
//     (current, previous) => {
//       if (previous && JSON.stringify(current) !== JSON.stringify(previous)) {
//         topLeft.value = {...current};
//         topRight.value = {x: current.x + 53, y: current.y};
//         bottomLeft.value = {x: current.x, y: current.y + 53};
//         bottomRight.value = {x: current.x + 53, y: current.y + 53};
//       }
//     },
//     [x, y],
//   );

//   const calculateCoordinateFromPosition = (
//     posX: number,
//     posY: number,
//   ): [number, number] => {
//     const row = Math.floor(posY / 53);
//     const column = Math.floor(posX / 53);
//     return [row, column];
//   };

//   const panGesture = Gesture.Pan()
//     .onStart(() => {
//       contextX.value = x.value;
//       contextY.value = y.value;
//       backgroundColor.value = DRAGGER_COLORS.DRAGGING;
//     })
//     .onUpdate(event => {
//       const newX = contextX.value + event.translationX;
//       const newY = contextY.value + event.translationY;

//       const snappedX = Math.floor((newX + 25) / 53) * 53;
//       const snappedY = Math.floor((newY + 25) / 53) * 53;

//       const [newRow, newColumn] = calculateCoordinateFromPosition(
//         snappedX,
//         snappedY,
//       );
//       const [leftRow, leftColumn] = calculateCoordinateFromPosition(
//         leftDraggerX.value,
//         leftDraggerY.value,
//       );

//       // Kiểm tra và cập nhật vị trí
//       if (newRow >= leftRow && newColumn >= leftColumn) {
//         x.value = newX;
//         y.value = newY;
//       }
//     })
//     .onEnd(() => {
//       x.value = Math.floor((x.value + 25) / 53) * 53;
//       y.value = Math.floor((y.value + 25) / 53) * 53;
//       backgroundColor.value = DRAGGER_COLORS.DEFAULT;
//     })
//     .runOnJS(true);

//   const style = useAnimatedStyle(() => ({
//     transform: [{translateX: x.value}, {translateY: y.value}],
//     backgroundColor: backgroundColor.value,
//   }));

//   return (
//     <GestureDetector gesture={panGesture}>
//       <Animated.View style={[styles.dragger, style]}>
//         <AnimatedDraggingButton rotation={0} translateX={0} translateY={-1} />
//       </Animated.View>
//     </GestureDetector>
//   );
// };

// const styles = StyleSheet.create({
//   dragger: {
//     width: 53,
//     height: 53,
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 2,
//   },
// });

// import React, {useEffect} from 'react';
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
// import {SCREEN_WIDTH} from '@src/utils/appInfo';

// const AnimatedDraggingButton = Animated.createAnimatedComponent(DraggingButton);

// const PICKER_CONSTANTS = {
//   OFFSET_X: 0,
//   OFFSET_Y: 0,
//   PICKER_WIDTH: 50,
//   PICKER_HEIGHT: 50,
// } as const;

// export const LeftPicker: React.FC = () => {
//   const {leftX, leftY, scrollOffset, bound1, bound2} = useCalendar();

//   const x = useSharedValue<number>(PICKER_CONSTANTS.OFFSET_X);
//   const y = useSharedValue<number>(PICKER_CONSTANTS.OFFSET_Y);

//   const contextX = useSharedValue(0);
//   const contextY = useSharedValue(0);
//   const backgroundColor = useSharedValue(DRAGGER_COLORS.DEFAULT);

//   const upperBound = useSharedValue<number>(0);
//   const lowerBound = useSharedValue<number>(0);

//   // Theo dõi scroll và cập nhật vị trí picker
//   //   useAnimatedReaction(
//   //     () => ({
//   //       offset: scrollOffset.value,
//   //       bound1: bound1.value,
//   //       bound2: bound2.value,
//   //     }),
//   //     (current, previous) => {
//   //       if (!previous) return;

//   //       const moduleY = current.offset.y % 300;
//   //       const viewportTop = current.offset.y;
//   //       const viewportBottom = viewportTop + 300;

//   //       console.log('=== Picker Position Debug ===');
//   //       console.log('Current Picker Position:', {x: x.value, y: y.value});
//   //       console.log('Viewport:', {top: viewportTop, bottom: viewportBottom});
//   //       console.log('Bounds 1:', current.bound1);
//   //       console.log('Bounds 2:', current.bound2);

//   //       // Kiểm tra xem picker có nằm trong viewport không
//   //       if (y.value < viewportTop || y.value > viewportBottom) {
//   //         console.log('Picker out of viewport! Adjusting...');
//   //         console.log('Before adjustment:', {x: x.value, y: y.value});

//   //         if (y.value < viewportTop) {
//   //           y.value = viewportTop + 50;
//   //         } else if (y.value > viewportBottom) {
//   //           y.value = viewportBottom - PICKER_CONSTANTS.PICKER_HEIGHT;
//   //         }

//   //         console.log('After adjustment:', {x: x.value, y: y.value});
//   //       }

//   //       // Cập nhật bounds dựa trên calendar items visible
//   //       if (y.value >= current.bound1.upper && y.value <= current.bound1.lower) {
//   //         console.log('Picker in Bound 1');
//   //         upperBound.value = Math.max(current.bound1.upper, viewportTop);
//   //         lowerBound.value = Math.min(current.bound1.lower, viewportBottom);

//   //         const relativeY = y.value - upperBound.value;
//   //         const headerHeight = 50;

//   //         console.log('Bound 1 Snap Calculation:', {
//   //           relativeY,
//   //           upperBound: upperBound.value,
//   //           lowerBound: lowerBound.value,
//   //         });

//   //         if (relativeY < headerHeight) {
//   //           y.value = upperBound.value + headerHeight;
//   //         } else {
//   //           const gridY =
//   //             Math.floor(
//   //               (relativeY - headerHeight) / PICKER_CONSTANTS.PICKER_HEIGHT,
//   //             ) *
//   //               PICKER_CONSTANTS.PICKER_HEIGHT +
//   //             headerHeight;
//   //           y.value = upperBound.value + gridY;
//   //         }
//   //       } else if (
//   //         y.value >= current.bound2.upper &&
//   //         y.value <= current.bound2.lower
//   //       ) {
//   //         console.log('Picker in Bound 2');
//   //         upperBound.value = Math.max(current.bound2.upper, viewportTop);
//   //         lowerBound.value = Math.min(current.bound2.lower, viewportBottom);

//   //         const relativeY = y.value - upperBound.value;
//   //         const headerHeight = 50;

//   //         console.log('Bound 2 Snap Calculation:', {
//   //           relativeY,
//   //           upperBound: upperBound.value,
//   //           lowerBound: lowerBound.value,
//   //         });

//   //         if (relativeY < headerHeight) {
//   //           y.value = upperBound.value + headerHeight;
//   //         } else {
//   //           const gridY =
//   //             Math.floor(
//   //               (relativeY - headerHeight) / PICKER_CONSTANTS.PICKER_HEIGHT,
//   //             ) *
//   //               PICKER_CONSTANTS.PICKER_HEIGHT +
//   //             headerHeight;
//   //           y.value = upperBound.value + gridY;
//   //         }
//   //       }
//   //     },
//   //     [scrollOffset, bound1, bound2],
//   //   );

//   const panGesture = Gesture.Pan()
//     .onStart(() => {
//       contextX.value = x.value;
//       contextY.value = y.value;
//       backgroundColor.value = DRAGGER_COLORS.DRAGGING;
//     })
//     .onUpdate(event => {
//       const newX = Math.max(
//         0,
//         Math.min(
//           contextX.value + event.translationX,
//           PICKER_CONSTANTS.PICKER_WIDTH * 6,
//         ),
//       );

//       // Giới hạn y trong viewport và bounds
//       const viewportTop = scrollOffset.value.y;
//       const viewportBottom = viewportTop + 300;

//       const newY = Math.max(
//         Math.max(upperBound.value, viewportTop + 50), // Không cho phép kéo vào header
//         Math.min(
//           contextY.value + event.translationY,
//           Math.min(
//             lowerBound.value,
//             viewportBottom - PICKER_CONSTANTS.PICKER_HEIGHT,
//           ),
//         ),
//       );

//       x.value = newX;
//       y.value = newY;
//     })
//     .onEnd(() => {
//       x.value =
//         Math.floor((x.value + 25) / PICKER_CONSTANTS.PICKER_WIDTH) *
//         PICKER_CONSTANTS.PICKER_WIDTH;
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
//         <AnimatedDraggingButton rotation={180} translateX={-8} translateY={1} />
//       </Animated.View>
//     </GestureDetector>
//   );
// };

// const styles = StyleSheet.create({
//   dragger: {
//     width: 50,
//     height: 50,
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 2,
//     borderWidth: 1,
//   },
// });

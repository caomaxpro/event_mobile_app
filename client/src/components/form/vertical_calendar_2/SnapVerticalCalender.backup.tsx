// import React, {useEffect, useState, useRef} from 'react';
// import {StyleSheet, View, ViewToken, ActivityIndicator} from 'react-native';
// import {FlashList} from '@shopify/flash-list';
// import CalanderItem from './CalendarItem';
// import {SCREEN_WIDTH} from '@src/utils/appInfo';
// import {useCalendar} from '@src/hooks/useCalendar';
// import {
//   runOnJS,
//   useSharedValue,
//   runOnUI,
//   useDerivedValue,
// } from 'react-native-reanimated';
// import CalendarErrorBoundary from '../ErrorBoundary';

// // Constants for calendar dimensions
// const CALENDAR_CONSTANTS = {
//   WIDTH: SCREEN_WIDTH * 0.9,
//   HEIGHT: 450,
//   SNAP_INTERVAL: 450,
// } as const;

// const SnapVerticalCalender = () => {
//   const calanderCells = useCalendar();
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [isScrolling, setIsScrolling] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Initialize with local Date values instead of shared values
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

//   // Use derived values to watch for changes
//   useDerivedValue(() => {
//     runOnJS(setCurrentMonth)(calanderCells.month.value);
//     runOnJS(setCurrentYear)(calanderCells.year.value);
//   }, [calanderCells.month, calanderCells.year]);

//   const flashListRef = useRef<FlashList<{month: number; year: number}>>(null);
//   const currentIndexRef = useRef<number>(0);
//   const isLoadingMoreRef = useRef(false);
//   const isAddingMonthRef = useRef(false);

//   // Thêm batch size để kiểm soát số lượng tháng thêm vào mỗi lần
//   const BATCH_SIZE = 2;

//   // Remove the useEffect with listeners since we're using useDerivedValue now

//   // Add constant for threshold
//   const LOAD_MORE_THRESHOLD = 1; // Số tháng còn lại trước khi load thêm

//   // Helper function to check if month exists
//   const isMonthExists = (
//     month: number,
//     year: number,
//     list: {month: number; year: number}[],
//   ) => {
//     return list.some(item => item.month === month && item.year === year);
//   };

//   // Helper function to get next month and year
//   const getNextMonth = (month: number, year: number) => {
//     const nextMonth = month === 11 ? 0 : month + 1;
//     const nextYear = month === 11 ? year + 1 : year;
//     return {month: nextMonth, year: nextYear};
//   };

//   // Helper function to get previous month and year
//   const getPrevMonth = (month: number, year: number) => {
//     const prevMonth = month === 0 ? 11 : month - 1;
//     const prevYear = month === 0 ? year - 1 : year;
//     return {month: prevMonth, year: prevYear};
//   };

//   const [calendars, setCalendars] = useState<{month: number; year: number}[]>(
//     () => {
//       const currentDate = new Date();
//       const currentMonth = currentDate.getMonth();
//       const currentYear = currentDate.getFullYear();

//       const prev = getPrevMonth(currentMonth, currentYear);
//       const next = getNextMonth(currentMonth, currentYear);

//       return [prev, {month: currentMonth, year: currentYear}, next].filter(
//         item => item != null,
//       ); // Đảm bảo không có item null
//     },
//   );

//   // Thêm hàm kiểm tra trùng lặp chặt chẽ hơn
//   const isDuplicateMonth = (
//     month: number,
//     year: number,
//     list: {month: number; year: number}[],
//   ) => {
//     return list.some(item => item.month === month && item.year === year);
//   };

//   // Thêm state để theo dõi vị trí scroll
//   const [viewableIndex, setViewableIndex] = useState(1);

//   // Thêm ref để theo dõi scroll position
//   const scrollOffsetRef = useRef(0);
//   const lastContentOffsetY = useRef(0);
//   const isScrollingUp = useRef(false);

//   const handleScroll = (event: any) => {
//     const currentOffset = event.nativeEvent.contentOffset.y;
//     isScrollingUp.current = currentOffset < lastContentOffsetY.current;
//     lastContentOffsetY.current = currentOffset;
//     scrollOffsetRef.current = currentOffset;
//   };

//   const handleViewableItemsChanged = ({
//     viewableItems,
//   }: {
//     viewableItems: ViewToken[];
//   }) => {
//     if (!viewableItems || viewableItems.length === 0) return;

//     // Find first valid viewable item
//     const validItem = viewableItems.find(
//       item => item && typeof item.index === 'number' && item.index >= 0,
//     );

//     if (!validItem || typeof validItem.index !== 'number') return;

//     const currentIndex = validItem.index;

//     // Prevent multiple simultaneous updates
//     if (isUpdating || isLoadingMoreRef.current || isAddingMonthRef.current)
//       return;

//     // Update the viewable index with a guaranteed number
//     setViewableIndex(currentIndex);
//     currentIndexRef.current = currentIndex;

//     // Handle pagination with guaranteed numbers
//     if (!isScrolling && calendars.length > 0) {
//       const remainingItems = Math.max(0, calendars.length - (currentIndex + 1));

//       if (remainingItems <= LOAD_MORE_THRESHOLD) {
//         handleAddNextMonths();
//       } else if (currentIndex <= LOAD_MORE_THRESHOLD && isScrollingUp.current) {
//         handleAddPreviousMonths();
//       }
//     }
//   };

//   const handleAddNextMonths = () => {
//     if (isUpdating || isLoadingMoreRef.current) return;

//     setIsLoading(true);
//     setIsUpdating(true);

//     setCalendars(prev => {
//       const lastCalendar = prev[prev.length - 1];
//       const {month: nextMonth, year: nextYear} = getNextMonth(
//         lastCalendar.month,
//         lastCalendar.year,
//       );

//       if (isDuplicateMonth(nextMonth, nextYear, prev)) {
//         return prev;
//       }

//       return [...prev, {month: nextMonth, year: nextYear}];
//     });

//     setIsUpdating(false);
//     setIsLoading(false);
//   };

//   const handleAddPreviousMonths = () => {
//     if (isAddingMonthRef.current || isLoadingMoreRef.current) return;

//     isAddingMonthRef.current = true;
//     setIsLoading(true);
//     isLoadingMoreRef.current = true;

//     const currentOffset = scrollOffsetRef.current;

//     setCalendars(prev => {
//       const firstCalendar = prev[0];
//       const newMonths = [];

//       for (let i = 0; i < BATCH_SIZE; i++) {
//         const {month: prevMonth, year: prevYear} = getPrevMonth(
//           i === 0 ? firstCalendar.month : newMonths[i - 1].month,
//           i === 0 ? firstCalendar.year : newMonths[i - 1].year,
//         );

//         if (!isDuplicateMonth(prevMonth, prevYear, [...newMonths, ...prev])) {
//           newMonths.unshift({month: prevMonth, year: prevYear});
//         }
//       }

//       // Immediately update the scroll position after adding new months
//       setTimeout(() => {
//         if (flashListRef.current) {
//           flashListRef.current.scrollToOffset({
//             offset: currentOffset + CALENDAR_CONSTANTS.HEIGHT * BATCH_SIZE,
//             animated: false,
//           });
//         }
//       }, 0);

//       return [...newMonths, ...prev];
//     });

//     // Reset flags after a short delay
//     setTimeout(() => {
//       isAddingMonthRef.current = false;
//       isLoadingMoreRef.current = false;
//       setIsLoading(false);
//     }, 100);
//   };

//   // Thêm log để debug
//   useEffect(() => {
//     console.log(
//       'Calendar months:',
//       calendars.map((c, i) => `[${i}] ${c.month + 1}/${c.year}`).join(', '),
//     );
//   }, [calendars]);

//   // Thêm viewabilityConfig bên ngoài component để tránh re-render
//   const viewabilityConfig = {
//     itemVisiblePercentThreshold: 50,
//     minimumViewTime: 100,
//   };

//   const LoadingIndicator = () => (
//     <View style={styles.loadingContainer}>
//       <ActivityIndicator size="small" color="#007AFF" />
//     </View>
//   );

//   const renderItem = React.useCallback(
//     ({item}: {item: {month: number; year: number}}) => (
//       <CalanderItem
//         itemMonth={item.month}
//         itemYear={item.year}
//         calendarCells={calanderCells}
//       />
//     ),
//     [calanderCells],
//   );

//   return (
//     <CalendarErrorBoundary>
//       <View style={styles.container}>
//         <View style={styles.calendarContainer}>
//           <FlashList
//             ref={flashListRef}
//             data={calendars}
//             renderItem={renderItem}
//             estimatedItemSize={CALENDAR_CONSTANTS.HEIGHT} // Đảm bảo giá trị này luôn > 0
//             keyExtractor={(item, index) =>
//               `${item.month}-${item.year}-${index}`
//             }
//             showsVerticalScrollIndicator={false}
//             onViewableItemsChanged={handleViewableItemsChanged}
//             viewabilityConfig={{
//               itemVisiblePercentThreshold: 60,
//               minimumViewTime: 50,
//             }}
//             onScroll={handleScroll}
//             onScrollBeginDrag={() => setIsScrolling(true)}
//             onScrollEndDrag={() => {
//               setIsScrolling(false);
//               isLoadingMoreRef.current = false;
//               isAddingMonthRef.current = false;
//             }}
//             onMomentumScrollEnd={() => {
//               setIsScrolling(false);
//               isLoadingMoreRef.current = false;
//               isAddingMonthRef.current = false;
//             }}
//             maintainVisibleContentPosition={{
//               minIndexForVisible: 0,
//               autoscrollToTopThreshold: null,
//             }}
//             initialScrollIndex={calendars.length > 0 ? 1 : 0} // Thêm điều kiện kiểm tra
//             getItemType={() => 'calendar'} // Đảm bảo luôn trả về string
//             overrideItemLayout={(layout, item) => {
//               if (layout) {
//                 // Thêm kiểm tra null
//                 layout.size = CALENDAR_CONSTANTS.HEIGHT;
//               }
//             }}
//           />
//         </View>
//       </View>
//     </CalendarErrorBoundary>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   calendarContainer: {
//     width: CALENDAR_CONSTANTS.WIDTH,
//     height: CALENDAR_CONSTANTS.HEIGHT,
//     overflow: 'hidden',
//   },
//   loadingContainer: {
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default SnapVerticalCalender;

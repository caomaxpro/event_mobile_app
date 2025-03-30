import React from 'react';
import {
  ScrollView,
  StyleSheet,
  ViewStyle,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {ms} from '@src/utils/rNResponsive';

interface SnapHorizontalScrollViewProps extends ScrollViewProps {
  children: React.ReactNode;
  containerStyle?: ViewStyle;
  scrollViewRef?: React.RefObject<ScrollView>;
}

const ITEM_SIZE = ms(350);

const SnapHorizontalScrollView: React.FC<SnapHorizontalScrollViewProps> = ({
  children,
  containerStyle,
  scrollViewRef,
  ...props
}) => {
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / ITEM_SIZE);
    const newOffset = page * ITEM_SIZE;

    if (offsetX !== newOffset) {
      scrollViewRef?.current?.scrollTo({
        x: newOffset,
        animated: true,
      });
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={ITEM_SIZE}
      snapToAlignment="center"
      onMomentumScrollEnd={onScroll}
      contentContainerStyle={[styles.container, containerStyle]}
      {...props}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ms(350),
  },
});

export default SnapHorizontalScrollView;

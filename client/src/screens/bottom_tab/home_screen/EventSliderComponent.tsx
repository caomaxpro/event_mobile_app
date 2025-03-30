import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import CustomContainerComponent from '../../../components/native_components/ContainerComponent';
import {Events} from '@src/assets/data/event';
import CustomButton from '../../../components/native_components/ButtonComponent';
import CustomIcon from '../../../components/native_components/CustomIcon';
import CustomText from '../../../components/native_components/CustomText';
import UpcomingEventItem from './UpcomingEventItem';
import CustomHorizontalScrollView from '../../../components/native_components/HorizontalScrollView';
import {ms} from '@src/utils/rNResponsive';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@src/utils/appInfo';
import {HomeComponentProp} from './types';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';
// import { ViewStyle } from 'react-native-size-matters';

type EventSliderComponentProp = HomeComponentProp & {
  title: string;
  sliderStyle?: StyleProp<ViewStyle>;
};

const EventSliderComponent: React.FC<EventSliderComponentProp> = ({
  title,
  sliderStyle,
  isEventDetail = false,
  setEventDetail,
  setViewedEvent,
}): React.JSX.Element => {
  const rScreenWidth = ms(SCREEN_WIDTH, 0);
  const rScreenHeight = ms(SCREEN_HEIGHT, 0);

  const eventSliderComponent = useAnimatedStyle(() => {
    return {
      //   height: isEventDetail
      //     ? withTiming(rScreenHeight, {duration: 200})
      //     : withTiming(350, {duration: 200}),
      //   width: isEventDetail
      //     ? withTiming(rScreenWidth, {duration: 200})
      //     : withTiming(237, {duration: 200}),

      transform: [
        {
          translateX: isEventDetail
            ? withTiming(rScreenWidth, {duration: 200})
            : withTiming(0, {duration: 200}),
        },
      ],
    };
  });

  return (
    <CustomContainerComponent
      //   onLayout={event => {
      //     setOHeight(event.nativeEvent.layout.height);
      //     setOWidth(event.nativeEvent.layout.width);
      //   }}
      customStyle={[styles.container, sliderStyle, eventSliderComponent]}
      contentStyle={{flexDirection: 'column'}}>
      <CustomContainerComponent
        contentStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}
        customStyle={{
          width: '100%',
        }}>
        <CustomText customStyle={{fontSize: 18}}>{title}</CustomText>
        <CustomButton
          customStyle={{
            width: 70,
            justifyContent: 'space-evenly',
            backgroundColor: 'transparent',
          }}>
          <CustomText
            customStyle={{fontSize: 14, color: 'rgba(116, 118, 136, 1)'}}>
            See All
          </CustomText>
          <CustomIcon
            type="AntDesign"
            name="caretright"
            size={9}
            color={'rgba(116, 118, 136, 1)'}
          />
        </CustomButton>
      </CustomContainerComponent>

      {/* <UpcomingEventItem event={Events[0]} /> */}

      <CustomHorizontalScrollView
        style={{marginTop: ms(10)}}
        containerStyle={{
          paddingVertical: ms(10),
          paddingRight: ms(20),
        }}>
        <UpcomingEventItem event={Events[0]} />
        <UpcomingEventItem event={Events[0]} />
      </CustomHorizontalScrollView>
    </CustomContainerComponent>
  );
};

export default EventSliderComponent;

const styles = StyleSheet.create({
  container: {
    //   position: 'absolute',
    //   top: 0,
    width: SCREEN_WIDTH,
    // height: SCREEN_HEIGHT,
  },
});

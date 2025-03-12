import React from 'react';
import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import {AnimatedCustomContainerComponent} from '../native_components/ContainerComponent';
import {HomeComponentProp} from './types';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {ms} from '@src/utils/rNResponsive';
import {SCREEN_HEIGHT} from '@src/utils/appInfo';
import HeaderComponent from '../HeaderComponent';
import {useAppNavigation} from '@src/hooks/userAppNavigation';
import CustomButton from '../native_components/ButtonComponent';
import CustomIcon from '../native_components/CustomIcon';
import CustomText from '../native_components/CustomText';
import {Header} from 'react-native/Libraries/NewAppScreen';

const EventDetailComponent: React.FC<HomeComponentProp> = ({
  isEventDetail = true,
}) => {
  const rScreenHeight = ms(SCREEN_HEIGHT, 0);
  const {tabNavigation} = useAppNavigation();

  const animatedEventDetailStyle = useAnimatedStyle(() => {
    return {
      height: isEventDetail
        ? withTiming(rScreenHeight, {duration: 200})
        : withTiming(0, {duration: 200}),
    };
  });

  return (
    <AnimatedCustomContainerComponent
      //   contentStyle={{
      //     display: 'flex',
      //     flexDirection: 'row',
      //     justifyContent: 'flex-start',
      //     alignContent: 'center',
      //     alignItems: 'center',
      //     paddingHorizontal: 10,
      //   }}

      customStyle={[
        {
          width: '100%',
          //   height: 60,
          //   position: 'absolute',
          paddingTop: StatusBar?.currentHeight || 0,
          backgroundColor: 'red',
        },
        animatedEventDetailStyle,
      ]}>
      {/* <HeaderComponent navigation={tabNavigation} /> */}

      <ImageBackground style={{display: 'flex'}}>
        <HeaderComponent navigation={tabNavigation} />
      </ImageBackground>
    </AnimatedCustomContainerComponent>
  );
};

export default EventDetailComponent;

const styles = StyleSheet.create({});

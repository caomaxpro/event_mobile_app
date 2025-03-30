import {ImageBackground, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomContainerComponent from '../../../components/native_components/ContainerComponent';
import CustomText from '../../../components/native_components/CustomText';
import {BookmarkIcon} from '@src/assets/svg/BookmarkIcon';
import {Event} from '@src/types/types';
import {hs, ms} from '@src/utils/rNResponsive';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@src/utils/appInfo';
import CustomIcon from '../../../components/native_components/CustomIcon';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS, useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {HomeComponentProp} from './types';
import {AppDispatch, RootState} from '@src/redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {setDetailsShowed} from '@src/redux/appSlice';

type UpcomingEventItemProp = {
  event: Event;
};

const formatDate = (date: Date): string[] => {
  return date
    .toLocaleDateString('en-GB', {day: '2-digit', month: 'long'})
    .split(' ');
};

const UpcomingEventItem: React.FC<UpcomingEventItemProp> = ({
  event,
}): React.JSX.Element => {
  useEffect(() => {}, []);

  //   const [isItemExpanded, setItemExpanded] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const {isDetailsShowed} = useSelector((state: RootState) => state.app);

  const eWidth = hs(SCREEN_WIDTH);
  const eHeight = hs(SCREEN_HEIGHT);

  const cHeight = hs(255);
  const cWidth = hs(237);

  const animatedEventStyle = useAnimatedStyle(() => {
    return {
      width: isDetailsShowed
        ? withTiming(eWidth, {duration: 500})
        : withTiming(cWidth, {duration: 500}),

      height: isDetailsShowed
        ? withTiming(eHeight, {duration: 500})
        : withTiming(cHeight, {duration: 500}),
      borderWidth: 0,

      borderRadius: isDetailsShowed
        ? withTiming(0, {duration: 500})
        : withTiming(18, {duration: 500}),
      backgroundColor: 'white',

      elevation: 2,

      marginLeft: isDetailsShowed
        ? withTiming(0, {duration: 500})
        : withTiming(9.5, {duration: 500}),
      position: isDetailsShowed ? 'absolute' : 'relative',
    };
  });

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      console.log('[Upcoming Event]: Running!!!');
      dispatch(setDetailsShowed({status: true}));
    })
    .runOnJS(true);

  return (
    <GestureDetector gesture={tapGesture}>
      <CustomContainerComponent
        customStyle={[styles.cardContainer]}
        contentStyle={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <ImageBackground
          source={require('@src/assets/images/event_card.png')}
          resizeMode="contain"
          style={styles.image}>
          <CustomContainerComponent
            contentStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
            customStyle={{
              width: 45,
              height: 45,
              borderRadius: 10,
              position: 'absolute',
              top: 10,
              left: 10,
              // borderWidth: 2,
              zIndex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
            }}>
            <CustomText
              textWeight="bold"
              customStyle={{
                textAlign: 'center',
                fontSize: ms(18),
                color: 'rgba(235, 87, 87, 1)',
              }}>
              {formatDate(new Date(event.start_time))[0]}
            </CustomText>

            <CustomText
              textWeight="light"
              customStyle={{
                textAlign: 'center',
                fontSize: ms(12),
                lineHeight: ms(14),
                color: 'rgba(235, 87, 87, 1)',
              }}>
              {formatDate(new Date(event.start_time))[1]}
            </CustomText>
          </CustomContainerComponent>

          <CustomContainerComponent
            customStyle={{
              width: 30,
              height: 30,
              borderRadius: 7,
              position: 'absolute',
              top: 10,
              right: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
            }}>
            <BookmarkIcon
              width={14}
              height={14}
              strokeColor="rgba(235, 87, 87, 1)"
              fillColor="rgba(235, 87, 87, 1)"
            />
          </CustomContainerComponent>
        </ImageBackground>

        <CustomContainerComponent
          contentStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-evenly',
            alignContent: 'space-evenly',
          }}
          customStyle={{
            marginTop: hs(10),
            height: hs(84),
            borderWidth: 0,
            width: hs(205),
            marginHorizontal: hs(16),
          }}>
          <CustomText customStyle={{fontSize: 18, marginTop: 8, height: 23}}>
            {event.title}
          </CustomText>

          <CustomContainerComponent
            contentStyle={{justifyContent: 'flex-start'}}
            customStyle={{
              marginTop: ms(10),
              borderWidth: 0,
              width: hs(205),
              height: hs(24),
            }}>
            {/* {event.participants.map((participant, index) => {
          return (
            <Image
              style={{
                width: 24,
                height: 24,
                borderRadius: 50,
                position: 'absolute',
                top: 10,
                left: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          );
        })} */}

            <CustomText customStyle={{fontSize: ms(12), color: '#3F38DD'}}>
              +20 Going{' '}
            </CustomText>
          </CustomContainerComponent>

          <CustomContainerComponent
            contentStyle={{width: 'auto'}}
            customStyle={{
              width: 'auto',
              height: 17,
              marginTop: ms(10),
            }}>
            <CustomIcon
              type="Ionicons"
              name="location-sharp"
              size={16}
              color="#716E90"
            />
            <CustomText customStyle={{fontSize: 13, color: '#716E90'}}>
              36 Guild Street London, UK
            </CustomText>
          </CustomContainerComponent>
        </CustomContainerComponent>
      </CustomContainerComponent>
    </GestureDetector>
  );
};

export default UpcomingEventItem;

const styles = StyleSheet.create({
  cardContainer: {
    width: hs(237),
    height: hs(255),
    borderWidth: 0,
    borderRadius: 18,
    backgroundColor: 'white',
    elevation: 2,
    marginLeft: 9.5,
    // boxShadow: {
    //     shadowColor: "gray"
    // }
  },

  image: {
    width: hs(218),
    height: hs(131),
    borderWidth: 0,
    marginTop: ms(9.5),
    marginLeft: ms(9.5),
    borderRadius: 10,
  },
});

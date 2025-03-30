import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomContainerComponent from '../../../components/native_components/ContainerComponent';
import {hs, ms} from '@src/utils/rNResponsive';
import CustomText from '../../../components/native_components/CustomText';
import CustomButton from '../../../components/native_components/ButtonComponent';
import {HomeComponentProp} from './types';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {SCREEN_WIDTH} from '@src/utils/appInfo';

const InviteCard: React.FC<HomeComponentProp> = ({isEventDetail}) => {
  const rScreenWidth = ms(-SCREEN_WIDTH, 0);

  const animatedInviteCardStyle = useAnimatedStyle(() => {
    return {
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
      customStyle={animatedInviteCardStyle}
      contentStyle={styles.container}>
      <Image
        source={require('@src/assets/images/invite_card.png')}
        // resizeMode="contain"
        style={{
          width: hs(263),
          height: hs(164),
          position: 'absolute',
          borderWidth: 0,
          top: ms(0),
          right: ms(-30),
        }}
      />
      <CustomText customStyle={{fontSize: ms(18)}}>
        Invite your friends
      </CustomText>
      <CustomText
        textWeight="light"
        customStyle={{fontSize: ms(13), height: hs(17)}}>
        Get $20 for ticket
      </CustomText>
      <CustomButton
        customStyle={{
          width: 72,
          height: 32,
          backgroundColor: '#00F8FF',
          borderRadius: 5,
        }}>
        <CustomText
          //   textWeight="light"
          customStyle={{
            fontSize: ms(12),
            color: 'white',
          }}>
          INVITE
        </CustomText>
      </CustomButton>
    </CustomContainerComponent>
  );
};

export default InviteCard;

const styles = StyleSheet.create({
  container: {
    width: hs(328),
    height: hs(127),
    borderWidth: 0,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: ms(15),
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    overflow: 'hidden',
    backgroundColor: '#D6FEFF',
    alignSelf: 'center',
    marginTop: ms(10),
  },
});

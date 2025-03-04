import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenComponent from '@src/components/ScreenComponent';
import {Image} from 'react-native-reanimated/lib/typescript/Animated';
import Animated from 'react-native-reanimated';
import {SCREEN_WIDTH} from '@src/utils/appInfo';
import CustomContainerComponent from '@src/components/ContainerComponent';
import CustomButton from '@src/components/ButtonComponent';
import OnboardingSkip from '@src/components/OnboardingSkip';
// import {StackScreenProps} from '@react-navigation/stack';

import {useNavigation} from '@react-navigation/native';
import {log} from '@src/utils/logUtils';

type Boarding = {
  image: number;
  message1: string;
  message2: string;
};

const boardings: Boarding[] = [
  {
    image: require('@src/assets/images/onboarding_1.png'),
    message1: 'Explore Upcoming and Nearby Events',
    message2:
      'Stay updated with the latest happenings around you. Find concerts, meetups, and more with ease.',
  },
  {
    image: require('@src/assets/images/onboarding_2.png'),
    message1: 'Web Have Modern Events Calendar Feature',
    message2:
      'Easily manage your schedule with our modern event calendar. Never miss an important event again!',
  },
  {
    image: require('@src/assets/images/onboarding_3.png'),
    message1: 'Explore Upcoming and Nearby Events',
    message2:
      'Use our map feature to find exciting events near you and navigate seamlessly.',
  },
];

const OnboardingScreen = () => {
  const [boardingIndex, setBoardingIndex] = useState<number>(0);

  useEffect(() => {
    log('[Onboaring Screen]', 'running!!!');
  });

  return (
    <ScreenComponent
      contentStyle={{
        display: 'flex',
        alignItems: 'center',
      }}
      displayBackgroundImage={false}>
      {/* <Onboarding1 /> */}

      <Animated.Image
        style={{
          display: 'flex',
          //   borderWidth: 3,
          //   position: 'absolute',
          //   bottom: 0,
          //   bottom: 170,
          transform: [
            {
              scale: 1,
            },
          ],
        }}
        source={boardings[boardingIndex].image}
      />

      {/* <Text style={{position: 'absolute', top: 350}}>Hello</Text> */}

      {/* <OnboardingSkip
        boardingIndex={boardingIndex}
        setBoardingIndex={setBoardingIndex}
        message1={boardings[boardingIndex].message1}
        message2={boardings[boardingIndex].message2}
      /> */}
    </ScreenComponent>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});

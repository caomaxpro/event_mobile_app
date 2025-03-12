import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomContainerComponent from '../native_components/ContainerComponent';
import CustomIcon from './CustomIcon';
import CustomText from '../native_components/CustomText';
import {useSettingContext} from '@src/context/SettingContext';
import CustomButton from '../native_components/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
// import {Icon} from 'react-native-vector-icons/';

{
  /* <Icon name="" />; */
}
// import {StackNavigationProp} from '@react-navigation/stack';
import {SCREEN_WIDTH} from '@src/utils/appInfo';

// type NavigationType = StackNavigationProp<AuthStackParamList>;

type OnboardingSkipProps = {
  boardingIndex: number;
  setBoardingIndex: React.Dispatch<React.SetStateAction<number>>;
  message1: string;
  message2: string;
};

const OnboardingSkip: React.FC<OnboardingSkipProps> = ({
  boardingIndex,
  setBoardingIndex,
  message1,
  message2,
}) => {
  const {state} = useSettingContext();
  const theme = state.theme;

  // const navigation = useNavigation();

  const dots = [0, 1, 2];

  return (
    <CustomContainerComponent
      contentStyle={{
        display: 'flex',
        flexDirection: 'column',
      }}
      customStyle={{
        position: 'absolute',
        bottom: 10,
        // borderWidth: 2,
      }}>
      <CustomContainerComponent
        contentStyle={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          alignContent: 'center',
          //   borderWidth: 3,
          //   borderColor: 'transparent',
          height: '100%',
        }}
        customStyle={{
          //   position: 'absolute',
          //   bottom: 90,
          //   zIndex: 2,
          height: 180,
          //   borderTopRightRadius: 48,
          //   borderTopLeftRadius: 48,
        }}>
        <CustomText
          customStyle={{
            fontSize: 22,
            width: 295,
            height: 68,
            lineHeight: 34,
            textAlign: 'center',
            color: theme.textOnContainer,
          }}>
          {message1}
        </CustomText>

        <CustomText
          textWeight="light"
          customStyle={{
            fontSize: 15,
            width: SCREEN_WIDTH - 20,
            height: 60,
            lineHeight: 25,
            textAlign: 'center',
            color: theme.textOnContainer,
            opacity: 0.5,
          }}>
          {message2}
        </CustomText>
      </CustomContainerComponent>

      <CustomContainerComponent
        contentStyle={{
          justifyContent: 'space-between',
        }}>
        <CustomButton
          labelStyle={{
            color: theme.textOnContainer,
          }}
          onPress={() => {
            // navigation.navigate('LoginScreen');
            setBoardingIndex(0);
          }}>
          <CustomText customStyle={{color: theme.textOnContainer}}>
            Skip
          </CustomText>
        </CustomButton>

        <CustomContainerComponent
          customStyle={{
            width: 80,
            // borderWidth: 2,
          }}>
          {dots.map((_, index) => {
            return (
              <CustomIcon
                key={index.toString()}
                type="Octicons"
                name="dot-fill"
                size={19}
                color={
                  boardingIndex === index
                    ? 'rgba(255, 255, 255, 1)'
                    : 'rgba(255, 255, 255, 0.2)'
                }
                style={{
                  padding: 5,
                }}
              />
            );
          })}
        </CustomContainerComponent>

        <CustomButton
          onPress={() => {
            if (boardingIndex === dots.length - 1) {
              setBoardingIndex(0);
              return;
              //   navigation.navigate('LoginScreen');
            }

            setBoardingIndex(boardingIndex + 1);
          }}>
          <CustomText customStyle={{color: theme.textOnContainer}}>
            Next
          </CustomText>
        </CustomButton>
      </CustomContainerComponent>
    </CustomContainerComponent>
  );
};

export default OnboardingSkip;

const styles = StyleSheet.create({});

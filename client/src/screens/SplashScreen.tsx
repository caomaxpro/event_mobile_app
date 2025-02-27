import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomContainerComponent from '@src/components/ContainerComponent';
import {SplashLogo} from '@src/assets/svg/SplashLogo';
import ScreenComponent from '@src/components/ScreenComponent';
import {defaultStyle} from '@src/styles/defaultStyles';
import {useSettingContext} from '@src/context/SettingContext';

const SplashScreen = () => {
  const {state} = useSettingContext();
  const theme = state.theme;

  return (
    <ScreenComponent
      customStyle={{
        backgroundColor: theme.background,
      }}
      contentStyle={[
        defaultStyle.container,
        {
          alignContent: 'center',
          alignItems: 'center',
        },
      ]}
      displayBackgroundImage={true}>
      <SplashLogo />
    </ScreenComponent>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});

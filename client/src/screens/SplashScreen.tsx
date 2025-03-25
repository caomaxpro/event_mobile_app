import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomContainerComponent from '@src/components/native_components/ContainerComponent';
import {SplashLogo} from '@src/assets/svg/SplashLogo';
import {ScreenComponent} from '@src/components/native_components/ScreenComponent';
import {defaultStyle} from '@src/styles/defaultStyles';
import {useReduxSelector} from '@src/hooks/useReduxSelector';

const SplashScreen = () => {
  const {theme} = useReduxSelector();

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

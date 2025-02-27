import {
  ImageBackground,
  StyleSheet,
  ViewProps,
  StyleProp,
  ViewStyle,
  View,
  ImageSourcePropType,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSettingContext} from '@src/context/SettingContext';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@src/utils/appInfo';

import Animated, {useAnimatedStyle} from 'react-native-reanimated';
// import {createAnimatedComponent} from 'react-native-reanimated/lib/typescript/createAnimatedComponent';

type ScreenComponentProps = ViewProps & {
  children?: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  bgImage?: number | null;
  displayBackgroundImage?: boolean;
  animatedStyle?: any;
};

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

export default function CustomContainerComponent({
  children,
  customStyle,
  contentStyle,
  bgImage = null,
  displayBackgroundImage = false,
  animatedStyle,
  ...props
}: ScreenComponentProps) {
  const {state} = useSettingContext();
  const theme = state.theme;
  const backgroundImage = bgImage ?? theme.bgImage;

  const animatedContainerStyle = animatedStyle ?? {};

  return (
    <AnimatedSafeAreaView
      style={[
        styles.default_container,
        {borderColor: theme.textOnBG},
        customStyle,
        animatedContainerStyle,
      ]}
      {...props}>
      {displayBackgroundImage ? (
        <ImageBackground
          source={backgroundImage}
          style={styles.background}
          resizeMode="cover">
          <View style={[styles.content, contentStyle]}>{children}</View>
        </ImageBackground>
      ) : (
        <View style={[styles.content, contentStyle]}>{children}</View>
      )}
    </AnimatedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  default_container: {
    width: '100%',
    padding: 0,
    overflow: 'scroll',
    // borderWidth: 3,
    // borderRadius: 5,
    backgroundColor: 'transparent',
  },

  background: {
    width: '100%',
    margin: 0,
  },

  content: {
    // paddingHorizontal: 5,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

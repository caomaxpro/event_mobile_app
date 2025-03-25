import {useReduxSelector} from '@src/hooks/useReduxSelector';
import React, {forwardRef} from 'react';
import {
  ImageBackground,
  StyleSheet,
  ViewProps,
  StyleProp,
  ViewStyle,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Animated from 'react-native-reanimated';
// import {AnimatedView} from 'react-native-reanimated/lib/typescript/component/View';

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

type ScreenComponentProps = ViewProps & {
  children?: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  bgImage?: number | null;
  displayBackgroundImage?: boolean;
  animatedStyle?: any;
  isStatusBar?: boolean;
};

const CustomContainerComponent = forwardRef<SafeAreaView, ScreenComponentProps>(
  (
    {
      children,
      customStyle,
      contentStyle,
      bgImage = null,
      displayBackgroundImage = false,
      animatedStyle,
      isStatusBar = false,
      ...props
    },
    ref,
  ) => {
    const {theme} = useReduxSelector();
    const backgroundImage = bgImage ?? theme.bgImage;

    return (
      <AnimatedSafeAreaView
        ref={ref}
        style={[
          styles.default_container,
          {
            borderColor: theme.textOnBG,
            marginTop: isStatusBar ? StatusBar.currentHeight || 0 : 0,
          },
          customStyle,
          animatedStyle ?? {},
        ]}
        {...props}>
        {displayBackgroundImage ? (
          <ImageBackground
            source={backgroundImage}
            style={styles.background}
            resizeMode="cover">
            <Animated.View style={[styles.content, contentStyle]}>
              {children}
            </Animated.View>
          </ImageBackground>
        ) : (
          <Animated.View style={[styles.content, contentStyle]}>
            {children}
          </Animated.View>
        )}
      </AnimatedSafeAreaView>
    );
  },
);

export const AnimatedCustomContainerComponent =
  Animated.createAnimatedComponent(CustomContainerComponent);

export default CustomContainerComponent;

const styles = StyleSheet.create({
  default_container: {
    flex: 1,
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

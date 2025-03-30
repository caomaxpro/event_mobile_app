import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  ImageBackground,
  ScrollView,
  ScrollViewProps,
  StatusBar,
} from 'react-native';
import React, {forwardRef} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@src/utils/appInfo';
import {useReduxSelector} from '@src/hooks/useReduxSelector';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  withTiming,
} from 'react-native-reanimated';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

type ScreenComponentProps = ScrollViewProps & {
  children?: React.ReactNode;
  headerComponent?: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  displayBackgroundImage?: boolean;
  scrollEnabled?: boolean;
};

export const ScreenComponent = forwardRef<
  Animated.ScrollView,
  ScreenComponentProps
>(
  (
    {
      children,
      headerComponent,
      customStyle,
      contentStyle,
      displayBackgroundImage = true,
      scrollEnabled = true,
      ...props
    },
    ref,
  ) => {
    const {theme} = useReduxSelector();
    const backgroundImage = theme.bgImage;
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler(event => {
      'worklet';
      if (event?.contentOffset?.y !== undefined) {
        scrollY.value = event.contentOffset.y;
      }
    });

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          {...props}
          ref={ref}
          keyboardShouldPersistTaps="always"
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          style={[
            styles.default_container,
            {
              backgroundColor: theme.background,
            },
            customStyle,
          ]}
          contentContainerStyle={[
            styles.contentContainer,
            // {
            //   paddingTop: headerComponent
            //     ? 70 + (StatusBar.currentHeight || 0)
            //     : 0,
            // },
          ]}>
          {displayBackgroundImage ? (
            <ImageBackground
              source={backgroundImage}
              resizeMode="stretch"
              style={styles.backgroundImage}>
              <View
                style={[
                  styles.content,
                  {paddingTop: StatusBar.currentHeight ?? 0},
                  contentStyle,
                ]}>
                {/* {headerComponent &&
                  React.cloneElement(headerComponent as React.ReactElement, {
                    scrollY,
                  })} */}
                {children}
              </View>
            </ImageBackground>
          ) : (
            <View
              style={[
                styles.content,
                {paddingTop: StatusBar.currentHeight ?? 0},
                contentStyle,
              ]}>
              {children}
            </View>
          )}
        </Animated.ScrollView>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 2,
    width: '100%',
  },
  default_container: {
    width: SCREEN_WIDTH,
    flex: 1,
    // backgroundColor: 'red',
  },
  contentContainer: {
    flexGrow: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    borderWidth: 2,
    // height: '100%',
    // alignSelf: 'center',
  },
  content: {
    width: SCREEN_WIDTH,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

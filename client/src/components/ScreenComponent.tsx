import {
  Image,
  StyleSheet,
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
  ImageBackground,
  ScrollView,
  ScrollViewProps,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@src/utils/appInfo';
import {useSettingContext} from '@src/context/SettingContext';

type ScreenComponentProps = ViewProps & {
  children?: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  displayBackgroundImage?: boolean;
  scrollEnabled?: boolean; // Thêm prop để kiểm soát việc cuộn
};

export default function ScreenComponent({
  children,
  customStyle,
  contentStyle,
  displayBackgroundImage = true,
  scrollEnabled = true, // Mặc định là cuộn được
  ...props
}: ScreenComponentProps) {
  const {state} = useSettingContext();
  const theme = state.theme;

  const backgroundImage = theme.bgImage;

  return (
    <View
      {...props}
      style={[
        styles.default_container,
        {
          backgroundColor: theme.background,
          height: SCREEN_HEIGHT + (StatusBar?.currentHeight || 0),
        },
        customStyle,
      ]}>
      {displayBackgroundImage ? (
        <ImageBackground
          source={backgroundImage}
          resizeMode="contain"
          style={styles.backgroundImage}>
          <View style={[styles.content, contentStyle]}>{children}</View>
        </ImageBackground>
      ) : (
        <View style={[styles.content, contentStyle]}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  default_container: {
    // flex: 1,
    width: SCREEN_WIDTH,
    alignContent: 'center',
    justifyContent: 'center',
    // alignItems: 'center',
  },

  backgroundImage: {
    // flex: 1,
    width: SCREEN_WIDTH,
    height: '100%',
    alignSelf: 'center',
  },

  content: {
    // flex: 1,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'flex-start',
  },
});

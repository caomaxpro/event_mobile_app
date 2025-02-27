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
} from 'react-native';
import React, {useEffect} from 'react';
import {SCREEN_WIDTH} from '@src/utils/appInfo';
import {useSettingContext} from '@src/context/SettingContext';

type ScreenComponentProps = ViewProps & {
  children?: React.ReactNode;
  customStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  bgImage?: number;
  displayBackgroundImage?: boolean;
  scrollEnabled?: boolean; // Thêm prop để kiểm soát việc cuộn
};

export default function ScreenComponent({
  children,
  customStyle,
  contentStyle,
  bgImage,
  displayBackgroundImage = true,
  scrollEnabled = true, // Mặc định là cuộn được
  ...props
}: ScreenComponentProps) {
  const {state} = useSettingContext();
  const theme = state.theme;

  const backgroundImage = bgImage ?? theme.bgImage;

  return (
    <SafeAreaView
      {...props}
      style={[
        styles.default_container,
        {backgroundColor: theme.background},
        customStyle,
      ]}>
      {displayBackgroundImage ? (
        <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <View style={[styles.content, contentStyle]}>{children}</View>
        </ImageBackground>
      ) : (
        <View style={[styles.content, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  default_container: {
    // flex: 1,
    height: '100%',
    width: '100%',
    // alignContent: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
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

import React, {forwardRef, useContext} from 'react';
import {
  Text,
  StyleSheet,
  TextProps,
  TextStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {fontFamilies} from '@src/constants/fontSetting';
import {useSettingContext} from '@src/context/SettingContext';

type CustomTextProps = TextProps & {
  children: React.ReactNode;
  customStyle?: StyleProp<TextStyle>;
  textWeight?: 'light' | 'bold' | 'medium' | 'italic' | 'thin';
};

const CustomText = forwardRef<Text, CustomTextProps>(
  ({children, customStyle, textWeight = 'medium', ...props}, ref) => {
    const textWeights: Record<string, string> = {
      light: fontFamilies.light,
      bold: fontFamilies.bold,
      medium: fontFamilies.medium,
      italic: fontFamilies.italic,
      thin: fontFamilies.thin,
    };

    const fontFamily = textWeights[textWeight];

    const {state} = useSettingContext();
    const theme = state.theme;

    return (
      <Text
        {...props}
        ref={ref}
        style={[
          styles.defaultStyle,
          {fontFamily, color: theme.textInput},
          customStyle,
        ]}>
        {children}
      </Text>
    );
  },
);

const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 16, // Default font size
    color: 'black', // Default text color
    width: 'auto',
    // alignSelf: 'center',
    // minWidth: 100,
    // borderWidth: 2,
    height: 'auto',
    padding: 0,
  },
});

export default CustomText;

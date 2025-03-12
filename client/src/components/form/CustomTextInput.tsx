// components/CustomTextInput.tsx
import React, {forwardRef} from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  TextStyle,
  StyleProp,
} from 'react-native';
import {useSettingContext} from '@src/context/SettingContext';

interface CustomTextInputProps extends TextInputProps {
  customStyle?: StyleProp<TextStyle>; // Allow additional styles
}

export const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  ({customStyle, ...props}, ref) => {
    const {state} = useSettingContext();
    const theme = state.theme;
    const text = state.text;

    return (
      <TextInput
        {...props}
        ref={ref} // Pass the ref to the native TextInput
        style={[
          styles.defaultStyle,
          {
            fontFamily: text.fontFamily,
            color: theme.textInput, // Set text color dynamically
            backgroundColor: theme.textInputBG,
          },
          customStyle,
        ]}
        placeholderTextColor={theme.placeHolder}
      />
    );
  },
);

const styles = StyleSheet.create({
  defaultStyle: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 0,
    marginVertical: 5,
    fontSize: 16,
  },
});

// CustomTextInputComponent.tsx
import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import CustomText from '../native_components/CustomText';
import {CustomTextInput} from './CustomTextInput';
import CustomContainerComponent from '../native_components/ContainerComponent';
import CustomIcon from '../native_components/CustomIcon';
import CustomButton from '../native_components/ButtonComponent';
import {error, log} from '@src/utils/logUtils';
import {useReduxSelector} from '@src/hooks/useReduxSelector';
import {ValidationResult} from '@src/utils/validatorUtils';
import {InputField} from '@src/types/types';

export interface InputComponentProps extends TextInputProps {
  inputField: InputField;
  containerStyle?: StyleProp<TextStyle>;
  textInputStyle?: StyleProp<TextStyle>;
}

// Add forwardRef to CustomTextInputComponent
export const CustomTextInputComponent = forwardRef<
  TextInput,
  InputComponentProps
>(({inputField, containerStyle, textInputStyle, ...inputProps}, ref) => {
  const {theme} = useReduxSelector();

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (inputField.value.length === 0 && inputRef.current) {
      inputRef.current.clear();
      inputRef.current.focus();
    }
  }, [inputField?.value]);

  //   useEffect(() => {
  //     log('Error Value', inputField.error);
  //   }, [inputField?.error]);

  return (
    <View style={{width: 317, marginBottom: 19}}>
      <CustomContainerComponent
        customStyle={[
          styles.container,
          {borderColor: theme.inputBorder},
          containerStyle,
        ]}
        contentStyle={{display: 'flex', flexDirection: 'row'}}>
        <TextInput
          ref={inputRef} // Pass the ref to the native TextInput
          style={[
            styles.default_input_style,
            {
              fontFamily: theme.fontFamily,
              color: theme.textInput, // Set text color dynamically
            },
            textInputStyle,
          ]}
          placeholderTextColor={theme.placeHolder}
          multiline={false}
          numberOfLines={1}
          onChangeText={inputField.onChange}
          {...inputProps}
        />
      </CustomContainerComponent>
      {/* {console.log(inputField.error)} */}
    </View>
  );
});

// Add forwardRef to EmailInputComponent
export const EmailInputComponent = forwardRef<TextInput, InputComponentProps>(
  (props, ref) => (
    <CustomTextInputComponent
      ref={ref} // Pass ref to CustomTextInputComponent
      {...props}
      keyboardType="email-address"
      autoCapitalize="none"
    />
  ),
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 2,
    borderRadius: 12,
    width: 317,
    height: 56,
    alignItems: 'center',
    alignContent: 'flex-start',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  label: {
    fontSize: 19,
    alignSelf: 'flex-start',
    // marginLeft: 5,
  },
  input: {
    // borderWidth: 1,
    borderColor: '#ccc',
    padding: 0,
    borderRadius: 4,
    textAlign: 'left',
    minWidth: 60,
    height: 50,
    width: '98%',
    alignSelf: 'center',
    textAlignVertical: 'top',
    fontSize: 20,
    borderWidth: 0,
    paddingHorizontal: 0,
    borderBottomWidth: 2,
    backgroundColor: 'transparent',
  },

  error: {
    // color: 'red',
    marginTop: 4,
    fontSize: 14,
    marginHorizontal: 10,
    // borderWidth: 1,
  },

  default_input_style: {
    paddingLeft: 0,
    width: '70%',
    paddingHorizontal: 0,
    fontSize: 14,
    height: '100%',
    backgroundColor: 'transparent',
  },

  icon_container: {
    width: '15%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    backgroundColor: 'transparent',
  },
});

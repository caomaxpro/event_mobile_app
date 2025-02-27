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
import CustomText from './CustomText';
import {CustomTextInput} from './CustomTextInput';
import {useSettingContext} from '@src/context/SettingContext';
import CustomContainerComponent from './ContainerComponent';
import CustomIcon, {CustomIconProps} from './CustomIcon';
import CustomButton from './ButtonComponent';
import {error, log} from '@src/utils/logUtils';

export type InputField = {
  value: string;
  onTextChange: (value: string) => void;
  error: string;
};

export interface InputComponentProps extends TextInputProps {
  label?: string;
  inputField: InputField;
  containerStyle?: StyleProp<TextStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  preIcon?: React.JSX.Element;
  password?: boolean;
}

// Add forwardRef to CustomTextInputComponent
export const CustomTextInputComponent = forwardRef<
  TextInput,
  InputComponentProps
>(
  (
    {
      label,
      inputField,
      containerStyle,
      textInputStyle,
      preIcon,
      password,
      ...inputProps
    },
    ref,
  ) => {
    const {state} = useSettingContext();

    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

    const theme = state.theme;
    const text = state.text;

    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
      if (inputField.value.length === 0 && inputRef.current) {
        inputRef.current.clear();
        inputRef.current.focus();
      }
    }, [inputField?.value]);

    useEffect(() => {
      log('Error Value', inputField.error);
    }, [inputField?.error]);

    return (
      <View style={{width: 317, marginBottom: 19}}>
        {label && <CustomText customStyle={styles.label}>{label}</CustomText>}

        <CustomContainerComponent
          customStyle={[
            styles.container,
            {borderColor: theme.inputBorder},
            containerStyle,
          ]}
          contentStyle={{display: 'flex', flexDirection: 'row'}}>
          <CustomContainerComponent customStyle={styles.icon_container}>
            {preIcon}
          </CustomContainerComponent>

          <TextInput
            ref={inputRef} // Pass the ref to the native TextInput
            style={[
              styles.default_input_style,
              {
                fontFamily: text.fontFamily,
                color: theme.textInput, // Set text color dynamically
                // backgroundColor: theme.textInputBG,
              },
              textInputStyle,
            ]}
            placeholderTextColor={theme.placeHolder}
            secureTextEntry={password && !isPasswordVisible}
            multiline={false}
            numberOfLines={1}
            onChangeText={inputField.onTextChange}
            {...inputProps}
          />

          <CustomContainerComponent customStyle={styles.icon_container}>
            {password && (
              <CustomButton
                customStyle={{
                  backgroundColor: 'transparent',
                }}
                activeOpacity={1}
                onPress={() => {
                  setPasswordVisible(!isPasswordVisible);
                }}>
                {isPasswordVisible ? (
                  <CustomIcon
                    type="Octicons"
                    name="eye-closed"
                    size={22}
                    color={state.theme.inputBorder}
                  />
                ) : (
                  <CustomIcon
                    type="Octicons"
                    name="eye"
                    size={22}
                    color={state.theme.inputBorder}
                  />
                )}
              </CustomButton>
            )}
          </CustomContainerComponent>
        </CustomContainerComponent>
        {/* {console.log(inputField.error)} */}

        {inputField?.error && inputField?.value && (
          <CustomText customStyle={styles.error}>{inputField.error}</CustomText>
        )}
      </View>
    );
  },
);

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

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSettingContext} from '@src/context/SettingContext';
import CustomIcon from '../native_components/CustomIcon';
import {CustomTextInputComponent} from './CustomInputField';

type PasswordInputComponentProps = {
  passwordField: any;
  confirmPassword?: boolean;
};

export const CustomPasswordInputComponent: React.FC<
  PasswordInputComponentProps
> = ({passwordField, confirmPassword = false}) => {
  const {state} = useSettingContext();

  return (
    <CustomTextInputComponent
      // containerStyle={}
      preIcon={
        <CustomIcon
          type="Feather"
          name="lock"
          size={22}
          color={state.theme.inputBorder}
        />
      }
      textContentType="password"
      inputField={passwordField}
      password={true}
      placeholder={!confirmPassword ? 'Your password' : 'Confirm your password'}
    />
  );
};

const styles = StyleSheet.create({});

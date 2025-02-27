import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSettingContext} from '@src/context/SettingContext';
import CustomIcon from './CustomIcon';
import {CustomTextInputComponent} from './CustomInputField';

type PasswordInputComponentProps = {
  passwordField: any;
};

const PasswordInputComponent: React.FC<PasswordInputComponentProps> = ({
  passwordField,
}) => {
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
      placeholder="Your password"
    />
  );
};

export default PasswordInputComponent;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomTextInputComponent} from './CustomInputField';
import CustomIcon from '../native_components/CustomIcon';
import {useSettingContext} from '@src/context/SettingContext';

type EmailInputComponentProps = {
  inputField: any;
};

export const CustomEmailInputComponent: React.FC<EmailInputComponentProps> = ({
  inputField,
}) => {
  const {state} = useSettingContext();

  return (
    <CustomTextInputComponent
      preIcon={
        <CustomIcon
          type="AntDesign"
          name="mail"
          size={22}
          color={state.theme.inputBorder}
        />
      }
      textContentType="emailAddress"
      inputField={inputField}
      placeholder="abc@email.com"
      autoCapitalize="none"
    />
  );
};

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomTextInputComponent} from './CustomInputField';
import CustomIcon from './CustomIcon';
import {useSettingContext} from '@src/context/SettingContext';

type EmailInputComponentProps = {
  inputField: any;
};

const EmailInputComponent: React.FC<EmailInputComponentProps> = ({
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
    />
  );
};

export default EmailInputComponent;

const styles = StyleSheet.create({});

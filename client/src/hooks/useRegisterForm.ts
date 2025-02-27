import {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
import * as validator from '@src/utils/validatorUtils';
import {log} from '@src/utils/logUtils';
import { useEmailInput, useInput, usePasswordInput, useRepasswordInput } from './useInputField';

interface UseInputFieldProps {
  initialValue?: string | number;
  validate?: (value: string) => string;
}

export function useRegisterForm() {
  const fullNameField = useInput('')
  const emailField = useEmailInput('')
  const passwordField = usePasswordInput('')
  const repasswordField = useRepasswordInput('', passwordField.value)

  const handleSubmit = () => {
      const data = {
          fullname: fullNameField.value,
          email: emailField.value,
          password: passwordField.value,
          repassword: repasswordField.value,
      }
  };
    
  return {fullNameField, emailField, passwordField, repasswordField, handleSubmit};
}


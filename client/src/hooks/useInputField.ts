import {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
import * as validator from '@src/utils/validatorUtils';
import {log} from '@src/utils/logUtils';

interface UseInputFieldProps {
  initialValue?: string | number;
  validate?: (value: string) => string;
}

export function useInput(
  initialValue = '',
  validate?: (value: string) => string,
) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  const onTextChange = (text: string) => {
    log('Input Value', text);

    setValue(text);
    if (validate) setError(validate(text));
  };

  log('Error', error);

  return {value, onTextChange, error};
}

export const useTextInput = (
  initialValue = '',
  min = -Infinity,
  max = Infinity,
) => {
  const validate = (val: string) => {
    return validator.validateTextLength(val, min, max);
  };

  return useInput(initialValue, validate);
};

export function useNumberInput(
  initialValue = '0',
  min = -Infinity,
  max = Infinity,
  clamp = false,
) {
  const validate = (val: string) => {
    return validator.validateNumber(val, min, max);
  };

  const {value, onTextChange, error} = useInput(initialValue, validate);

  // Function to clamp values within range
  const clampValue = (num: number) => Math.max(min, Math.min(num, max));

  const handleChangeText = (text: string) => {
    let numValue = parseFloat(text);

    if (!isNaN(numValue) && clamp) {
      numValue = clampValue(numValue);
      onTextChange(numValue.toString());
    } else {
      onTextChange(text);
    }
  };

  return {
    value,
    onTextChange: handleChangeText,
    error,
  };
}

export function useEmailInput(initialValue = '') {
  return useInput(initialValue, validator.validateEmail);
}

export function usePasswordInput(initialValue = '', minLength = 8) {
  const validate = (val: string) => {
    return validator.validatePassword(val, minLength);
  };

  return useInput(initialValue, validate);
}

export function useRepasswordInput(initialValue: string = '', password: string) {
    const validate = (val: string) => {
        return validator.validateRepassword(val, password)
    }

    return useInput(initialValue, validate)
}
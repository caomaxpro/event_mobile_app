import {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
import * as validator from '@src/utils/validatorUtils';
import {log} from '@src/utils/logUtils';
import { useEmailInput, useInput, usePasswordInput, useRepasswordInput } from './useInputField';
import { loginUser } from '@src/services/authService';

interface UseInputFieldProps {
  initialValue?: string | number;
  validate?: (value: string) => string;
}

export function useLoginForm() {
    const emailField = useEmailInput('')
    const passwordField = usePasswordInput('')
   
    const handleSubmit = async () => {
        const data = {
            email: emailField.value,
            password: passwordField.value,
        }

        // send data to server side
        await loginUser(data)
    };
    
    return {emailField, passwordField, handleSubmit};
}


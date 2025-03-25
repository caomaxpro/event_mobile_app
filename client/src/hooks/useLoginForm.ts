// import {useState} from 'react';
// import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
// import * as validator from '@src/utils/validatorUtils';
// import {log} from '@src/utils/logUtils';
// import {
//   useEmailInput,
//   useInput,
//   usePasswordInput,
//   useRepasswordInput,
// } from './useInputField';
// import {loginUser} from '@src/services/authService';
// import {useNavigation} from '@react-navigation/native';
// import {AxiosResponse} from 'axios';
// // import { useAuthContext } from '@src/context/AuthContext';

// import {useAppNavigation} from './userAppNavigation';
// import {useReduxSelector} from './useReduxSelector';

// interface UseInputFieldProps {
//   initialValue?: string | number;
//   validate?: (value: string) => string;
// }

// export function useLoginForm() {
//   const emailField = useEmailInput('');
//   const passwordField = usePasswordInput('');

//   const {theme} = useReduxSelector();

//   const navigation = useAppNavigation();

//   const handleSubmit = async (): Promise<void> => {
//     const data = {
//       email: emailField.value,
//       password: passwordField.value,
//     };

//     log('[Login Form]', data);

//     // send data to server side
//     const res = await loginUser(data);

//     // receive respone => if ok => save to state
//     if (res.status === 200) {
//       console.log(res.data.token);
//       // await login(res.data.token)

//       navigation.authNavigation.navigate('DrawerNavigator');
//     }
//   };

//   return {emailField, passwordField, handleSubmit};
// }

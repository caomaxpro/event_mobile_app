import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import {FormState} from '@src/redux/formSlice';

export const useReduxSelector = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const auth = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);
  const app = useSelector((state: RootState) => state.app);
  const form = useSelector((state: RootState) => state.form);

  return {theme, auth, user, app, form};
};

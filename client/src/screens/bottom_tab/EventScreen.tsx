import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '@src/components/native_components/CustomText';
import {ScreenComponent} from '@src/components/native_components/ScreenComponent';

const EventScreen = () => {
  return (
    <ScreenComponent>
      <CustomText>Profile Screen</CustomText>
    </ScreenComponent>
  );
};

export default EventScreen;

const styles = StyleSheet.create({});

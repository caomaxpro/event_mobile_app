import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenComponent from '@src/components/ScreenComponent';
import HeaderComponent from '@src/components/HeaderComponent';
import {useAppNavigation} from '@src/hooks/userAppNavigation';

const CalenderScreen = () => {
  const {drawerNavigation} = useAppNavigation();

  return (
    <ScreenComponent>
      <HeaderComponent
        title="Calender"
        hideTitle={false}
        navigation={drawerNavigation}
      />
    </ScreenComponent>
  );
};

export default CalenderScreen;

const styles = StyleSheet.create({});

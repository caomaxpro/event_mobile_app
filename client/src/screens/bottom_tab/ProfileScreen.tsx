import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenComponent from '@src/components/ScreenComponent';
import CustomText from '@src/components/CustomText';
import HeaderComponent from '@src/components/HeaderComponent';
import {useAppNavigation} from '@src/hooks/userAppNavigation';

const ProfileScreen = () => {
  const {drawerNavigation} = useAppNavigation();

  return (
    <ScreenComponent
      contentStyle={{
        alignContent: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      displayBackgroundImage={false}>
      <HeaderComponent
        title="Profile"
        hideTitle={false}
        navigation={drawerNavigation}
      />

      <CustomText>Profile Screen</CustomText>
    </ScreenComponent>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

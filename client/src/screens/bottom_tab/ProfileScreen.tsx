import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenComponent} from '@src/components/native_components/ScreenComponent';
import CustomText from '@src/components/native_components/CustomText';
import HeaderComponent from '@src/components/HeaderComponent';
import {useAppNavigation} from '@src/hooks/userAppNavigation';
import CustomVerticleScrollView from '@src/components/native_components/CustomVerticleScrollView';
import CustomContainerComponent from '@src/components/native_components/ContainerComponent';

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

      <CustomContainerComponent customStyle={{height: 500}}>
        <CustomVerticleScrollView
          style={{height: 300, borderWidth: 2}}
          contentContainerStyle={{height: 'auto'}}>
          <View
            style={{height: 500, width: 100, backgroundColor: 'red'}}></View>
          <View
            style={{height: 500, width: 100, backgroundColor: 'blue'}}></View>
          <View
            style={{height: 500, width: 100, backgroundColor: 'yellow'}}></View>
        </CustomVerticleScrollView>
      </CustomContainerComponent>
    </ScreenComponent>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

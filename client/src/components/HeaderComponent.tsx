import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from './ButtonComponent';
import CustomContainerComponent from './ContainerComponent';
import CustomIcon from './CustomIcon';

const HeaderComponent = () => {
  return (
    <CustomContainerComponent
      contentStyle={{justifyContent: 'flex-start'}}
      customStyle={{width: 317, marginBottom: 20}}>
      <CustomButton
        customStyle={{backgroundColor: 'transparent', alignSelf: 'flex-start'}}>
        <CustomIcon type="FontAwesome6" name="arrow-left" size={22} />
      </CustomButton>
    </CustomContainerComponent>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomContainerComponent from './ContainerComponent';
import CustomText from './CustomText';

type DrawerSectionProp = {
  icon: React.JSX.Element;
  title: string;
};

const DrawerSection: React.FC<DrawerSectionProp> = ({icon, title}) => {
  const Icon = icon;

  return (
    <CustomContainerComponent>
      {Icon}
      <CustomText>{title}</CustomText>
    </CustomContainerComponent>
  );
};

export default DrawerSection;

const styles = StyleSheet.create({});

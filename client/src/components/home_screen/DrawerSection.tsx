import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomContainerComponent from '../native_components/ContainerComponent';
import CustomText from '../native_components/CustomText';
import CustomButton from '../native_components/ButtonComponent';
import {SvgProps} from 'react-native-svg';
import {ProfileIcon} from '@src/assets/svg/ProfileIcon';

type DrawerSectionProp = {
  icon: React.FC<SvgProps>;
  title: string;
};

const DrawerSection: React.FC<DrawerSectionProp> = ({icon, title}) => {
  const Icon = icon;

  return (
    <CustomButton
      customStyle={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        height: 60,
        width: '100%',
        // borderWidth: 2,
        backgroundColor: 'transparent',
      }}>
      <CustomContainerComponent
        customStyle={{width: 'auto'}}
        contentStyle={{
          width: 40,
          height: 60,
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          //   borderWidth: 2,
        }}>
        <Icon />
      </CustomContainerComponent>

      {/* <ProfileIcon /> */}
      <CustomText customStyle={{marginLeft: 10}}>{title}</CustomText>
    </CustomButton>
  );
};

export default DrawerSection;

const styles = StyleSheet.create({});

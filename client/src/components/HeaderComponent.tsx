import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from './native_components/ButtonComponent';
import CustomContainerComponent from './native_components/ContainerComponent';
import CustomIcon from './native_components/CustomIcon';
import {useAppNavigation} from '@src/hooks/userAppNavigation';
import CustomText from './native_components/CustomText';

type HeaderComponentProp = {
  title?: string;
  hideTitle?: boolean;
  navigation?: any;
};

const HeaderComponent: React.FC<HeaderComponentProp> = ({
  title,
  hideTitle = false,
  navigation,
}): React.JSX.Element => {
  //   const navigation = useAppNavigation();

  return (
    <CustomContainerComponent
      contentStyle={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'red',
      }}
      customStyle={{
        width: '100%',
        height: 60,
        position: 'absolute',
        backgroundColor: 'red',
        borderWidth: 2,
        top: StatusBar?.currentHeight || 0,
        right: 0,
        zIndex: 10,
      }}>
      <CustomButton
        customStyle={{
          backgroundColor: 'transparent',
          alignSelf: 'flex-start',
          height: 60,
        }}
        onPress={() => {
          navigation?.goBack();
        }}>
        <CustomIcon type="FontAwesome6" name="arrow-left" size={22} />
      </CustomButton>

      {!hideTitle && (
        <CustomText
          textWeight="medium"
          customStyle={{marginLeft: 10, fontSize: 24, borderWidth: 0}}>
          {title}
        </CustomText>
      )}
    </CustomContainerComponent>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({});

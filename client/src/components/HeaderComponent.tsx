import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from './ButtonComponent';
import CustomContainerComponent from './ContainerComponent';
import CustomIcon from './CustomIcon';
import {useAppNavigation} from '@src/hooks/userAppNavigation';
import CustomText from './CustomText';

type HeaderComponentProp = {
  title?: string;
  hideTitle?: boolean;
  navigation: any;
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
      }}
      customStyle={{
        width: '100%',
        height: 60,
        position: 'absolute',
        top: StatusBar?.currentHeight || 0,
      }}>
      <CustomButton
        customStyle={{
          backgroundColor: 'transparent',
          alignSelf: 'flex-start',
          height: 60,
        }}
        onPress={() => {
          navigation.goBack();
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

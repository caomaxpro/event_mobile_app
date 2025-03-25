import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomContainerComponent from '../native_components/ContainerComponent';
import CustomIcon from '../native_components/CustomIcon';
import {SearchIcon} from '@src/assets/svg/SearchIcon';
import {CustomTextInput} from './CustomTextInput';
import {FilterIcon} from '@src/assets/svg/FilterIcon';
import CustomText from '../native_components/CustomText';
import CustomButton from '../native_components/ButtonComponent';
import {fontFamilies} from '@src/constants/fontSetting';
import {useReduxSelector} from '@src/hooks/useReduxSelector';

const SearchBarComponent = (): React.JSX.Element => {
  const {theme} = useReduxSelector();

  return (
    <CustomContainerComponent
      contentStyle={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
      }}
      customStyle={{height: 60, width: '100%', borderWidth: 0}}>
      <CustomContainerComponent
        style={{
          width: 35,
          paddingRight: 10,
          borderWidth: 0,
          borderRightWidth: 2,
          borderRightColor: theme.placeHolder,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <SearchIcon style={{alignSelf: 'flex-start'}} />
      </CustomContainerComponent>

      <CustomTextInput
        customStyle={{
          width: '66%',
          backgroundColor: 'transparent',
          fontSize: 20.33,
          fontFamily: fontFamilies.light,
          letterSpacing: -1,
          padding: 0,
          paddingLeft: 5,
          borderWidth: 0,
          //   borderLeftWidth: 1,
          height: 45,
        }}
        placeholder="Search..."
      />
      <CustomButton
        customStyle={{
          width: 75,
          height: 33,
          borderRadius: 50,
          justifyContent: 'space-evenly',
        }}>
        <FilterIcon />
        <CustomText
          textWeight="light"
          customStyle={{
            fontSize: 12,
            color: theme.textOnContainer,
            // marginLeft: 2,
          }}>
          Filters
        </CustomText>
      </CustomButton>
    </CustomContainerComponent>
  );
};

export default SearchBarComponent;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from '../native_components/ButtonComponent';
import {CircularRightArrow} from '@src/assets/svg/CircularRightArrow';
import CustomText from '../native_components/CustomText';
import {useReduxSelector} from '@src/hooks/useReduxSelector';

type ArrowButtonProps = {
  label: string;
  onPress: () => void;
};

const ArrowButton: React.FC<ArrowButtonProps> = ({label, onPress}) => {
  const {theme} = useReduxSelector();

  return (
    <CustomButton
      onPress={onPress}
      customStyle={{
        borderRadius: 15,
        width: 271,
        height: 58,
        position: 'relative',
        marginTop: 35,
      }}>
      <CustomText customStyle={{color: theme.textOnContainer}}>
        {label}
      </CustomText>
      <CircularRightArrow
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: 14,
          right: 14,
        }}
      />
    </CustomButton>
  );
};

export default ArrowButton;

const styles = StyleSheet.create({});

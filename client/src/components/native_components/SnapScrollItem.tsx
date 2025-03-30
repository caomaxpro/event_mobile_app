import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {ms} from '@src/utils/rNResponsive';

interface SnapScrollItemProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const SnapScrollItem: React.FC<SnapScrollItemProps> = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: ms(350),
    height: ms(350),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SnapScrollItem;

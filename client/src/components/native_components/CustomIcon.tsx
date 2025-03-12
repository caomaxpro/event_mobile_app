import React from 'react';
import {View, ViewStyle, StyleSheet} from 'react-native';

import {Icon} from './Icon';
import {useSettingContext} from '@src/context/SettingContext';

export interface CustomIconProps {
  type:
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome5'
    | 'FontAwesome6'
    | 'Fontisto'
    | 'Foundation'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial'
    | 'Ionicons';
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const iconTypes = {
  AntDesign: Icon.AntDesign,
  Entypo: Icon.Entypo,
  EvilIcons: Icon.EvilIcons,
  Feather: Icon.Feather,
  FontAwesome5: Icon.FontAwesome5,
  FontAwesome6: Icon.FontAwesome6,
  Fontisto: Icon.Fontisto,
  Foundation: Icon.Foundation,
  MaterialCommunityIcons: Icon.MaterialCommunityIcons,
  MaterialIcons: Icon.MaterialIcons,
  Octicons: Icon.Octicons,
  SimpleLineIcons: Icon.SimpleLineIcons,
  Zocial: Icon.Zocial,
  Ionicons: Icon.Ionicons,
};

const CustomIcon: React.FC<CustomIconProps> = ({
  type,
  name,
  size = 30,
  color = 'black',
  style,
}) => {
  const {state} = useSettingContext();
  const theme = state.theme;

  const IconComponent = iconTypes[type] || Icon.FontAwesome5; // Mặc định là FontAwesome5 nếu type không hợp lệ

  return (
    <View style={[styles.iconContainer, style]}>
      <IconComponent
        name={name}
        size={size}
        color={color}
        style={{justifyContent: 'center'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default CustomIcon;

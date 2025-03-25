import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import CustomText from './CustomText';
import {useReduxSelector} from '@src/hooks/useReduxSelector';
// import {Canvas, Path} from '@shopify/react-native-skia';
// import {CustomButtons} from './SVGPaths';

interface CustomButtonProps {
  activeOpacity?: number;
  title?: string;
  customStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
  onPress?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  activeOpacity = 0.1,
  title,
  customStyle,
  labelStyle,
  children,
  ...props
}) => {
  // Context

  const {theme} = useReduxSelector();

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={activeOpacity}
      style={[styles.default, {backgroundColor: theme.button}, customStyle]}>
      {/* Uncomment if needed */}
      {/* <Canvas style={{ width: 100, height: 50 }}>
        <Path path={path} style="fill" color={theme.button} />
      </Canvas> */}

      {title && (
        <CustomText customStyle={[styles.buttonTitle, labelStyle]}>
          {title}
        </CustomText>
      )}
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  default: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    // borderRadius: 10,
  } as ViewStyle,

  buttonTitle: {
    textAlign: 'center',
  } as TextStyle,
});

export default CustomButton;

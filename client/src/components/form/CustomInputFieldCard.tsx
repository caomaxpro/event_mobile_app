import React from 'react';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import CustomText from '../native_components/CustomText';
import {useReduxSelector} from '@src/hooks/useReduxSelector';
import {ValidationResult} from '@src/utils/validatorUtils';
import CustomContainerComponent from '../native_components/ContainerComponent';
import InstructionComponent from './InstructionComponent';

interface CustomInputFieldCardProps {
  title?: string;
  showTitle?: boolean;
  showError?: boolean;
  error?: ValidationResult[];
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
}

export const CustomInputFieldCard: React.FC<CustomInputFieldCardProps> = ({
  title,
  showTitle = true,
  showError = false,
  error,
  children,
  containerStyle,
  titleStyle,
  errorStyle,
}) => {
  const {theme} = useReduxSelector();

  return (
    <View style={[styles.container, containerStyle]}>
      {showTitle && title && (
        <CustomText
          customStyle={[styles.title, {color: theme.textInput}, titleStyle]}>
          {title}
        </CustomText>
      )}

      {children}

      {showError && <InstructionComponent instructions={error} />}

      {/* <CustomContainerComponent>
        {error?.map((err, index) => (
          <CustomText key={index} customStyle={[styles.error, errorStyle]}>
            {err.message}
          </CustomText>
        ))}
      </CustomContainerComponent> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 317,
    marginBottom: 19,
  },
  title: {
    fontSize: 19,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  error: {
    marginTop: 4,
    fontSize: 14,
    marginHorizontal: 10,
  },
});

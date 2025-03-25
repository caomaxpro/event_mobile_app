import React, {useRef, useEffect} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {CustomInputFieldCard} from './CustomInputFieldCard';
import CustomIcon from '../native_components/CustomIcon';
import CustomContainerComponent from '../native_components/ContainerComponent';
import {useReduxSelector} from '@src/hooks/useReduxSelector';
import {InputField} from '@src/types/types';

interface EmailInputComponentProps {
  inputField: InputField;
  title?: string;
  placeholder?: string;
  showTitle?: boolean;
}

export const CustomEmailInputComponent: React.FC<EmailInputComponentProps> = ({
  inputField,
  title = 'Email',
  placeholder = 'abc@email.com',
  showTitle = true,
}) => {
  const {theme} = useReduxSelector();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (inputField.value.length === 0 && inputRef.current) {
      inputRef.current.clear();
      inputRef.current.focus();
    }
  }, [inputField?.value]);

  return (
    <CustomInputFieldCard
      title={title}
      showTitle={showTitle}
      error={inputField.validate()}>
      <CustomContainerComponent
        customStyle={[styles.container, {borderColor: theme.inputBorder}]}
        contentStyle={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <CustomContainerComponent customStyle={styles.iconContainer}>
          <CustomIcon
            type="MaterialCommunityIcons"
            name="email-outline"
            size={22}
            color={theme.inputBorder}
          />
        </CustomContainerComponent>

        <TextInput
          ref={inputRef}
          style={[
            styles.inputStyle,
            {
              fontFamily: theme.fontFamily,
              color: theme.textInput,
            },
          ]}
          placeholderTextColor={theme.placeHolder}
          onChangeText={inputField.onChange}
          placeholder={placeholder}
          textContentType="emailAddress"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          autoCorrect={false}
          multiline={false}
          numberOfLines={1}
        />
      </CustomContainerComponent>
    </CustomInputFieldCard>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 12,
    height: 56,
    overflow: 'hidden',
    // backgroundColor: 'red',
  },
  iconContainer: {
    display: 'flex',
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  inputStyle: {
    // flex: 1,
    // borderWidth: 1,
    height: '100%',
    width: '100%',
    fontSize: 14,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
});

import ArrowButton from '@src/components/button/ArrowButton';
import CustomButton from '@src/components/native_components/ButtonComponent';
import CustomContainerComponent from '@src/components/native_components/ContainerComponent';
import {CustomTextInputComponent} from '@src/components/form/CustomInputField';
import {CustomEmailInputComponent} from '@src/components/form/EmailInputComponent';
import CustomText from '@src/components/native_components/CustomText';
import HeaderComponent from '@src/components/HeaderComponent';
import {useSettingContext} from '@src/context/SettingContext';
import {useEmailInput} from '@src/hooks/useInputField';
import {log} from '@src/utils/logUtils';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useLoginForm} from '@src/hooks/useLoginForm';
import {CustomPasswordInputComponent} from '@src/components/form/PasswordInputComponent';
import {useRegisterForm} from '@src/hooks/useRegisterForm';
import {sendEmail} from '@src/services/authService';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppNavigation} from '@src/hooks/userAppNavigation';

export const ResetPasswordScreen = (): React.JSX.Element => {
  const {emailField, passwordField, repasswordField} = useRegisterForm();
  const {authNavigation} = useAppNavigation();

  const [isEmailVerified, setEmailVerified] = useState<boolean>(false);

  const handleSendEmailRequest = async () => {
    const response = await sendEmail(emailField.value);

    if (response.status === 200) {
      setEmailVerified(true);
    }
  };

  return (
    <CustomContainerComponent
      contentStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        paddingTop: 65,
      }}>
      <HeaderComponent navigation={authNavigation} />
      <CustomContainerComponent
        customStyle={{
          display: 'flex',
          flexDirection: 'column',
          width: 317,
        }}
        contentStyle={styles.container}>
        <CustomText customStyle={styles.title}>Reset Password</CustomText>
        <CustomText customStyle={styles.subTitle}>
          Please enter your email address to request a password reset
        </CustomText>

        {!isEmailVerified ? (
          <CustomEmailInputComponent inputField={emailField} />
        ) : (
          <CustomContainerComponent contentStyle={{flexDirection: 'column'}}>
            <CustomPasswordInputComponent passwordField={passwordField} />
            <CustomPasswordInputComponent
              passwordField={repasswordField}
              confirmPassword={true}
            />
          </CustomContainerComponent>
        )}

        <ArrowButton label="SEND" onPress={async () => {}} />
      </CustomContainerComponent>
    </CustomContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // padding: 20,
    width: '100%',
    height: 'auto',
  },
  title: {
    width: 317,
    fontSize: 24,
    // fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subTitle: {
    width: 244,
    fontSize: 15,
    lineHeight: 25,
    color: '#707070',
    // textAlign: 'center',
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginBottom: 30,
  },
  codeInput: {
    width: 55,
    height: 55,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#B3B3B3',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#4c8bf5',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    // fontWeight: 'bold',
  },
  resendContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
  },
  timer: {
    fontSize: 14,
    color: '#4c8bf5',
    // fontWeight: 'bold',
    // marginHorizontal: 5,
  },
  resendLink: {
    fontSize: 14,
    color: '#4c8bf5',
    // fontWeight: 'bold',
  },
});

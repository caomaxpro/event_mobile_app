// LoginScreen.tsx
import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
// import {Header, StackScreenProps} from '@react-navigation/stack';
import {ScreenComponent} from '@src/components/native_components/ScreenComponent';
import {CustomTextInputComponent} from '@src/components/form/CustomInputField';
import {Icon} from '@src/components/Icon';
import CustomIcon from '@src/components/native_components/CustomIcon';
import CustomContainerComponent from '@src/components/native_components/ContainerComponent';
import CustomToggle from '@src/components/native_components/CustomToggle';
import CustomButton from '@src/components/native_components/ButtonComponent';
import CustomText from '@src/components/native_components/CustomText';
import {EventHubLogo} from '@src/assets/svg/EventHub';
import {OtherLoginOptionComponent} from '@src/components/auth_component/OtherLoginOption';
import {CircularRightArrow} from '@src/assets/svg/CircularRightArrow';
import HeaderComponent from '@src/components/HeaderComponent';
import ArrowButton from '@src/components/button/ArrowButton';
import {CustomEmailInputComponent} from '@src/components/form/EmailInputComponent';
import {useAppNavigation} from '@src/hooks/userAppNavigation';
import {FORM_IDS} from '@src/constants/formIds';
import {useReduxForm} from '@src/hooks/useReduxForm';
import {PasswordInputComponent} from '@src/components/form/PasswordInputComponent';
import {CustomInputFieldCard} from '@src/components/form/CustomInputFieldCard';
import * as validator from '@src/utils/validatorUtils';
import {CustomTextFieldComponent} from '@src/components/form/CustomTextFieldComponent';
import {RootState} from '@src/redux/store';
import {useReduxSelector} from '@src/hooks/useReduxSelector';
// import {AuthStackParamList} from '@src/navigation/AuthNavigation';

// type LoginScreenProps = StackScreenProps<AuthStackParamList, 'LoginScreen'> & {
//   setUser: React.Dispatch<React.SetStateAction<boolean>>;
// };

export default function RegisterScreen() {
  const {registerField, handleSubmit, reset} = useReduxForm(FORM_IDS.REGISTER);
  const {form} = useReduxSelector();

  const usernameField = registerField('username', {
    validator: validator.validateTextLength,
    validatorArgs: [3, 100], // minLength, maxLength
  });

  const emailField = registerField('email', {
    validator: validator.validateEmail,
  });

  const passwordField = registerField('password', {
    validator: validator.validatePassword,
    validatorArgs: [8, true, true, true, true], // minLength, requireSpecialChar, requireUppercase, requireLowercase, requireNumber
  });

  const repasswordField = registerField('repassword', {
    validator: validator.validateRepassword,
    validatorArgs: [passwordField.value], // minLength, requireSpecialChar, requireUppercase, requireLowercase, requireNumber
  });

  const [isRememberUser, setRememberUser] = useState<boolean>(false);
  const {authNavigation} = useAppNavigation();

  return (
    <ScreenComponent
      headerComponent={<HeaderComponent navigation={authNavigation} />}
      contentStyle={{justifyContent: 'space-evenly'}}
      scrollEnabled={true}
      displayBackgroundImage={true}>
      {/* <CustomText
        textWeight="medium"
        customStyle={{
          fontSize: 24,
          paddingLeft: 1,
          //   alignSelf: 'flex-start',
          width: 317,
          //   borderWidth: 2,
          marginBottom: 20,
        }}>
        Sign Up
      </CustomText> */}

      <CustomTextFieldComponent
        title="Username"
        inputField={usernameField}
        iconType="FontAwesome6"
        iconName="user"
        placeholder="Username"
      />

      <CustomTextFieldComponent
        title="Email"
        inputField={emailField}
        iconType="AntDesign"
        iconName="mail"
        placeholder="abc@email.com"
      />

      <PasswordInputComponent inputField={passwordField} />

      <PasswordInputComponent inputField={repasswordField} confirmPassword />
      {/* <PasswordInputComponent inputField={repasswordField} confirmPassword />
      <PasswordInputComponent inputField={repasswordField} confirmPassword />
      <PasswordInputComponent inputField={repasswordField} confirmPassword />
      <PasswordInputComponent inputField={repasswordField} confirmPassword />
      <PasswordInputComponent inputField={repasswordField} confirmPassword />
      <PasswordInputComponent inputField={repasswordField} confirmPassword /> */}

      <ArrowButton
        label="SIGN UP"
        onPress={() => {
          //   handleSubmit();
          console.log('[Register Form]', form.registerForm);
        }}
      />

      <OtherLoginOptionComponent />

      <CustomContainerComponent customStyle={{marginTop: 5}}>
        <CustomText customStyle={styles.signUpText}>
          Already have an account?{' '}
        </CustomText>
        <CustomButton
          customStyle={{
            width: 'auto',
            height: 'auto',
            backgroundColor: 'transparent',
            // marginLeft: ,
            padding: 0,
            // borderWidth: 1,
          }}
          onPress={() => {}}>
          <CustomText textWeight="thin" customStyle={styles.signUpLink}>
            Sign In
          </CustomText>
        </CustomButton>
      </CustomContainerComponent>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  signUpText: {
    // marginTop: 20,
    fontSize: 14,
    color: '#707070',
  },
  signUpLink: {
    color: '#4c8bf5',
    fontSize: 14,
  },
});

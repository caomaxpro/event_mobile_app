import React from 'react';
import {ScreenComponent} from '@src/components/native_components/ScreenComponent';
import {CustomTextInputComponent} from '@src/components/form/CustomInputField';
import CustomContainerComponent from '@src/components/native_components/ContainerComponent';
import {EventHubLogo} from '@src/assets/svg/EventHub';
import {OtherLoginOptionComponent} from '@src/components/auth_component/OtherLoginOption';
import ArrowButton from '@src/components/button/ArrowButton';
import {loginUser} from '@src/services/authService';
import {FORM_IDS} from '@src/constants/formIds';
import CustomText from '@src/components/native_components/CustomText';
import CustomToggle from '@src/components/native_components/CustomToggle';
import CustomButton from '@src/components/native_components/ButtonComponent';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';
import {useReduxForm} from '@src/hooks/useReduxForm';
import * as validator from '@src/utils/validatorUtils';
import {StyleSheet} from 'react-native';
import {CustomEmailInputComponent} from '@src/components/form/EmailInputComponent';
import {PasswordInputComponent} from '@src/components/form/PasswordInputComponent';

export default function LoginScreen() {
  const [isRememberUser, setRememberUser] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const {registerField, handleSubmit} = useReduxForm(FORM_IDS.LOGIN);

  const emailField = registerField('email', {
    validator: validator.validateEmail,
  });

  const passwordField = registerField('password', {
    validator: validator.validatePassword,
    validatorArgs: [8, true, true, true, true], // minLength, requireSpecialChar, requireUppercase, requireLowercase, requireNumber
  });

  const onSubmit = async (formData: Record<string, string>) => {
    try {
      await loginUser({
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <ScreenComponent displayBackgroundImage={false}>
      <CustomContainerComponent customStyle={{marginBottom: 50}}>
        <EventHubLogo />
      </CustomContainerComponent>

      <CustomEmailInputComponent inputField={emailField} />

      <PasswordInputComponent inputField={passwordField} />

      <CustomText
        textWeight="medium"
        customStyle={{
          fontSize: 24,
          paddingLeft: 1,
          width: 317,
          marginBottom: 20,
        }}>
        Sign in
      </CustomText>

      <CustomContainerComponent
        customStyle={{width: 317}}
        contentStyle={{justifyContent: 'space-between'}}>
        <CustomToggle
          value={isRememberUser}
          setValue={setRememberUser}
          sideMessage="Remember Me"
        />

        <CustomButton
          customStyle={{
            width: 'auto',
            height: 'auto',
            padding: 0,
            backgroundColor: 'transparent',
          }}>
          <CustomText customStyle={{fontSize: 14}}>Forgot Password?</CustomText>
        </CustomButton>
      </CustomContainerComponent>

      <ArrowButton label="SIGN IN" onPress={() => handleSubmit(onSubmit)} />

      <OtherLoginOptionComponent />
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

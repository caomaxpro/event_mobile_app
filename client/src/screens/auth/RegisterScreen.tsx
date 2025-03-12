// LoginScreen.tsx
import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
// import {Header, StackScreenProps} from '@react-navigation/stack';
import {ScreenComponent} from '@src/components/native_components/ScreenComponent';
import {CustomTextInputComponent} from '@src/components/form/CustomInputField';
import {useEmailInput, usePasswordInput} from '@src/hooks/useInputField';
import {Icon} from '@src/components/Icon';
import CustomIcon from '@src/components/native_components/CustomIcon';
import {useSettingContext} from '@src/context/SettingContext';
import CustomContainerComponent from '@src/components/native_components/ContainerComponent';
import CustomToggle from '@src/components/native_components/CustomToggle';
import CustomButton from '@src/components/native_components/ButtonComponent';
import CustomText from '@src/components/native_components/CustomText';
import {EventHubLogo} from '@src/assets/svg/EventHub';
import {OtherLoginOptionComponent} from '@src/components/auth_component/OtherLoginOption';
import {CircularRightArrow} from '@src/assets/svg/CircularRightArrow';
import HeaderComponent from '@src/components/HeaderComponent';
import ArrowButton from '@src/components/button/ArrowButton';
import {useRegisterForm} from '@src/hooks/useRegisterForm';
import {CustomPasswordInputComponent} from '@src/components/form/PasswordInputComponent';
import {CustomEmailInputComponent} from '@src/components/form/EmailInputComponent';
import {useAppNavigation} from '@src/hooks/userAppNavigation';
// import {AuthStackParamList} from '@src/navigation/AuthNavigation';

// type LoginScreenProps = StackScreenProps<AuthStackParamList, 'LoginScreen'> & {
//   setUser: React.Dispatch<React.SetStateAction<boolean>>;
// };

export default function RegisterScreen() {
  const {
    fullNameField,
    emailField,
    passwordField,
    repasswordField,
    handleSubmit,
  } = useRegisterForm();

  const {state} = useSettingContext();

  const [isRememberUser, setRememberUser] = useState<boolean>(false);
  const {authNavigation} = useAppNavigation();

  return (
    <ScreenComponent
      //   contentStyle={{justifyContent: 'space-evenly'}}
      displayBackgroundImage={true}>
      <HeaderComponent navigation={authNavigation} />

      <CustomText
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
      </CustomText>
      <CustomTextInputComponent
        preIcon={
          <CustomIcon
            type="AntDesign"
            name="user"
            size={22}
            color={state.theme.inputBorder}
          />
        }
        textContentType="emailAddress"
        inputField={fullNameField}
        placeholder="Full name"
      />
      <CustomEmailInputComponent inputField={emailField} />

      <CustomPasswordInputComponent passwordField={passwordField} />
      <CustomPasswordInputComponent
        passwordField={repasswordField}
        confirmPassword={true}
      />

      <ArrowButton
        label="SIGN UP"
        onPress={() => {
          handleSubmit();
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

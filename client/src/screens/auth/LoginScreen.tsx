// LoginScreen.tsx
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
// import {StackScreenProps} from '@react-navigation/stack';
import ScreenComponent from '@src/components/ScreenComponent';
import {
  CustomTextInputComponent,
  EmailInputComponent,
} from '@src/components/CustomInputField';
import {useEmailInput, usePasswordInput} from '@src/hooks/useInputField';
import {Icon} from '@src/components/Icon';
import CustomIcon from '@src/components/CustomIcon';
import CustomButton from '@src/components/ButtonComponent';
import {useSettingContext} from '@src/context/SettingContext';
import CustomContainerComponent from '@src/components/ContainerComponent';
import CustomToggle from '@src/components/CustomToggle';
import CustomText from '@src/components/CustomText';
import {EventHubLogo} from '@src/assets/svg/EventHub';
import {OtherLoginOptionComponent} from '@src/components/OtherLoginOption';
import {CircularRightArrow} from '@src/assets/svg/CircularRightArrow';
import ArrowButton from '@src/components/ArrowButton';
import {useLoginForm} from '@src/hooks/useLoginForm';
import {CustomPasswordInputComponent} from '@src/components/PasswordInputComponent';
import {CustomEmailInputComponent} from '@src/components/EmailInputComponent';
import {log} from '@src/utils/logUtils';
// import {AuthContext, useAuthContext} from '@src/context/AuthContext';/
// import {AuthStackParamList} from '@src/navigation/AuthNavigation';

// type LoginScreenProps = StackScreenProps<AuthStackParamList, 'LoginScreen'> & {
//   setUser: React.Dispatch<React.SetStateAction<boolean>>;
// };

export default function LoginScreen() {
  const {emailField, passwordField, handleSubmit} = useLoginForm();

  const {state, setState} = useSettingContext();
  //   const {login} = useContext(AuthContext);

  const [isRememberUser, setRememberUser] = useState<boolean>(false);

  useEffect(() => {
    console.log('Rendering !!!');

    // if (navigation) {
    //   setNavigation(navigation);
    // }
  }, []);

  return (
    <ScreenComponent
      //   customStyle={{height: '100%', width: '100%', flex: 1}}
      //   contentStyle={{height: '100%', width: '100%', flex: 1}}
      // contentStyle={{justifyContent: 'center'}}
      displayBackgroundImage={false}>
      <CustomContainerComponent customStyle={{marginBottom: 50}}>
        <EventHubLogo />
      </CustomContainerComponent>

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

      <CustomEmailInputComponent inputField={emailField} />
      <CustomPasswordInputComponent passwordField={passwordField} />

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

      <ArrowButton
        label="SIGN IN"
        onPress={async () => {
          log('[Login Screen]', 'Sign In');

          await handleSubmit();
        }}
      />

      <OtherLoginOptionComponent />

      <CustomContainerComponent customStyle={{marginTop: 20}}>
        <CustomText customStyle={styles.signUpText}>
          Don't have an account?{' '}
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
            Sign Up
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

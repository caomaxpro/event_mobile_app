// LoginScreen.tsx
import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Header, StackScreenProps} from '@react-navigation/stack';
import ScreenComponent from '@src/components/ScreenComponent';
import {CustomTextInputComponent} from '@src/components/CustomInputField';
import {useEmailInput, usePasswordInput} from '@src/hooks/useInputField';
import {Icon} from '@src/components/Icon';
import CustomIcon from '@src/components/CustomIcon';
import {useSettingContext} from '@src/context/SettingContext';
import CustomContainerComponent from '@src/components/ContainerComponent';
import CustomToggle from '@src/components/CustomToggle';
import CustomButton from '@src/components/ButtonComponent';
import CustomText from '@src/components/CustomText';
import {EventHubLogo} from '@src/assets/svg/EventHub';
import {OtherLoginOptionComponent} from '@src/components/OtherLoginOption';
import {CircularRightArrow} from '@src/assets/svg/CircularRightArrow';
import HeaderComponent from '@src/components/HeaderComponent';
import ArrowButton from '@src/components/ArrowButton';
// import {AuthStackParamList} from '@src/navigation/AuthNavigation';

// type LoginScreenProps = StackScreenProps<AuthStackParamList, 'LoginScreen'> & {
//   setUser: React.Dispatch<React.SetStateAction<boolean>>;
// };

export default function RegisterScreen() {
  const emailInputField = useEmailInput('');
  const passwordInputField = usePasswordInput('');

  const {state} = useSettingContext();

  const [isRememberUser, setRememberUser] = useState<boolean>(false);

  return (
    <ScreenComponent
      //   contentStyle={{justifyContent: 'space-evenly'}}
      displayBackgroundImage={true}>
      <HeaderComponent />

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
            name="mail"
            size={22}
            color={state.theme.inputBorder}
          />
        }
        textContentType="emailAddress"
        inputField={emailInputField}
        placeholder="abc@email.com"
      />
      <CustomTextInputComponent
        preIcon={
          <CustomIcon
            type="AntDesign"
            name="mail"
            size={22}
            color={state.theme.inputBorder}
          />
        }
        textContentType="emailAddress"
        inputField={emailInputField}
        placeholder="abc@email.com"
      />

      <CustomTextInputComponent
        // containerStyle={}
        preIcon={
          <CustomIcon
            type="Feather"
            name="lock"
            size={22}
            color={state.theme.inputBorder}
          />
        }
        textContentType="password"
        inputField={passwordInputField}
        password={true}
        placeholder="Your password"
      />

      <CustomTextInputComponent
        // containerStyle={}
        preIcon={
          <CustomIcon
            type="Feather"
            name="lock"
            size={22}
            color={state.theme.inputBorder}
          />
        }
        textContentType="password"
        inputField={passwordInputField}
        password={true}
        placeholder="Your password"
      />

      <ArrowButton label="SIGN UP" onPress={() => {}} />

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

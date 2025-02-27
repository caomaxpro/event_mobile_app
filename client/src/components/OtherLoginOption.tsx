import {FacebookIcon} from '@src/assets/svg/FaceBookIcon';
import {GoogleIcon} from '@src/assets/svg/GoogleIcon';
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  GestureResponderEvent,
} from 'react-native';
import CustomContainerComponent from './ContainerComponent';
import CustomButton from './ButtonComponent';
import {useSettingContext} from '@src/context/SettingContext';
import CustomText from './CustomText';
import {useNavigation} from '@react-navigation/native';

export const OtherLoginOptionComponent: React.FC = () => {
  const {state} = useSettingContext();

  //   const navigation = useNavigation();

  const handleGoogleLogin = (event: GestureResponderEvent) => {
    // Handle Google login here
  };

  const handleFacebookLogin = (event: GestureResponderEvent) => {
    // Handle Facebook login here
  };

  return (
    <CustomContainerComponent
      customStyle={[styles.container, {marginTop: 30}]}
      contentStyle={styles.container}>
      {/* Google login button */}
      <CustomText
        textWeight="medium"
        customStyle={{fontSize: 16, color: state.theme.placeHolder}}>
        OR
      </CustomText>

      <CustomButton
        customStyle={[
          styles.button,
          {backgroundColor: 'rgba(255, 255, 255, 0.5)'},
        ]}
        onPress={() => handleGoogleLogin}>
        <View style={styles.buttonContent}>
          <GoogleIcon width={26} height={26} />
          <CustomText customStyle={styles.buttonText}>
            Login with Google
          </CustomText>
        </View>
      </CustomButton>

      <CustomButton
        customStyle={[
          styles.button,
          {backgroundColor: 'rgba(255, 255, 255, 0.5)'},
        ]}
        onPress={() => handleFacebookLogin}>
        <View style={styles.buttonContent}>
          <FacebookIcon width={26} height={26} />
          <CustomText customStyle={styles.buttonText}>
            Login with Facebook
          </CustomText>
        </View>
      </CustomButton>
    </CustomContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    margin: 0,
    display: 'flex',
    minHeight: 213,
    width: 317,
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // borderWidth: 2,
    // padding: 20,
    // backgroundColor: '#f4f7fc',
  },
  button: {
    width: '100%',
    height: 56,
    padding: 15,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow properties for iOS
    shadowColor: '#D3D4E2',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 5,
  },
  buttonContent: {
    // marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: 20,
  },
  buttonText: {
    marginLeft: 20,
    fontSize: 16,
    // width: 200,
    // borderWidth: 2,
  },
});

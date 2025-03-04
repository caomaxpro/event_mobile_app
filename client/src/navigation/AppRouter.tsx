import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import SplashScreen from '@src/screens/SplashScreen';
import {useSettingContext} from '@src/context/SettingContext';
import TabNavigator from './TabNavigator';
import DrawerNavigator from './DrawerNavigator';

const AppRouters = () => {
  const [splashScreen, setSplashScreen] = useState<boolean>(true);

  const {state} = useSettingContext();

  useEffect(() => {
    // console.log(BASE_URL);

    const timer = setTimeout(async () => {
      // fetch user data from storage
      //   const user = await loadState();

      //   if (user) {
      //   }

      // check if user login => login? == true => main screen
      // else => onboarding screen

      setSplashScreen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useState;

  return (
    <>
      <DrawerNavigator />
      {/* <TabNavigator /> */}

      {/* {splashScreen ? (
        <SplashScreen />
      ) : state.token.jwt ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )} */}
    </>
  );
};

export default AppRouters;

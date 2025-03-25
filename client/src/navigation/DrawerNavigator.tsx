import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SectionList,
  SectionListComponent,
} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';

import HomeScreen from '@src/screens/bottom_tab/HomeScreen';
import ProfileScreen from '@src/screens/bottom_tab/ProfileScreen';
import CalenderScreen from '@src/screens/drawer/CalenderScreen';
import BookmarkScreen from '@src/screens/drawer/BookmarkScreen';
import ContactUsScreen from '@src/screens/drawer/ContactUsScreen';
import SettingScreen from '@src/screens/drawer/SettingScreen';
import {useAppNavigation} from '@src/hooks/userAppNavigation';
import CustomContainerComponent from '@src/components/native_components/ContainerComponent';
import CustomText from '@src/components/native_components/CustomText';
import {ProfileIcon} from '@src/assets/svg/ProfileIcon';
import {SvgProps} from 'react-native-svg';
import {MessageIcon} from '@src/assets/svg/MessageIcon';
import {CalenderIcon} from '@src/assets/svg/CalenderIcon';
import {BookmarkIcon} from '@src/assets/svg/BookmarkIcon';
import {MailIcon} from '@src/assets/svg/MailIcon';
import {SettingIcon} from '@src/assets/svg/SettingIcon';
import {QuestionIcon} from '@src/assets/svg/QuestionIcon';
import {LogoutIcon} from '@src/assets/svg/LogoutIcon';
import DrawerSection from '@src/screens/bottom_tab/home_screen/DrawerSection';
import {PremiumIcon} from '@src/assets/svg/PremiumIcon';
import CustomButton from '@src/components/native_components/ButtonComponent';
import Animated from 'react-native-reanimated';
import {CustomDrawerContent} from '@src/components/native_components/DrawerComponent';

export type DrawerParamList = {
  TabNavigator: undefined;
  ProfileScreen: undefined;
  SettingScreen: undefined;
  CalenderScreen: undefined;
  BookmarkScreen: undefined;
  ContactUsScreen: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

// Tạo custom drawer

// Cấu hình Drawer
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          //   backgroundColor: '#fff', // Set drawer background color
          width: '65%', // Adjust drawer width if needed
        },
        overlayColor: 'transparent',
        drawerType: 'front',
        gestureHandlerProps: {
          enabled: false,
        },
      }}>
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen name="CalenderScreen" component={CalenderScreen} />
      <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
      <Drawer.Screen name="ContactUsScreen" component={ContactUsScreen} />
      <Drawer.Screen name="SettingScreen" component={SettingScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';

import HomeScreen from '@src/screens/bottom_tab/HomeScreen';
import ProfileScreen from '@src/screens/bottom_tab/ProfileScreen';
import CalenderScreen from '@src/screens/drawer/CalenderScreen';
import BookmarkScreen from '@src/screens/drawer/BookmarkScreen';
import ContactUsScreen from '@src/screens/drawer/ContactUsScreen';
import SettingScreen from '@src/screens/drawer/SettingScreen';
import {useAppNavigation} from '@src/hooks/userAppNavigation';
import CustomContainerComponent from '@src/components/ContainerComponent';
import CustomText from '@src/components/CustomText';

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
const CustomDrawerContent = ({...props}): React.JSX.Element => {
  const {drawerNavigation, authNavigation} = useAppNavigation();

  return (
    <CustomContainerComponent
      contentStyle={{
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // alignContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 20,
      }}>
      {/* {User avatar + name} */}
      <CustomContainerComponent
        contentStyle={{
          justifyContent: 'flex-start',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginBottom: 30,
        }}
        isStatusBar={true}>
        <Image
          style={{height: 60, width: 60, borderRadius: 50, borderWidth: 2}}
        />

        <CustomText customStyle={{marginTop: 10}}>Cao Le</CustomText>
      </CustomContainerComponent>

      <CustomContainerComponent
        contentStyle={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        {/* Danh sách Menu */}
        <TouchableOpacity
          onPress={() => drawerNavigation.navigate('ProfileScreen')}>
          <Text style={{fontSize: 16, paddingVertical: 10}}>👤 My Profile</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
        onPress={() => drawerNavigation.navigate('')}>
        <Text style={{fontSize: 16, paddingVertical: 10}}>💬 Messages</Text>
      </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => drawerNavigation.navigate('CalenderScreen')}>
          <Text style={{fontSize: 16, paddingVertical: 10}}>📅 Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => drawerNavigation.navigate('BookmarkScreen')}>
          <Text style={{fontSize: 16, paddingVertical: 10}}>🔖 Bookmark</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => drawerNavigation.navigate('ContactUsScreen')}>
          <Text style={{fontSize: 16, paddingVertical: 10}}>📩 Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => drawerNavigation.navigate('SettingScreen')}>
          <Text style={{fontSize: 16, paddingVertical: 10}}>⚙️ Settings</Text>
        </TouchableOpacity>

        {/* Nút Sign Out */}
        <TouchableOpacity
          onPress={() => authNavigation.navigate('LoginScreen')}>
          <Text style={{fontSize: 16, paddingVertical: 10, color: 'red'}}>
            🚪 Sign Out
          </Text>
        </TouchableOpacity>
      </CustomContainerComponent>
    </CustomContainerComponent>
  );
};

// Cấu hình Drawer
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawerContent {...props} />}>
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

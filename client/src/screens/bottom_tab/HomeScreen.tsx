import React, {useEffect, useState} from 'react';
import {useDrawerStatus} from '@react-navigation/drawer';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAppNavigation} from '@src/hooks/userAppNavigation';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {ScreenComponent} from '@src/components/native_components/ScreenComponent';
import {CustomDrawerContent} from '@src/components/native_components/DrawerComponent';
import CustomContainerComponent from '@src/components/native_components/ContainerComponent';
import {AnimatedCustomContainerComponent} from '@src/components/native_components/ContainerComponent';
import {AnimatedScreenComponent} from '@src/components/native_components/ScreenComponent';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@src/utils/appInfo';
import {MenuIcon} from '@src/assets/svg/MenuIcon';
import CustomButton from '@src/components/native_components/ButtonComponent';
import {BellIcon} from '@src/assets/svg/BellIcon';
import SearchBarComponent from '@src/components/form/SearchBarComponent';
import EventChoiceOptions from '@src/screens/bottom_tab/home_screen/EventChoiceOptions';
import CustomText from '@src/components/native_components/CustomText';
import CustomIcon from '@src/components/native_components/CustomIcon';
import CustomHorizontalScrollView from '@src/components/native_components/HorizontalScrollView';
import {hs, vs, ms} from '@src/utils/rNResponsive';
import UpcomingEventItem from '@src/screens/bottom_tab/home_screen/UpcomingEventItem';
import {Events} from '@src/assets/data/event';
import InviteCard from '@src/screens/bottom_tab/home_screen/InviteCard';
import EventSliderComponent from '@src/screens/bottom_tab/home_screen/EventSliderComponent';
import CustomVerticleScrollView from '@src/components/native_components/CustomVerticleScrollView';
import BottomBarComponent from '@src/components/bottom_bar_component/BottomBarComponent';
import HomeBodyComponent from '@src/screens/bottom_tab/home_screen/HomeBodyComponent';
import {useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';

const screenHeightWhenOpened = SCREEN_HEIGHT * 0.95;

const HomeScreen = () => {
  const {drawerNavigation} = useAppNavigation();
  const drawerStatus = useDrawerStatus();

  const {isDrawerOpened, isDetailsShowed} = useSelector(
    (state: RootState) => state.app,
  );

  useEffect(() => {
    console.log('Rendering !!!');
  });

  const animatedScreenComponentStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: isDrawerOpened
        ? withTiming(SCREEN_HEIGHT - screenHeightWhenOpened, {duration: 500})
        : withTiming(0, {duration: 500}),
      left: 0,
      width: SCREEN_WIDTH,
      //   right: isDrawerOpened ? 0 : 0,
      height: isDrawerOpened
        ? withTiming(screenHeightWhenOpened, {
            duration: 500,
          })
        : withTiming(SCREEN_HEIGHT + 40, {
            duration: 500,
          }),
      zIndex: 3,
      transform: [
        {
          translateX: isDrawerOpened
            ? withTiming('75%', {duration: 500})
            : withTiming('0%', {duration: 500}),
        },
        // {
        //   scaleY: isDrawerOpened
        //     ? withTiming(0.9, {duration: 500})
        //     : withTiming(1, {duration: 500}),
        // },
      ],

      borderRadius: isDrawerOpened
        ? withTiming(40, {duration: 500})
        : withTiming(0, {duration: 500}),

      overflow: 'hidden',
    };
  });

  const animatedContainer1 = useAnimatedStyle(() => {
    return {
      left: isDrawerOpened
        ? withTiming('65%', {duration: 500})
        : withTiming('0%', {duration: 500}),

      height: isDrawerOpened
        ? withTiming((SCREEN_HEIGHT + 60) * 0.95, {duration: 500})
        : withTiming((SCREEN_HEIGHT + 60) * 1, {duration: 500}),

      borderRadius: isDrawerOpened
        ? withTiming(40, {duration: 500})
        : withTiming(0, {duration: 500}),

      backgroundColor: 'rgba(188, 188, 188, 0.25)',
      opacity: isDrawerOpened ? 1 : 0,
    };
  });

  const animatedContainer2 = useAnimatedStyle(() => {
    return {
      left: isDrawerOpened
        ? withTiming('70%', {duration: 500})
        : withTiming('0%', {duration: 500}),

      height: isDrawerOpened
        ? withTiming((SCREEN_HEIGHT + 60) * 0.95, {duration: 500})
        : withTiming((SCREEN_HEIGHT + 60) * 1, {duration: 500}),

      borderRadius: isDrawerOpened
        ? withTiming(40, {duration: 500})
        : withTiming(0, {duration: 500}),

      backgroundColor: 'rgba(188, 188, 188, 0.25)',
      opacity: isDrawerOpened ? 1 : 0,
    };
  });

  return (
    <AnimatedScreenComponent
      customStyle={{
        justifyContent: 'flex-start',
        borderWidth: 0,
        height: hs(SCREEN_HEIGHT),
        overflow: 'hidden',
        backgroundColor: 'green',
      }}
      contentStyle={styles.container}>
      <CustomDrawerContent isDrawerOpened={isDrawerOpened} />

      {/* <AnimatedCustomContainerComponent
        // style={[animatedContainer1]}
        customStyle={[
          {
            // borderWidth: 2,
            zIndex: 0,
            height: '100%',
            width: SCREEN_WIDTH,
            backgroundColor: 'blue',
            position: 'absolute',
            top: 0,
            //   left: isDrawerOpened ? withTiming('65%', {duration: 500}) : '0%',
          },
          animatedContainer1,
        ]}
      /> */}

      {/* 
      <AnimatedCustomContainerComponent
        // style={[animatedContainer2]}
        customStyle={[
          {
            zIndex: 0,
            height: '100%',
            width: SCREEN_WIDTH,
            backgroundColor: 'red',
            position: 'absolute',
            top: 0,
            left: '70%',
          },
          animatedContainer2,
        ]}
      /> */}

      {/* <View style={{width: 100, height: 100, backgroundColor: 'red'}}></View> */}

      <AnimatedCustomContainerComponent
        // style={[animatedScreenComponentStyle]}
        customStyle={[
          {
            width: '100%',
            height: hs(SCREEN_HEIGHT),
            backgroundColor: 'white',
          },
          animatedScreenComponentStyle,
        ]}
        contentStyle={{
          flexDirection: 'column',
          borderWidth: 0,
          height: '100%',
          justifyContent: 'flex-start',
          //   backgroundColor: 'green',
        }}>
        <HomeBodyComponent />

        <BottomBarComponent />

        {/* <CustomHorizontalScrollView>

        </CustomHorizontalScrollView> */}
      </AnimatedCustomContainerComponent>
    </AnimatedScreenComponent>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#ffffff',
    // backgroundColor: 'blue',
    padding: 0,
    // overflow: 'scroll',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // alignContent: 'center',
    borderWidth: 0,
    overflow: 'hidden',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  categoryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventCard: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  eventImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  eventLocation: {
    color: '#666',
    fontSize: 14,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 30,
  },
});

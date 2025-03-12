import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import SvgImage from 'react-native-svg/lib/typescript/elements/Image'
import {SvgProps} from 'react-native-svg';
import {CompassIcon} from '@src/assets/svg/bottom_bar_svg/CompassIcon';
import {CalenderIcon} from '@src/assets/svg/bottom_bar_svg/CalenderIcon';
import {LocationPinIcon} from '@src/assets/svg/bottom_bar_svg/LocationPinIcon';
import {ProfileIcon} from '@src/assets/svg/bottom_bar_svg/ProfileIcon';
import CustomContainerComponent from '../native_components/ContainerComponent';
import CustomText from '../native_components/CustomText';
import {SCREEN_WIDTH} from '@src/utils/appInfo';
import CustomButton from '../native_components/ButtonComponent';
import {hs, ms} from '@src/utils/rNResponsive';
import CustomIcon from '../native_components/CustomIcon';
import {CustomSvgProp} from '@src/assets/svg/bottom_bar_svg/types';
import {useAppNavigation} from '@src/hooks/userAppNavigation';

type BottomBarButton = {
  title: string;
  icon?: React.FC<CustomSvgProp>;
  active: boolean;
  screen: 'HomeScreen' | 'EventScreen' | 'MapScreen' | 'ProfileScreen';
};

const bottomBarButtons: BottomBarButton[] = [
  {
    title: 'Explore',
    icon: CompassIcon,
    active: true,
    screen: 'HomeScreen',
  },
  {
    title: 'Events',
    icon: CalenderIcon,
    active: false,
    screen: 'EventScreen',
  },
  {
    title: '',
    // icon: <CustomIcon type="MaterialIcons" name="add-circle" size={26} />,
    active: false,
    screen: 'EventScreen',
  },
  {
    title: 'Map',
    icon: LocationPinIcon,
    active: false,
    screen: 'MapScreen',
  },
  {
    title: 'Profile',
    icon: ProfileIcon,
    active: false,
    screen: 'ProfileScreen',
  },
];

const BottomBarComponent = () => {
  const {tabNavigation} = useAppNavigation();

  return (
    <View
      style={{
        height: 'auto',
        pointerEvents: 'box-none',
        // width: ms(SCREEN_WIDTH, 0),
        display: 'flex',
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        bottom: ms(0),
        backgroundColor: 'transparent',
      }}>
      <CustomButton
        onPress={() => {}}
        customStyle={{
          width: hs(46),
          height: hs(46),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
          position: 'relative',
          zIndex: 50,
          bottom: ms(-30),
          //   bottom: ms(-23),
          //   left: ms(SCREEN_WIDTH / 2 - 46 / 2 - 4, 0),
        }}>
        <CustomIcon type="MaterialIcons" name="add-circle" size={26} />
      </CustomButton>

      <CustomContainerComponent
        customStyle={styles.container}
        contentStyle={styles.containerContent}>
        {bottomBarButtons.map((button, index) => {
          const Icon = button.icon;

          return (
            <CustomButton
              key={index.toString()}
              onPress={() => {
                tabNavigation.navigate(button.screen);
              }}
              customStyle={
                index === 2
                  ? {...styles.buttonWrapper, opacity: 0}
                  : styles.buttonWrapper
              }>
              {Icon !== undefined ? <Icon fillColor="gray" /> : <></>}
              <CustomText
                textWeight="light"
                customStyle={{fontSize: 12, height: 16}}>
                {button.title}
              </CustomText>
            </CustomButton>
          );
        })}
      </CustomContainerComponent>
    </View>
  );
};

export default BottomBarComponent;

const styles = StyleSheet.create({
  container: {
    width: ms(SCREEN_WIDTH, 0),
    height: ms(70, 0),
    backgroundColor: 'white',
    overflow: 'visible',
    elevation: 1,
  },

  containerContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
  },

  buttonWrapper: {
    width: hs(40),
    height: hs(40),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 2,
    backgroundColor: 'transparent',
  },
});

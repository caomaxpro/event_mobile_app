import {PremiumIcon} from '@src/assets/svg/PremiumIcon';
import {useAppNavigation} from '@src/hooks/userAppNavigation';
import {Animated, Image, StatusBar} from 'react-native';
import CustomButton from './ButtonComponent';
import CustomContainerComponent from './ContainerComponent';
import CustomText from './CustomText';
import {BookmarkIcon} from '@src/assets/svg/BookmarkIcon';
import {CalenderIcon} from '@src/assets/svg/CalenderIcon';
import {LogoutIcon} from '@src/assets/svg/LogoutIcon';
import {MailIcon} from '@src/assets/svg/MailIcon';
import {MessageIcon} from '@src/assets/svg/MessageIcon';
import {ProfileIcon} from '@src/assets/svg/ProfileIcon';
import {QuestionIcon} from '@src/assets/svg/QuestionIcon';
import {SettingIcon} from '@src/assets/svg/SettingIcon';
import {SvgProps} from 'react-native-svg';
import {
  IOSReferenceFrame,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {ms} from '@src/utils/rNResponsive';
import {SCREEN_HEIGHT} from '@src/utils/appInfo';

type DrawerSection = {
  icon: React.FC<SvgProps>;
  title: string;
  screen:
    | 'TabNavigator'
    | 'ProfileScreen'
    | 'CalenderScreen'
    | 'BookmarkScreen'
    | 'ContactUsScreen'
    | 'SettingScreen'
    | '';
};

const DrawerSectionList: DrawerSection[] = [
  {
    icon: ProfileIcon,
    title: 'My Profile',
    screen: 'ProfileScreen',
  },
  {
    icon: MessageIcon,
    title: 'Message',
    screen: 'ProfileScreen',
  },
  {
    icon: CalenderIcon,
    title: 'Calender',
    screen: 'CalenderScreen',
  },
  {
    icon: BookmarkIcon,
    title: 'Bookmark',
    screen: 'BookmarkScreen',
  },
  {
    icon: MailIcon,
    title: 'Contact Us',
    screen: 'ContactUsScreen',
  },
  {
    icon: SettingIcon,
    title: 'Settings',
    screen: 'SettingScreen',
  },
  {
    icon: QuestionIcon,
    title: 'Helps & FAQs',
    screen: '',
  },
  {
    icon: LogoutIcon,
    title: 'Sign Out',
    screen: '',
  },
];

type CustomDrawerContentProp = {
  isDrawerOpened: boolean;
};

export const CustomDrawerContent: React.FC<CustomDrawerContentProp> = ({
  isDrawerOpened,
}): React.JSX.Element => {
  const {drawerNavigation, authNavigation} = useAppNavigation();

  const customContainerComponentStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      height: SCREEN_HEIGHT,
      //   zIndex: isDrawerOpened ? 0 : -1,
      opacity: isDrawerOpened
        ? withTiming(1, {duration: 500})
        : withTiming(0, {duration: 500}),
      //   transform: [{translateX: isDrawerOpened ? '70%' : '0%'}],
      backgroundColor: 'transparent',
    };
  });

  return (
    <CustomContainerComponent
      customStyle={[
        {
          height: '100%',
          //   borderWidth: 2,
          // marginTop: StatusBar.currentHeight || 0,
        },
        customContainerComponentStyle,
      ]}
      contentStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        paddingLeft: 10,
        alignContent: 'space-between',
        height: '100%',
        // borderWidth: 2,
        width: '65%',
        // marginTop: StatusBar.currentHeight || 0,
      }}>
      {/* {User avatar + name} */}
      <CustomContainerComponent
        customStyle={{
          height: '15%',
          //   borderWidth: 2,
        }}
        contentStyle={{
          justifyContent: 'flex-start',
          flexDirection: 'column',
          alignItems: 'flex-start',
          //   marginBottom: 30,
        }}
        isStatusBar={true}>
        <Image
          style={{height: 60, width: 60, borderRadius: 50, borderWidth: 2}}
        />

        <CustomText customStyle={{marginTop: 10, fontSize: 19}}>
          Cao Le
        </CustomText>
      </CustomContainerComponent>

      <CustomContainerComponent
        customStyle={{
          height: '70%',
          //   borderWidth: 2,
        }}
        contentStyle={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        {/* Danh sách Menu */}
        {DrawerSectionList.map((section, index) => {
          return (
            <CustomButton
              onPress={() => {
                if (section.screen !== '') {
                  drawerNavigation.navigate(section.screen);
                }
              }}
              key={index.toString()}
              customStyle={{height: 60, backgroundColor: 'transparent'}}>
              <CustomContainerComponent
                customStyle={{
                  height: 60,
                  width: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <section.icon />
              </CustomContainerComponent>

              <CustomText customStyle={{marginLeft: 0}}>
                {section.title}
              </CustomText>
            </CustomButton>
          );
        })}
      </CustomContainerComponent>

      <CustomButton
        customStyle={{
          height: 46,
          width: 150,
          borderRadius: 10,
          backgroundColor: 'rgba(0, 248, 255, 0.2)',
          //   justifyContent: 'flex-end',
          display: 'flex',
          flexDirection: 'row',
          //   alignSelf: 'flex-end',
        }}>
        <PremiumIcon />
        <CustomText
          customStyle={{
            fontSize: 14,
            marginLeft: 10,
            color: 'rgba(0, 248, 255, 1)',
          }}>
          Upgrade Pro
        </CustomText>
      </CustomButton>
    </CustomContainerComponent>
  );
};

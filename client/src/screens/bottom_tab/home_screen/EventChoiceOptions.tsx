import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomContainerComponent from '../../../components/native_components/ContainerComponent';
import {ScrollView} from 'react-native-gesture-handler';
import {SvgProps} from 'react-native-svg';
import {SportsIcon} from '@src/assets/svg/SportsIcon';
import {MusicIcon} from '@src/assets/svg/MusicIcon';
import {FoodIcon} from '@src/assets/svg/FoodIcon';
import {ArtIcon} from '@src/assets/svg/ArtIcon';
import CustomText from '../../../components/native_components/CustomText';
import {SCREEN_WIDTH} from '@src/utils/appInfo';
import {ms} from '@src/utils/rNResponsive';
import {useReduxSelector} from '@src/hooks/useReduxSelector';

type EventItem = {
  icon: React.FC<SvgProps>;
  title: string;
  bgColor: string;
};

const EventItems: EventItem[] = [
  {
    icon: SportsIcon,
    title: 'Sports',
    bgColor: 'rgba(240, 99, 90, 1)',
  },
  {
    icon: MusicIcon,
    title: 'Music',
    bgColor: 'rgba(245, 151, 98, 1)',
  },
  {
    icon: FoodIcon,
    title: 'Food',
    bgColor: 'rgba(41, 214, 151, 1)',
  },
  {
    icon: ArtIcon,
    title: 'Arts',
    bgColor: 'rgba(70, 205, 251, 1)',
  },
];

const EventChoiceOptions = () => {
  const {theme} = useReduxSelector();

  return (
    <CustomContainerComponent customStyle={styles.container}>
      <ScrollView
        contentContainerStyle={{
          width: 106.77 * EventItems.length + 11 * (EventItems.length + 3),
          //   justifyContent: 'space-evenly',
          //   borderWidth: 2,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        {EventItems.map((event, index) => {
          const Icon = event.icon;

          return (
            <CustomContainerComponent
              key={index.toString()}
              customStyle={styles.item}
              contentStyle={[
                styles.item,
                {
                  borderRadius: 30,
                  backgroundColor: event.bgColor,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                },
              ]}>
              <Icon />
              <CustomText customStyle={{color: theme.textOnContainer}}>
                {event.title}
              </CustomText>
            </CustomContainerComponent>
          );
        })}
      </ScrollView>
    </CustomContainerComponent>
  );
};

export default EventChoiceOptions;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: ms(-20),
    zIndex: 5,
    width: '100%',
    borderWidth: 0,
    // elevation: 2,
  },
  scrollView: {
    flexDirection: 'row',
    // marginHorizontal: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: SCREEN_WIDTH,
    // borderWidth: 2,
  },
  item: {
    width: 106.77,
    height: 39.06,
    marginRight: 11,
    elevation: 2,
    borderRadius: 30,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

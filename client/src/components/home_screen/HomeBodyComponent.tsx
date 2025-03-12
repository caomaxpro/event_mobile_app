import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SCREEN_HEIGHT} from '@src/utils/appInfo';
import {ms} from '@src/utils/rNResponsive';
import CustomContainerComponent, {
  AnimatedCustomContainerComponent,
} from '../native_components/ContainerComponent';
import EventSliderComponent from './EventSliderComponent';
import CustomVerticleScrollView from '../native_components/CustomVerticleScrollView';
import InviteCard from './InviteCard';
import {HomeComponentProp} from './types';
import EventDetailComponent from './EventDetailComponent';
import UpcomingEventItem from './UpcomingEventItem';
import {Event} from '@src/types/types';

const HomeBodyComponent: React.FC<HomeComponentProp> = ({
  isDrawerOpened,
  isEventDetail,
  setEventDetail,
}) => {
  const [viewedEvent, setViewedEvent] = useState<Event | null>(null);

  return (
    <AnimatedCustomContainerComponent
      contentStyle={[{height: ms(SCREEN_HEIGHT, 0)}]}>
      <CustomVerticleScrollView
        style={{
          position: 'relative',
          top: ms(0),
          // width: linearScale(SCREEN_WIDTH),
          //   height: 600,
          borderWidth: 0,
          //   backgroundColor: 'blue',
        }}
        contentContainerStyle={{
          height: 'auto',
          paddingTop: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          borderWidth: 1,
        }}>
        {viewedEvent && <UpcomingEventItem event={viewedEvent} />}

        <EventSliderComponent
          title="Upcoming Events"
          sliderStyle={{marginTop: 0}}
          isEventDetail={isEventDetail}
          setEventDetail={setEventDetail}
          setViewedEvent={setViewedEvent}
        />

        <InviteCard isEventDetail={isEventDetail} />

        <EventSliderComponent
          title="Nearby You"
          sliderStyle={{marginTop: 20}}
          isEventDetail={isEventDetail}
          setEventDetail={setEventDetail}
          setViewedEvent={setViewedEvent}
        />
      </CustomVerticleScrollView>
    </AnimatedCustomContainerComponent>
  );
};

export default HomeBodyComponent;

const styles = StyleSheet.create({});

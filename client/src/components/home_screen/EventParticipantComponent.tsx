import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hs} from '@src/utils/rNResponsive';
import CustomContainerComponent from '../native_components/ContainerComponent';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@src/redux/store';

const EventParticipantComponent = () => {
  const dispatch = useDispatch();

  // reshape this card
  const app = useSelector((state: RootState) => state.app);

  // get data from 3 first participant from
  const user = useSelector((state: RootState) => state.user);

  return (
    <CustomContainerComponent
      contentStyle={{width: 70, justifyContent: 'flex-start'}}
      customStyle={{
        width: 'auto',
        borderWidth: 0,
        //   marginTop: ms(10),
      }}>
      {/* <Image
            style={{
              width: hs(24),
              height: hs(24),
              borderWidth: 2,
              borderRadius: 50,
              position: 'relative',
              left: hs(-(index * 10)),
              zIndex: 3,
            }}
          /> */}

      <Image
        style={{
          width: hs(24),
          height: hs(24),
          borderWidth: 1.5,
          borderColor: 'white',
          borderRadius: 50,
          position: 'relative',
          left: 0,
          zIndex: 3,
          backgroundColor: 'lightblue',
        }}
      />
      <Image
        style={{
          width: hs(24),
          height: hs(24),
          borderWidth: 1.5,
          borderColor: 'white',
          borderRadius: 50,
          position: 'relative',
          left: -10,
          backgroundColor: 'red',
          zIndex: 2,
        }}
      />
      <Image
        style={{
          width: hs(24),
          height: hs(24),
          borderWidth: 1.5,
          borderColor: 'white',
          borderRadius: 50,
          position: 'relative',
          backgroundColor: 'yellow',
          left: -20,
        }}
      />
    </CustomContainerComponent>
  );
};

export default EventParticipantComponent;

const styles = StyleSheet.create({});

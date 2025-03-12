import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BellIcon} from '@src/assets/svg/BellIcon';
import {MenuIcon} from '@src/assets/svg/MenuIcon';
import {ms, hs} from '@src/utils/rNResponsive';
import CustomButton from '../native_components/ButtonComponent';
import CustomContainerComponent from '../native_components/ContainerComponent';
import CustomText from '../native_components/CustomText';
import SearchBarComponent from '../form/SearchBarComponent';

type HeaderComponentProp = {
  isDrawerOpened: boolean;
  setDrawerOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderComponent: React.FC<HeaderComponentProp> = ({
  isDrawerOpened = false,
  setDrawerOpened,
}) => {
  return (
    <CustomContainerComponent
      contentStyle={[styles.header, {paddingTop: ms(44)}]}>
      <CustomContainerComponent
        customStyle={{
          width: '100%',
          height: hs(36),
          marginBottom: ms(20),
          borderWidth: 0,
        }}
        contentStyle={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'space-between',
        }}>
        <CustomButton
          customStyle={{backgroundColor: 'transparent'}}
          onPress={() => {
            // drawerNavigation.openDrawer();
            setDrawerOpened(!isDrawerOpened);
          }}>
          <MenuIcon />
        </CustomButton>

        <View style={styles.location}>
          <CustomText
            customStyle={[{fontSize: 12, color: 'rgba(255, 255, 255, 0.4)'}]}>
            Current Location
          </CustomText>
          <CustomText
            customStyle={[{fontSize: 13, color: 'rgba(255, 255, 255, 0.8)'}]}>
            New York, USA
          </CustomText>
        </View>

        <CustomButton
          customStyle={{backgroundColor: 'transparent'}}
          onPress={() => {
            // drawerNavigation.openDrawer();
            setDrawerOpened(!isDrawerOpened);
          }}>
          <CustomContainerComponent
            customStyle={{
              width: 36,
              height: 36,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(82, 76, 224, 1)',
            }}>
            <BellIcon />
          </CustomContainerComponent>
        </CustomButton>
      </CustomContainerComponent>

      <SearchBarComponent />
    </CustomContainerComponent>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    // position: 'absolute',
    // top: 179,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignContent: 'space-between',
    justifyContent: 'flex-start',
    paddingHorizontal: hs(16),
    width: '100%',
    height: hs(179),
    borderWidth: 0,
    backgroundColor: 'rgba(74, 67, 236, 1)',
    borderBottomEndRadius: 33,
    borderBottomStartRadius: 33,
    // zIndex: 10,
  },
  location: {
    alignItems: 'center',
  },
  locationText: {
    color: '#666',
    fontSize: 12,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
  },
});

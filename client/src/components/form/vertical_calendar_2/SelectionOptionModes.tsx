import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RadioButton from '@src/components/native_components/RadioButton'; // Đường dẫn tới RadioButton component
import CustomText from '@src/components/native_components/CustomText'; // Đường dẫn tới CustomText component
import {SelectionMode, useCalendar} from '@src/contexts/CalendarProvider';

const SelectionModeOptions = () => {
  const {selectionMode, setSelectionMode} = useCalendar();

  const options: {value: SelectionMode; label: string}[] = [
    {value: 'single', label: 'Single Day'},
    {value: 'multiple', label: 'Multiple Days'},
    {value: 'range', label: 'Range'},
  ];

  return (
    <View style={styles.container}>
      <CustomText textWeight="medium" customStyle={styles.title}>
        Select Mode
      </CustomText>
      <RadioButton
        options={options}
        value={selectionMode}
        onChange={(value: SelectionMode) => setSelectionMode(value)}
        direction="vertical" // Hiển thị theo chiều dọc
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    // fontWeight: 'bold',
    // marginBottom: 16,
    color: '#1A1D1E',
  },
});

export default SelectionModeOptions;

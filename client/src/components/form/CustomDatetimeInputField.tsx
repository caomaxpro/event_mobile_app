import React, {useRef} from 'react';
import {
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import {CustomInputFieldCard} from './CustomInputFieldCard';
import CustomIcon from '../native_components/CustomIcon';
import CustomContainerComponent from '../native_components/ContainerComponent';
import {useReduxSelector} from '@src/hooks/useReduxSelector';
import {InputField} from '@src/types/types';

interface CustomDatetimeInputFieldProps {
  inputField: InputField;
  title?: string;
  placeholder?: string;
  showTitle?: boolean;
  mode?: 'date' | 'time' | 'datetime';
  minimumDate?: Date;
  maximumDate?: Date;
  scrollViewRef?: React.RefObject<ScrollView>;
}

export const CustomDatetimeInputField: React.FC<
  CustomDatetimeInputFieldProps
> = ({
  inputField,
  title,
  placeholder,
  showTitle = true,
  mode = 'datetime',
  minimumDate,
  maximumDate,
  scrollViewRef,
}) => {
  const {theme} = useReduxSelector();
  const inputRef = useRef<TextInput>(null);
  const [showPicker, setShowPicker] = React.useState(false);
  const [pickerMode, setPickerMode] = React.useState<'date' | 'time'>(
    mode === 'time' ? 'time' : 'date',
  );

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate =
      selectedDate || new Date(inputField.value || new Date());

    if (Platform.OS === 'android') {
      try {
        DateTimePickerAndroid.dismiss(pickerMode);
      } catch (error) {
        // Safely ignore dismiss errors
      }

      if (event.type === 'dismissed') {
        return;
      }

      if (mode === 'datetime' && pickerMode === 'date') {
        setPickerMode('time');
        showAndroidPicker('time', currentDate);
        return;
      }
    }

    if (selectedDate) {
      inputField.onChange(currentDate.toISOString());
    }

    if (Platform.OS === 'android') {
      setPickerMode('date');
    }
  };

  const showAndroidPicker = (currentMode: 'date' | 'time', value: Date) => {
    DateTimePickerAndroid.open({
      value,
      onChange: handleDateChange,
      mode: currentMode,
      is24Hour: true,
      minimumDate,
      maximumDate,
    });
  };

  const openPicker = () => {
    if (Platform.OS === 'android') {
      const currentDate = new Date(inputField.value || new Date());
      if (mode === 'datetime') {
        setPickerMode('date');
        showAndroidPicker('date', currentDate);
      } else {
        showAndroidPicker(mode as 'date' | 'time', currentDate);
      }
    } else {
      setShowPicker(true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (mode === 'time') {
      return date.toLocaleTimeString();
    } else if (mode === 'date') {
      return date.toLocaleDateString();
    }
    return date.toLocaleString();
  };

  return (
    <CustomInputFieldCard
      title={title}
      showTitle={showTitle}
      error={inputField.validate()}>
      <CustomContainerComponent
        customStyle={[styles.container, {borderColor: theme.inputBorder}]}>
        <CustomContainerComponent customStyle={styles.iconContainer}>
          <CustomIcon
            type="AntDesign"
            name={mode === 'time' ? 'clockcircleo' : 'calendar'}
            size={22}
            color={theme.inputBorder}
          />
        </CustomContainerComponent>

        <TouchableOpacity
          style={styles.inputContainer}
          onPress={openPicker}
          activeOpacity={0.7}>
          <TextInput
            ref={inputRef}
            style={[
              styles.inputStyle,
              {
                fontFamily: theme.fontFamily,
                color: theme.textInput,
              },
            ]}
            value={formatDate(inputField.value || new Date().toISOString())}
            placeholder={placeholder}
            placeholderTextColor={theme.placeHolder}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </CustomContainerComponent>

      {Platform.OS === 'ios' && showPicker && (
        <DateTimePicker
          value={new Date(inputField.value || new Date())}
          mode={pickerMode}
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </CustomInputFieldCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 12,
    height: 56,
    overflow: 'hidden',
  },
  iconContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  inputStyle: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
});

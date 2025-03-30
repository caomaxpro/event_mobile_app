import {
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import {ScreenComponent} from '@src/components/native_components/ScreenComponent';
import CustomText from '@src/components/native_components/CustomText';
import ArrowButton from '@src/components/button/ArrowButton';
import {useReduxForm} from '@src/hooks/useReduxForm';
import {FORM_IDS} from '@src/constants/formIds';
import * as validator from '@src/utils/validatorUtils';
import {CustomTextFieldComponent} from '@src/components/form/CustomTextFieldComponent';
import {createEvent} from '@src/services/eventService';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '@src/components/native_components/ButtonComponent';
import {CustomMediaInputField} from '@src/components/form/CustomMediaInputField';
import {CustomDatetimeInputField} from '@src/components/form/CustomDatetimeInputField';
import HeaderComponent from '@src/components/HeaderComponent';
import {useAppNavigation} from '@src/hooks/userAppNavigation';
import {CustomDropdownComponent} from '@src/components/form/CustomDropdownComponent';
import {CustomAddOnInputField} from '@src/components/form/CustomAddOnInputField';
import {CustomLocationInputField} from '@src/components/form/CustomLocationInputField';
import CustomRangeInputField from '@src/components/form/CustomRangeInputField';
// import CustomCalanderInputField from '@src/components/form/CustomCalanderInputField';
// import {KeyboardAvoidingView} from 'react-native';
// import {
//   KeyboardAvoidingView,
//   KeyboardAwareScrollView,
//   KeyboardStickyView,
// } from 'react-native-keyboard-controller';

import SnapVerticalCalender from '@src/components/vertical_calendar/SnapVerticalCalender';

const FilterEventModal = () => {
  //   const {tabNavigation} = useAppNavigation();
  const {registerField, handleSubmit} = useReduxForm(FORM_IDS.CREATE_EVENT);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [activeDateField, setActiveDateField] = React.useState<
    'startTime' | 'endTime' | null
  >(null);

  const locationField = registerField('location', {
    validator: (value: string) => {
      return validator.validateTextLength(value, 3, 150);
    },
  });

  const minPriceField = registerField('minPrice', {
    validator: (value: string) => {
      return validator.validateNumber(value, 0, Infinity);
    },
  });

  const maxPriceField = registerField('maxPrice', {
    validator: (value: string) => {
      return validator.validateNumber(
        value,
        parseInt(minPriceField.value),
        Infinity,
      );
    },
  });

  const startTimeField = registerField('start_time', {
    validator: (value: any) => validator.validateDate(new Date(value)),
    validatorArgs: [],
  });

  const endTimeField = registerField('end_time', {
    validator: (value: any) => {
      const startDate = new Date(String(startTimeField.value));
      return validator.validateEndDate(new Date(value), startDate);
    },
    validatorArgs: [],
  });

  const typeField = registerField('type', {
    validator: validator.validateTextLength,
    validatorArgs: [3, 50],
  });

  const imageField = registerField('image', {
    asyncValidator: (value: any) => validator.validateMediaRN(String(value)),
    validatorArgs: [],
  });

  const tagsField = registerField('tags', {
    validator: validator.validateTextLength,
    validatorArgs: [0, Infinity],
  });

  const handleDatePickerChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate && activeDateField) {
      const dateString = selectedDate.toISOString();
      if (activeDateField === 'startTime') {
        startTimeField.onChange(dateString);
      } else {
        endTimeField.onChange(dateString);
      }
    }
  };

  const showDatePickerFor = (field: 'startTime' | 'endTime') => {
    setActiveDateField(field);
    setShowDatePicker(true);
  };

  const onSubmit = async (formData: Record<string, string>) => {
    try {
      const eventData = {
        title: formData.title,
        description: formData.description,
        start_time: formData.start_time,
        end_time: formData.end_time,
        total_tickets: parseInt(formData.total_tickets),
        total_discount_tickets: parseInt(formData.total_discount_tickets),
        discounted_value: parseFloat(formData.discounted_value),
        price: parseFloat(formData.price),
        location: formData.location,
        type: formData.type,
        image: formData.image,
        tags: formData.tags,
        status: 'active' as const,
      };

      await createEvent(eventData);
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={{
          //   display: 'flex',
          //   position: 'absolute',
          //   top: 0,
          flex: 1,
          backgroundColor: 'transparent',
        }}>
        <ScreenComponent displayBackgroundImage={false}>
          <CustomText customStyle={styles.title}>Filter</CustomText>

          {/* <CustomRangeInputField
            title="Select price range"
            maxInputField={maxPriceField}
            minInputField={minPriceField}
          /> */}

          {/* <CustomCalanderInputField /> */}

          <ArrowButton
            label="CREATE EVENT"
            onPress={() => handleSubmit(onSubmit)}
          />
        </ScreenComponent>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 0,
  },
  title: {
    fontSize: 24,
    // fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dateButton: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 40,
  },
});

export default FilterEventModal;

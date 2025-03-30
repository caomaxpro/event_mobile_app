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
// import {KeyboardAvoidingView} from 'react-native';
// import {
//   KeyboardAvoidingView,
//   KeyboardAwareScrollView,
//   KeyboardStickyView,
// } from 'react-native-keyboard-controller';

interface CreateEventModalProps {
  navigation: any;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({navigation}) => {
  //   const {tabNavigation} = useAppNavigation();
  const {registerField, handleSubmit} = useReduxForm(FORM_IDS.CREATE_EVENT);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [activeDateField, setActiveDateField] = React.useState<
    'startTime' | 'endTime' | null
  >(null);

  const titleField = registerField('title', {
    validator: (value: string | string[]) => {
      const textValue = Array.isArray(value) ? value.join(', ') : value;
      return validator.validateTextLength(textValue, 3, 100);
    },
  });

  const descriptionField = registerField('description', {
    validator: (value: string | string[]) => {
      const textValue = Array.isArray(value) ? value.join(', ') : value;
      return validator.validateTextLength(textValue, 0, 1000);
    },
  });

  const locationField = registerField('location', {
    validator: (value: string | string[]) => {
      const textValue = Array.isArray(value) ? value.join(', ') : value;
      return validator.validateTextLength(textValue, 3, 150);
    },
  });

  const totalTicketsField = registerField('total_tickets', {
    validator: (value: string | string[]) => {
      if (Array.isArray(value)) {
        value = '0';
      }

      return validator.validateNumber(value, 0, Infinity);
    },
  });

  const discountedTicketsField = registerField('total_discount_tickets', {
    validator: (value: string | string[]) => {
      if (Array.isArray(value)) {
        value = '0';
      }

      return validator.validateNumber(value, 0, Infinity);
    },
  });

  const priceField = registerField('price', {
    validator: (value: string | string[]) => {
      if (Array.isArray(value)) {
        value = '0';
      }

      return validator.validateNumber(value, 0, Infinity);
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
          <CustomText customStyle={styles.title}>Create New Event</CustomText>

          {/* <CustomTextFieldComponent title="Title" inputField={titleField} /> */}

          {/* <CustomTextFieldComponent
            title="Description"
            multiline
            numberOfLines={4}
            inputField={descriptionField}
          /> */}

          {/* <CustomTextFieldComponent
            title="Location"
            inputField={locationField}
          /> */}

          {/* <CustomDatetimeInputField
            inputField={startTimeField}
            title="Start Time"
            mode="datetime"
            minimumDate={new Date()}
          /> */}

          {/* <CustomDatetimeInputField
            inputField={endTimeField}
            title="End Time"
            mode="datetime"
            minimumDate={new Date(startTimeField.value)}
          /> */}

          {/* <CustomTextFieldComponent
            title="Number of Tickets"
            inputField={totalTicketsField}
            keyboardType="numeric"
          /> */}

          {/* <CustomTextFieldComponent
          title="Discounted Tickets"
          inputField={discountedTicketsField}
          keyboardType="numeric"
        /> */}

          {/* <CustomTextFieldComponent
          title="Price"
          inputField={priceField}
          keyboardType="numeric"
        /> */}

          {/* <CustomDropdownComponent
          title="Type"
          items={[
            {label: 'AI', value: 'AI'},
            {label: 'Showcase', value: 'Showcase'},
            {label: 'Networking', value: 'Networking'},
          ]}
          inputField={typeField}
        /> */}

          {/* <CustomTextFieldComponent title="Event Type" inputField={typeField} /> */}
          {/* <CustomAddOnInputField title="Event Tags" inputField={tagsField} /> */}
          {/* <CustomLocationInputField
            title="Location"
            inputField={locationField}
          /> */}

          {/* <CustomRangeInputField maxInputField={} /> */}

          {/* <CustomTextFieldComponent title="Image URL" inputField={imageField} /> */}
          {/* <CustomMediaInputField title="Event Image" inputField={imageField} /> */}

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

export default CreateEventModal;

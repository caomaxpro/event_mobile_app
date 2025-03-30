import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenComponent} from '@src/components/native_components/ScreenComponent';
import {EventHubLogo} from '@src/assets/svg/EventHub';
import {OtherLoginOptionComponent} from '@src/components/auth_component/OtherLoginOption';
import ArrowButton from '@src/components/button/ArrowButton';
import {CustomEmailInputComponent} from '@src/components/form/EmailInputComponent';
import {PasswordInputComponent} from '@src/components/form/PasswordInputComponent';
import CustomButton from '@src/components/native_components/ButtonComponent';
import CustomContainerComponent from '@src/components/native_components/ContainerComponent';
import CustomText from '@src/components/native_components/CustomText';
import CustomToggle from '@src/components/native_components/CustomToggle';
import {FORM_IDS} from '@src/constants/formIds';
import {useReduxForm} from '@src/hooks/useReduxForm';
import {loginUser} from '@src/services/authService';
import {useDispatch} from 'react-redux';
import * as validator from '@src/utils/validatorUtils';
import CustomHorizontalScrollView from '@src/components/native_components/HorizontalScrollView';
import {CustomTextFieldComponent} from '@src/components/form/CustomTextFieldComponent';

const EventFormComponent = () => {
  const [isRememberUser, setRememberUser] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  //   const scrollViewRef = React.useRef<any>(null);

  const {registerField, handleSubmit} = useReduxForm(FORM_IDS.CREATE_EVENT);

  //   export type Event = {
  //     title: string;
  //     description?: string;
  //     creation_date: string;
  //     start_time: string;
  //     end_time: string;
  //     total_tickets: number;
  //     total_discount_tickets: number;
  //     discounted_value: number;
  //     price: number;
  //     price_after_tax: number;
  //     participants: Partial<User>[];
  //     organizer?: Partial<User>;
  //     status: 'active' | 'inactive';
  //     type: string;
  //     tags: string[];
  //     image: string;
  //     address: string;
  //   };

  const titleField = registerField('title', {
    validator: validator.validateTextLength,
    validatorArgs: [3, 100], // minLength, maxLength
  });

  const descriptionField = registerField('description', {
    validator: validator.validateTextLength,
    validatorArgs: [0, 100], // minLength, maxLength
  });

  const addressField = registerField('address', {
    validator: validator.validateTextLength,
    validatorArgs: [0, 150], // minLength, maxLength
  });

  const totalTicketsField = registerField('totalTickets', {
    validator: validator.validateNumber,
    validatorArgs: [0, Infinity], // minLength, maxLength
  });

  const discountedTicketsField = registerField('discountedTickets', {
    validator: validator.validateNumber,
    validatorArgs: [0, Infinity], // minLength, maxLength
  });

  const priceField = registerField('price', {
    validator: validator.validateNumber,
    validatorArgs: [0, Infinity], // minLength, maxLength
  });

  const startTimeField = registerField('startTime', {
    validator: (value: string) => validator.validateDate(new Date(value)),
    validatorArgs: [new Date()], // minLength, maxLength
  });

  const endTimeField = registerField('endTime', {
    validator: (value: string, startTimeField: any) =>
      validator.validateEndDate(
        new Date(value),
        new Date(startTimeField.value),
      ),
    validatorArgs: [startTimeField], // minLength, maxLength
  });

  const onSubmit = async (formData: Record<string, string>) => {
    try {
      await loginUser({
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <ScreenComponent displayBackgroundImage={false}>
      {/* <CustomContainerComponent customStyle={{marginBottom: 50}}>
        <EventHubLogo />
      </CustomContainerComponent> */}

      <CustomText
        textWeight="medium"
        customStyle={{
          fontSize: 24,
          paddingLeft: 1,
          width: 317,
          marginBottom: 20,
        }}>
        Sign in
      </CustomText>

      {/* <CustomHorizontalScrollView
        scrollViewRef={scrollViewRef}
        style={{width: 317, borderWidth: 2, padding: 0}}
        containerStyle={{
          width: 'auto',
          minHeight: 100,
          maxHeight: 300,
          //   borderWidth: 2,
          backgroundColor: 'red',
          padding: 0,
        }}
        scrollEnabled={false}>
        
      </CustomHorizontalScrollView> */}

      <CustomTextFieldComponent title="Title" inputField={titleField} />
      <CustomTextFieldComponent
        title="Description"
        inputField={descriptionField}
      />
      <CustomTextFieldComponent title="Address" inputField={addressField} />
      <CustomTextFieldComponent
        title="Number of Tickets"
        keyboardType="numeric"
        inputField={totalTicketsField}
      />
      <CustomTextFieldComponent
        title="Number of Discounted Tickets"
        keyboardType="numeric"
        inputField={discountedTicketsField}
      />
      <CustomTextFieldComponent
        title="Ticket Price"
        keyboardType="numeric"
        inputField={discountedTicketsField}
      />

      {/* <CustomEmailInputComponent inputField={emailField} />
      <PasswordInputComponent inputField={passwordField} />
      <PasswordInputComponent inputField={passwordField} />
      <PasswordInputComponent inputField={passwordField} /> */}

      {/* <CustomContainerComponent
        customStyle={{width: 317}}
        contentStyle={{justifyContent: 'space-between'}}>
        <CustomToggle
          value={isRememberUser}
          setValue={setRememberUser}
          sideMessage="Remember Me"
        />

        <CustomButton
          customStyle={{
            width: 'auto',
            height: 'auto',
            padding: 0,
            backgroundColor: 'transparent',
          }}>
          <CustomText customStyle={{fontSize: 14}}>Forgot Password?</CustomText>
        </CustomButton>
      </CustomContainerComponent> */}

      <ArrowButton label="SIGN IN" onPress={() => handleSubmit(onSubmit)} />

      {/* <OtherLoginOptionComponent /> */}
    </ScreenComponent>
  );
};

export default EventFormComponent;

const styles = StyleSheet.create({});

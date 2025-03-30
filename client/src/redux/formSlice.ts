import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FORM_IDS} from '@src/constants/formIds';

export interface FormField {
  value: string;
  touched: boolean;
}

export interface FormState {
  [formId: string]: {
    [fieldName: string]: FormField;
  };
}

// Define initial state for each form

const verifyEmailFormInitialState = {
  email: {value: '', touched: false},
};

const resetPasswordFormInitialState = {
  password: {value: '', touched: false},
  confirmPassword: {value: '', touched: false},
};

const loginFormInitialState = {
  email: {value: '', touched: false},
  password: {value: '', touched: false},
};

const registerFormInitialState = {
  username: {value: '', touched: false},
  email: {value: '', touched: false},
  password: {value: '', touched: false},
  confirmPassword: {value: '', touched: false},
};

const filterFormInitialState = {
  type: {value: '', touched: false},
  startDate: {value: '', touched: false},
  endDate: {value: '', touched: false},
  location: {value: '', touched: false},
  minPrice: {value: '', touched: false},
  maxPrice: {value: '', touched: false},
};

const createEventFormInitialState = {
  title: {value: '', touched: false},
  description: {value: '', touched: false},
  startDate: {value: '', touched: false},
  endDate: {value: '', touched: false},
  totalTickets: {value: '', touched: false},
  price: {value: '', touched: false},
  location: {value: '', touched: false},
  image: {value: '', touched: false},
  type: {value: '', touched: false},
  tags: {value: '', touched: false},
};

const editProfileFormInitialState = {
  username: {value: '', touched: false},
  bio: {value: '', touched: false},
  phoneNumber: {value: '', touched: false},
  location: {value: '', touched: false},
};

const initialState: FormState = {
  [FORM_IDS.LOGIN]: loginFormInitialState,
  [FORM_IDS.REGISTER]: registerFormInitialState,
  [FORM_IDS.FILTER]: filterFormInitialState,
  [FORM_IDS.CREATE_EVENT]: createEventFormInitialState,
  [FORM_IDS.EDIT_PROFILE]: editProfileFormInitialState,
  [FORM_IDS.VERIFY_EMAIL]: verifyEmailFormInitialState,
  [FORM_IDS.RESET_PASSWORD]: resetPasswordFormInitialState,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setField: (
      state,
      action: PayloadAction<{
        formId: string;
        field: string;
        value: string;
      }>,
    ) => {
      const {formId, field, value} = action.payload;
      if (!state[formId]) {
        state[formId] = {};
      }
      state[formId][field] = {
        value,
        touched: true,
      };
    },
    resetForm: (state, action: PayloadAction<string>) => {
      const formId = action.payload;
      state[formId] = initialState[formId];
    },
  },
});

export const {setField, resetForm} = formSlice.actions;

export const formReducer = formSlice.reducer;

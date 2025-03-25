// features/auth/authSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fontFamilies} from '@src/constants/fontSetting';

interface ThemeState {
  bgImage: number;
  fontFamily: string;
  background: string;
  textOnBG: string;
  container: string;
  textOnContainer: string;
  itemCardBG: string;
  itemCardHoverBG: string;
  placeHolder: string;
  button: string;
  inputBorder: string;
  textInput: string;
  textInputBG: string;
  primary: string;
  primary50: string;
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary700: string;
  primary800: string;
  primary900: string;
}

const initialState: ThemeState = {
  bgImage: require('@src/assets/images/splash_screen.png'),
  fontFamily: fontFamilies.medium,
  background: '#FEFEFF',
  textOnBG: 'rgba(18, 13, 38, 1)',
  container: 'rgba(129, 129, 129, 1)',
  textOnContainer: 'rgba(255, 255, 255, 1)',
  itemCardBG: 'rgba(129, 129, 129, 1)',
  itemCardHoverBG: 'rgba(129, 129, 129, 1)',
  placeHolder: 'rgba(128, 122, 122, 1)',
  button: 'rgba(86, 105, 255, 0.87)',
  inputBorder: 'rgb(172, 170, 170)',
  textInput: 'rgba(27, 27, 27, 1)',
  textInputBG: 'rgba(129, 129, 129, 1)',
  // Primary color and its variations
  primary: '#5669FF',
  primary50: '#EEF0FF',
  primary100: '#D6DBFF',
  primary200: '#B3BCFF',
  primary300: '#8F9DFF',
  primary400: '#6C7EFF',
  primary500: '#5669FF',
  primary600: '#3D4FE6',
  primary700: '#2436CC',
  primary800: '#0B1DB3',
  primary900: '#000499',
};

const themeSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<{theme: Partial<ThemeState>}>) {
      return {...state, ...action.payload.theme};
    },
  },
});

export const {setTheme} = themeSlice.actions;

const themeReducer = themeSlice.reducer;

export default themeReducer;

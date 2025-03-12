// features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
    bgImage: number;
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
}


const initialState: ThemeState = {
   bgImage: require('@src/assets/images/splash_screen.png'),
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
};

const themeSlice = createSlice({
  name: 'setting', 
  initialState, 
  reducers: {
    // Action để đăng nhập thành công
    setTheme(state, action: PayloadAction<{theme: Partial<ThemeState>}>) {
        return {...state, ...action.payload.theme}
    },
  },
});

// Export các actions tự động tạo bởi createSlice
export const { setTheme } = themeSlice.actions;

const authReducer = themeSlice.reducer

// Export reducer để đưa vào store
export default authReducer;
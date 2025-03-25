// features/auth/authSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  userId: string;
  jwt: string;
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  userId: '',
  jwt: '',
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth', // Tên của slice
  initialState, // Giá trị khởi tạo
  reducers: {
    // Action để đăng nhập thành công
    setAuth(state, action: PayloadAction<{auth: Partial<AuthState>}>) {
      return {...state, ...action.payload.auth};
    },

    clearAuth() {
      return {...initialState};
    },

    setJwt(state, action: PayloadAction<{jwt: string}>) {
      state.jwt = action.payload.jwt;
    },
  },
});

// Export các actions tự động tạo bởi createSlice
export const {setAuth, clearAuth, setJwt} = authSlice.actions;

const authReducer = authSlice.reducer;

// Export reducer để đưa vào store
export default authReducer;

// features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: any;
  jwtToken: string | null;
  passcode: string;
  passcodeExpiration: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  jwtToken: null,
  passcode: '0000',
  passcodeExpiration: new Date().toISOString(),
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth', // Tên của slice
  initialState, // Giá trị khởi tạo
  reducers: {
    // Action để đăng nhập thành công
    loginUser(state, action: PayloadAction<{jwtToken: string }>) {
      state.jwtToken = action.payload.jwtToken;
      state.isAuthenticated = true;
    },
    // Action để đăng xuất
    logoutUser(state) {
      state.user = null;
      state.jwtToken = null;
      state.isAuthenticated = false;
    },
    setPasscode(state, action: PayloadAction<{passcode: string}>) {
        state.passcode = action.payload.passcode
    }
  },
});

// Export các actions tự động tạo bởi createSlice
export const { loginUser, logoutUser } = authSlice.actions;

const authReducer = authSlice.reducer

// Export reducer để đưa vào store
export default authReducer;
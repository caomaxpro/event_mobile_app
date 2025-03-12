// features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
  isDrawerOpened: boolean;
  isDetailsShowed: boolean;
}

const initialState: AppState = {
    isDetailsShowed: false,
    isDrawerOpened: false,
};

const appSlice = createSlice({
  name: 'app', 
  initialState, 
  reducers: {
    setDrawerOpened(state, action: PayloadAction<{status: boolean }>) {
      state.isDrawerOpened = action.payload.status;
    },

    setDetailsShowed(state, action: PayloadAction<{status: boolean }>) {
      state.isDetailsShowed = action.payload.status
    },
  },
});

// Export các actions tự động tạo bởi createSlice
export const { setDrawerOpened, setDetailsShowed } = appSlice.actions;

const appReducer = appSlice.reducer

// Export reducer để đưa vào store
export default appReducer;
// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './authSlice';
import appReducer from './appSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    app: appReducer,
  },
});

// Export các kiểu dữ liệu để sử dụng trong ứng dụng
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
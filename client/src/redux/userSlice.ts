// features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@src/types/types';

type OmitMultiple<T, K extends keyof T> = Omit<T, K>;

type UserWithStringDate = OmitMultiple<User, 'join_date' | 'last_login'> & {
  join_date: string;
  last_login: string;
};

// Define the initial state based on the User interface
const initialState: UserWithStringDate = {
  username: '',
  email: '',
  profile_picture: '',
  role: 'user',
  bio: '',
  phone_number: '',
  location: '',
  social_links: {
    facebook: '',
    github: '',
  },
  events_created: [],
  events_joined: [],
  join_date: new Date().toISOString(),
  last_login: new Date().toISOString(),
  account_status: 'inactive',
  is_verified: false,
  subscription_plan: 'free',
  payment_history: [],
};

// Create a slice using createSlice
const userSlice = createSlice({
  name: 'user', // Tên của slice
  initialState, // Giá trị khởi tạo
  reducers: {
    setUserInfo(state, action: PayloadAction<{user: Partial<UserWithStringDate>}>) {
      return { ...state, ...action.payload.user };
    },

    updateUserInfo(state, action: PayloadAction<{user: Partial<UserWithStringDate>}>) {
      return { ...state, ...action.payload.user };
    },
 
    changeAccountStatus(state, action: PayloadAction<{status: "inactive" | "active"}>) {
      state.account_status = action.payload.status;
    },

    verifyUser(state, action: PayloadAction<{status: boolean}>) {
      state.is_verified = action.payload.status;
    },
 
    upgradeSubscription(state, action: PayloadAction<{plan: "free" | "premium"}>) {
      state.subscription_plan = action.payload.plan;
    },

    addPaymentHistory(state, action: PayloadAction<any>) {
      state.payment_history.push(action.payload);
    },
  },
});

// Export các actions tự động tạo bởi createSlice
export const {
  updateUserInfo,
  changeAccountStatus,
  verifyUser,
  upgradeSubscription,
  addPaymentHistory,
} = userSlice.actions;

const userReducer = userSlice.reducer
// Export reducer để đưa vào store
export default userReducer;
// features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '@src/types/types';

const initialState: Partial<Event> = {
  title: '',
  description: '',
  creation_date: new Date().toISOString(),
  start_time: new Date().toISOString(),
  end_time: new Date().toISOString(),
  total_tickets: 0,
  total_discount_tickets: 0,
  discounted_value: 0.05,
  price: 0,
  price_after_tax: 0,
  participants: [],
  organizer: undefined,
  status: 'active',
  type: '',
  tags: [''],
  image: '',
  address: ''
};

const eventSlice = createSlice({
  name: 'event', // Tên của slice
  initialState, // Giá trị khởi tạo
  reducers: {
    
    setEvent(state, action: PayloadAction<{event: Partial<Event> }>) {
        return {...state, ...action.payload.event}
    },
 
    clearEvent() {
        return {...initialState}
    },
  },
});

// Export các actions tự động tạo bởi createSlice
export const { setEvent, clearEvent } = eventSlice.actions;

const eventReducer = eventSlice.reducer

// Export reducer để đưa vào store
export default eventReducer;
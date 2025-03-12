import { OPEN_DRAWER, DISPLAY_EVENT } from './animationTypes';

// Định nghĩa kiểu cho các actions
interface OpenDrawer {
  type: typeof OPEN_DRAWER;
  payload: boolean;
}

interface DisplayEvent {
  type: typeof DISPLAY_EVENT;
  payload: boolean;
}

// LOGIN action
export const openDrawer = (status: boolean): OpenDrawer => ({
  type: OPEN_DRAWER,
  payload: status,
});

// LOGOUT action
export const displayEvent = (status: boolean): DisplayEvent => ({
  type: DISPLAY_EVENT,
  payload: status,
});

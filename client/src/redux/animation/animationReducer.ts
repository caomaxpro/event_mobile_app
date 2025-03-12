// authReducer.js
import { OPEN_DRAWER, DISPLAY_EVENT } from './animationTypes';

const initialState = {
  isDrawerOpened: false,
  isEventDisplayed: false,
};

type ActionProp = {
    type: string;
    payload: any;
}

const animationReducer = (state = initialState, action: ActionProp) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        isDrawerOpened: action.payload
      };

    case DISPLAY_EVENT:
      return {...state, isEventDisplayed: action.payload};

    default:
      return state;
  }
};

export default animationReducer;

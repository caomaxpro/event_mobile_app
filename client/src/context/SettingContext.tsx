import EncryptedStorage from 'react-native-encrypted-storage';
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react';
import {AppState, Dimensions} from 'react-native';
import {fontFamilies} from '@src/constants/fontSetting';
import {restoreState, saveState} from '@src/utils/storageUtils';

// Device dimensions
export const DEVICE_WIDTH = Dimensions.get('window').width;

// Item dimensions
export const ITEM_HEIGHT = 50;
export const ITEM_MARGIN = 20;

interface UserState {
  username: string;
  email: string;
  profile_picture: string;
  role: string;
  account_status: string;
  is_verified: boolean;
  subscription_plan: string;
  join_date: Date;
  onboarding_view: boolean;
}

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

interface TextState {
  fontFamily: string;
}

interface JWTokenState {
  jwt?: string;
  passcode?: string;
  passcodeExpiredAt?: number;
}

export interface SettingState {
  user: UserState;
  theme: ThemeState;
  text: TextState;
  token: JWTokenState;
}

export const initialState: SettingState = {
  user: {
    username: '',
    email: '',
    profile_picture: '',
    role: '',
    account_status: '',
    is_verified: false,
    subscription_plan: '',
    join_date: new Date(),
    onboarding_view: false,
  },
  theme: {
    bgImage: require('@src/assets/images/splash_screen.png'),
    background: 'rgba(230, 230, 230, 1)',
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
  },
  text: {
    fontFamily: fontFamilies.medium,
  },
  token: {
    jwt: '',
    passcode: '0000',
    passcodeExpiredAt: Infinity,
  },
};

const SettingContext = createContext<{
  state: SettingState;
  setState: React.Dispatch<React.SetStateAction<SettingState>>;
  saveStateAfterAction?: () => Promise<void>;
}>({
  state: initialState,
  setState: () => {},
  saveStateAfterAction: async () => {},
});

// Hàm lưu trạng thái vào EncryptedStorage

export const useSettingContext = () => useContext(SettingContext);

interface SettingProviderProps {
  children: ReactNode;
}

export const SettingProvider = ({children}: SettingProviderProps) => {
  const [state, setState] = useState<SettingState>(initialState);
  const hasLoadedState = useRef(false);

  // detect changes from state => and log info
  useEffect(() => {
    console.log(state);
  }, [state]);

  // Hàm khôi phục trạng thái khi ứng dụng mở
  useEffect(() => {
    console.log('Update General States');

    restoreState(setState, hasLoadedState);

    const appStateListener = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (nextAppState === 'background' || nextAppState === 'inactive') {
          console.log('Saving state before background...');
          await saveState(state);
        }
      },
    );

    return () => {
      console.log('Run before closing the app!');
      appStateListener.remove();
    };
  }, []);

  const saveStateAfterAction = async () => {
    console.log('[Setting Context]', state);

    await saveState(state);
  };

  const value = {state, setState, saveStateAfterAction};

  return (
    <SettingContext.Provider value={value}>{children}</SettingContext.Provider>
  );
};

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react';
import {StyleSheet, Dimensions, ImageSourcePropType} from 'react-native';

import {fontFamilies} from '@src/constants/fontSetting';

import {AppState} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Device dimensions
export const DEVICE_WIDTH = Dimensions.get('window').width;

// Item dimensions
export const ITEM_HEIGHT = 50;
export const ITEM_MARGIN = 20;

// Khởi tạo trạng thái ban đầu với type định nghĩa
interface TimerState {
  start: boolean;
  current: string;
  pomodoro: string;
  short_break: string;
  long_break: string;
  auto_start_break: boolean;
  auto_start_pomos: boolean;
  auto_start_long_break: boolean;
  interval: number;
  remaining_interval: number;
  notification_sound: string | null;
  time: number;
  remaining_time: number;
  total_tasks: number;
  remaining_tasks: number;
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

interface TaskState {
  auto_check_task: boolean;
  auto_switch_task: boolean;
}

interface SoundState {
  alarm_sound: string | null;
  repeat: number;
  background_music: string | null;
  play_background_music: boolean;
}

interface TextState {
  fontFamily: string;
}

interface SettingState {
  timer: TimerState;
  task: TaskState;
  sound: SoundState;
  theme: ThemeState;
  text: TextState;
}

const initialState: SettingState = {
  timer: {
    start: false,
    current: 'pomodoro',
    pomodoro: '00:00:30',
    short_break: '00:00:05',
    long_break: '00:00:10',
    auto_start_break: true,
    auto_start_pomos: true,
    auto_start_long_break: true,
    interval: 2,
    remaining_interval: 2,
    notification_sound: null,
    time: 0,
    remaining_time: 0,
    total_tasks: 5,
    remaining_tasks: 5,
  },
  task: {
    auto_check_task: true,
    auto_switch_task: true,
  },
  sound: {
    alarm_sound: null,
    repeat: 1,
    background_music: null,
    play_background_music: false,
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
};

// Tạo Context
const SettingContext = createContext<{
  state: SettingState;
  setState: React.Dispatch<React.SetStateAction<SettingState>>;
}>({
  state: initialState,
  setState: () => {},
});

// Hàm lưu trạng thái vào AsyncStorage
const saveState = async (state: SettingState) => {
  try {
    await AsyncStorage.setItem('appState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

// Hàm tải trạng thái từ AsyncStorage
const loadState = async (): Promise<SettingState> => {
  console.error('Loading States');

  try {
    const savedState = await AsyncStorage.getItem('appState');
    return savedState ? JSON.parse(savedState) : initialState;
  } catch (error) {
    console.error('Error loading state:', error);
    return initialState;
  }
};

const restoreState = async (
  setState: React.Dispatch<React.SetStateAction<SettingState>>,
  hasLoadedState: React.MutableRefObject<boolean>,
) => {
  try {
    const savedState = await AsyncStorage.getItem('appState');
    if (savedState) {
      console.log('Loaded state:', JSON.parse(savedState));
      setState(JSON.parse(savedState));
    }
    hasLoadedState.current = true;
  } catch (error) {
    console.error('Error loading state:', error);
  }
};

// Custom hook để sử dụng Context
export const useSettingContext = () => useContext(SettingContext);

// SettingProvider để cung cấp context cho các component con
interface SettingProviderProps {
  children: ReactNode;
}

export const SettingProvider = ({children}: SettingProviderProps) => {
  const [state, setState] = useState<SettingState>(initialState);
  const hasLoadedState = useRef(false);

  // Hàm khôi phục trạng thái khi ứng dụng mở
  useEffect(() => {
    console.log('Update General States');

    restoreState(setState, hasLoadedState);

    const appStateListener = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (nextAppState === 'background' || nextAppState === 'inactive') {
          console.log('Saving state before background...');
          await AsyncStorage.setItem('appState', JSON.stringify(state));
        }
      },
    );

    return () => {
      console.log('Run before closing the app!');
      appStateListener.remove();
    };
  }, []);

  const value = {state, setState};

  return (
    <SettingContext.Provider value={value}>{children}</SettingContext.Provider>
  );
};

// import React from "react";
// import EncryptedStorage from "react-native-encrypted-storage";
// import { SettingState } from "@src/context/SettingContext";
// import { initialState } from "@src/context/SettingContext";

// // Hàm lưu trạng thái vào EncryptedStorage
// export const saveState = async (state: SettingState) => {
//   try {
//     await EncryptedStorage.setItem('appState', JSON.stringify(state));
//   } catch (error) {
//     console.error('Error saving state:', error);
//   }
// };

// // Hàm tải trạng thái từ EncryptedStorage
//   try {
//     const savedState = await EncryptedStorage.getItem('appState');
//     return savedState ? JSON.parse(savedState) : initialState;
//   } catch (error) {
//     console.error('Error loading state:', error);
//     return initialState;
//   }
// };

// // Hàm khôi phục trạng thái
// export const restoreState = async (
//   setState: React.Dispatch<React.SetStateAction<SettingState>>,
//   hasLoadedState: React.MutableRefObject<boolean>,
// ) => {
//   try {
//     if (savedState) {
//       console.log('Loaded state:', savedState);
//       setState(savedState);
//     }
//     hasLoadedState.current = true;
//   } catch (error) {
//     console.error('Error loading state:', error);
//   }
// };

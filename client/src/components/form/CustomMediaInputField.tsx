import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Platform,
  ScrollView,
  PermissionsAndroid,
  Modal,
  TouchableOpacity,
  Dimensions,
  ActionSheetIOS,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {CustomInputFieldCard} from './CustomInputFieldCard';
import CustomIcon from '../native_components/CustomIcon';
import CustomButton from '../native_components/ButtonComponent';
import CustomContainerComponent from '../native_components/ContainerComponent';
import {useReduxSelector} from '@src/hooks/useReduxSelector';
import {InputField} from '@src/types/types';
import CustomText from '../native_components/CustomText';

// Add screen dimensions
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

type CustomMediaInputFieldProps = {
  inputField: InputField;
  title?: string;
  showTitle?: boolean;
  scrollViewRef?: React.RefObject<ScrollView>;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
};

export const CustomMediaInputField: React.FC<CustomMediaInputFieldProps> = ({
  inputField,
  title = 'Media',
  showTitle = true,
  scrollViewRef,
  maxWidth = 400,
  maxHeight = 400,
  quality = 100,
}) => {
  const {theme} = useReduxSelector();
  const timeout = useRef<NodeJS.Timeout>();
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  const requestStoragePermission = async () => {
    if (Platform.OS !== 'android') return true;

    if (Platform.Version >= 33) {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ];

      const results = await PermissionsAndroid.requestMultiple(permissions);
      return Object.values(results).every(
        result => result === PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ];

      const results = await PermissionsAndroid.requestMultiple(permissions);
      return Object.values(results).every(
        result => result === PermissionsAndroid.RESULTS.GRANTED,
      );
    }
  };

  const handleImageResponse = (response: ImagePicker.ImagePickerResponse) => {
    if (response.didCancel || response.errorCode) {
      return;
    }

    if (response.assets && response.assets[0]?.uri) {
      ImageResizer.createResizedImage(
        response.assets[0].uri,
        1200,
        1200,
        'JPEG',
        90,
      )
        .then(resizedImage => {
          inputField.onChange(resizedImage.uri);
        })
        .catch(err => {
          console.error('Resize error:', err);
        });
    }
  };

  const takePhoto = async () => {
    try {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        console.log('Camera permission denied');
        return;
      }

      const options: ImagePicker.CameraOptions = {
        mediaType: 'photo',
        quality: 0.9,
        maxWidth: 2400,
        maxHeight: 2400,
        saveToPhotos: true,
      };

      ImagePicker.launchCamera(options, handleImageResponse);
    } catch (err) {
      console.warn(err);
    }
  };

  const selectFromGallery = async () => {
    try {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        console.log('Storage permission denied');
        return;
      }

      const options: ImagePicker.ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 0.9,
        maxWidth: 2400,
        maxHeight: 2400,
      };

      ImagePicker.launchImageLibrary(options, handleImageResponse);
    } catch (err) {
      console.warn(err);
    }
  };

  const showImageSourceOptions = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            takePhoto();
          } else if (buttonIndex === 2) {
            selectFromGallery();
          }
        },
      );
    } else {
      // For Android, we'll show both options in the UI
      takePhoto();
    }
  };

  const ImagePreviewModal = () => (
    <Modal
      visible={showPreview}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowPreview(false)}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.modalCloseButton}
          onPress={() => setShowPreview(false)}>
          <CustomIcon
            type="MaterialIcons"
            name="close"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <Image
          source={{uri: inputField.value}}
          style={styles.modalImage}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );

  return (
    <>
      <CustomInputFieldCard
        title={title}
        showTitle={showTitle}
        error={inputField.validate()}>
        <CustomContainerComponent
          customStyle={[styles.container, {borderColor: theme.inputBorder}]}>
          {inputField.value ? (
            <>
              <TouchableOpacity
                style={styles.previewContainer}
                onPress={() => setShowPreview(true)}>
                <Image
                  source={{uri: inputField.value}}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
                <View style={styles.previewOverlay}>
                  <CustomIcon
                    type="MaterialIcons"
                    name="zoom-in"
                    size={24}
                    color="#FFFFFF"
                  />
                  <CustomText customStyle={styles.previewText}>
                    Tap to preview
                  </CustomText>
                </View>
              </TouchableOpacity>
              <CustomButton
                onPress={() => inputField.onChange('')}
                customStyle={styles.removeButton}>
                <CustomIcon
                  type="MaterialIcons"
                  name="close"
                  size={20}
                  color={theme.textOnContainer}
                />
              </CustomButton>
            </>
          ) : (
            <View style={styles.buttonContainer}>
              <CustomButton
                onPress={
                  Platform.OS === 'ios' ? showImageSourceOptions : takePhoto
                }
                customStyle={styles.mediaButton}>
                <CustomIcon
                  type="MaterialIcons"
                  name="camera-alt"
                  size={30}
                  color={theme.placeHolder}
                />
                <CustomText
                  customStyle={[styles.uploadText, {color: theme.placeHolder}]}>
                  Take Photo
                </CustomText>
              </CustomButton>

              {Platform.OS === 'android' && (
                <CustomButton
                  onPress={selectFromGallery}
                  customStyle={styles.mediaButton}>
                  <CustomIcon
                    type="MaterialIcons"
                    name="photo-library"
                    size={30}
                    color={theme.placeHolder}
                  />
                  <CustomText
                    customStyle={[
                      styles.uploadText,
                      {color: theme.placeHolder},
                    ]}>
                    Gallery
                  </CustomText>
                </CustomButton>
              )}
            </View>
          )}
        </CustomContainerComponent>
      </CustomInputFieldCard>
      <ImagePreviewModal />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    width: '100%',
    minHeight: 60,
    maxHeight: 200,
    // borderWidth: 2,
    borderRadius: 12,
    overflow: 'hidden',
    // backgroundColor: 'blue',
  },
  buttonContainer: {
    width: '100%',
    overflow: 'hidden',
    flexDirection: Platform.OS === 'android' ? 'row' : 'column',
    justifyContent: 'space-between',
    // elevation: 1,
    // alignItems: 'center',
    // borderWidth: 2,
  },
  mediaButton: {
    // flex: Platform.OS === 'android' ? 1 : 0,
    // height: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: 60,
    width: 150,
    // borderWidth: 2,
    borderRadius: 12,
    // elevation: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  uploadText: {
    // marginTop: 10,
    marginLeft: 5,
    fontSize: 14,
    // borderWidth: 1,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    width: '100%',
    height: '100%',
  },
  previewOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    color: '#FFFFFF',
    marginTop: 8,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: screenWidth,
    height: screenHeight * 0.8,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
});

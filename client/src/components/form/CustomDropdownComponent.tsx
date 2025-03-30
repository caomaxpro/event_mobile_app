import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  Modal,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {CustomInputFieldCard} from './CustomInputFieldCard';
import CustomIcon from '../native_components/CustomIcon';
import CustomContainerComponent from '../native_components/ContainerComponent';
import CustomText from '../native_components/CustomText';
import {useReduxSelector} from '@src/hooks/useReduxSelector';
import {InputField} from '@src/types/types';
import {SvgProps} from 'react-native-svg';
import {CustomTextFieldComponent} from './CustomTextFieldComponent';
import {Keyboard} from 'react-native';

export interface DropdownItem {
  label: string;
  value: string;
}

interface CustomDropdownComponentProps {
  inputField: InputField;
  items: DropdownItem[];
  title?: string;
  placeholder?: string;
  showTitle?: boolean;
  iconName?: string;
  iconType?: any;
  SvgIcon?: React.FC<SvgProps>;
  scrollViewRef?: React.RefObject<ScrollView>;
}

export const CustomDropdownComponent: React.FC<
  CustomDropdownComponentProps
> = ({
  inputField,
  items,
  title,
  placeholder = 'Select or enter an option',
  showTitle = true,
  iconName = 'caretdown',
  iconType = 'AntDesign',
  SvgIcon,
  scrollViewRef,
}) => {
  const {theme} = useReduxSelector();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [customValue, setCustomValue] = useState<string>('');
  const timeout = useRef<NodeJS.Timeout>();

  const selectedItem = items.find(item => item.value === inputField.value);
  const isCustomValue = inputField.value && !selectedItem;

  const handleCustomValueSubmit = () => {
    if (customValue.trim()) {
      inputField.onChange(customValue.trim());
      setIsOpen(false);
      Keyboard.dismiss();
    }
  };

  // Set default value to first item if no value is selected and items exist
  useEffect(() => {
    if (!inputField.value && items.length > 0) {
      inputField.onChange(items[0].value);
    }
  }, [items]);

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  const renderIcon = () => {
    if (SvgIcon) {
      return <SvgIcon width={22} height={22} fill={theme.inputBorder} />;
    }

    if (iconName) {
      return (
        <CustomIcon
          type={iconType}
          name={iconName}
          size={16}
          color={theme.inputBorder}
        />
      );
    }

    return null;
  };

  const renderItem = ({item}: {item: DropdownItem}) => (
    <TouchableOpacity
      style={[
        styles.dropdownItem,
        {
          backgroundColor:
            item.value === inputField.value
              ? theme.primary + '20'
              : 'transparent',
        },
      ]}
      onPress={() => {
        inputField.onChange(item.value);
        setCustomValue('');
        setIsOpen(false);
      }}>
      <CustomText
        customStyle={[
          styles.dropdownItemText,
          {
            color:
              item.value === inputField.value ? theme.primary : theme.textOnBG,
            fontFamily: theme.fontFamily,
          },
        ]}>
        {item.label}
      </CustomText>
      {item.value === inputField.value && (
        <CustomIcon
          type="MaterialIcons"
          name="check"
          size={20}
          color={theme.primary}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <CustomInputFieldCard
        title={title}
        showTitle={showTitle}
        error={inputField.validate()}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setIsOpen(true)}>
          <CustomContainerComponent
            customStyle={[
              styles.container,
              {
                borderColor: theme.inputBorder,
              },
            ]}>
            {(SvgIcon || iconName) && (
              <CustomContainerComponent customStyle={styles.iconContainer}>
                {renderIcon()}
              </CustomContainerComponent>
            )}

            <CustomText
              customStyle={[
                styles.selectedText,
                {
                  color: inputField.value ? theme.textInput : theme.placeHolder,
                  fontFamily: theme.fontFamily,
                },
              ]}>
              {selectedItem
                ? selectedItem.label
                : inputField.value || placeholder}
            </CustomText>

            <CustomIcon
              type="MaterialIcons"
              name="arrow-drop-down"
              size={24}
              color={theme.inputBorder}
            />
          </CustomContainerComponent>
        </TouchableOpacity>
      </CustomInputFieldCard>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}>
          <View
            style={[
              styles.dropdownContainer,
              {
                backgroundColor: theme.background,
                borderColor: theme.inputBorder,
              },
            ]}>
            <KeyboardAvoidingView>
              <View style={styles.customInputContainer}>
                <TextInput
                  style={[
                    styles.customInput,
                    {
                      color: theme.textInput,
                      borderColor: theme.inputBorder,
                      fontFamily: theme.fontFamily,
                    },
                  ]}
                  value={customValue}
                  onChangeText={setCustomValue}
                  placeholder="Enter custom option"
                  placeholderTextColor={theme.placeHolder}
                  returnKeyType="done"
                  // blurOnSubmit={true}
                  onSubmitEditing={handleCustomValueSubmit}
                />

                <TouchableOpacity
                  style={[
                    styles.useCustomButton,
                    {backgroundColor: theme.primary},
                  ]}
                  onPress={e => {
                    e.stopPropagation();
                    console.log('[CustomDropdownComponent]', customValue);
                    handleCustomValueSubmit();
                  }}>
                  <CustomText
                    customStyle={[
                      styles.useCustomButtonText,
                      {color: theme.textOnContainer},
                    ]}>
                    Use
                  </CustomText>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>

            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={item => item.value}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View
                  style={[
                    styles.separator,
                    {backgroundColor: theme.inputBorder},
                  ]}
                />
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderRadius: 12,
    height: 56,
    overflow: 'hidden',
    paddingRight: 12,
  },
  iconContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dropdownContainer: {
    width: '100%',
    maxHeight: 300,
    borderRadius: 12,
    borderWidth: 2,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  dropdownItemText: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    opacity: 0.2,
  },
  customInputContainer: {
    padding: 15,
    flexDirection: 'row',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  customInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  useCustomButton: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  useCustomButtonText: {
    fontSize: 14,
  },
});

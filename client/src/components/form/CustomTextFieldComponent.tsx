import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  findNodeHandle,
  Platform,
  ScrollView,
  TextInputProps,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  runOnJS,
} from 'react-native-reanimated';
import {CustomInputFieldCard} from './CustomInputFieldCard';
import CustomIcon from '../native_components/CustomIcon';
import CustomContainerComponent from '../native_components/ContainerComponent';
import {useReduxSelector} from '@src/hooks/useReduxSelector';
import {InputField} from '@src/types/types';
import {SvgProps} from 'react-native-svg';

type CustomTextFieldComponentProps = TextInputProps & {
  inputField: InputField;
  title?: string;
  placeholder?: string;
  showTitle?: boolean;
  iconName?: string;
  iconType?: any;
  SvgIcon?: React.FC<SvgProps>;
  scrollViewRef?: React.RefObject<ScrollView>;
};

export const CustomTextFieldComponent: React.FC<
  CustomTextFieldComponentProps
> = ({
  inputField,
  title,
  placeholder,
  showTitle = true,
  iconName,
  iconType = 'AntDesign',
  SvgIcon,
  scrollViewRef,
}) => {
  const {theme} = useReduxSelector();
  const inputRef = useRef<TextInput>(null);
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (inputField.value.length === 0 && inputRef.current) {
      inputRef.current.clear();
      inputRef.current.focus();
    }
  }, [inputField?.value]);

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  const scrollToPosition = (position: number) => {
    if (position > 0) {
      // Use requestAnimationFrame to ensure smooth scrolling
      requestAnimationFrame(() => {
        scrollViewRef?.current?.scrollTo({
          y: position,
          animated: true,
        });
      });
    }
  };

  const handleFocus = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    // Wait for keyboard to show up
    timeout.current = setTimeout(
      () => {
        if (!inputRef.current) return;

        const reactTag = findNodeHandle(inputRef.current);
        if (reactTag) {
          inputRef.current.measureInWindow((x, y, width, height) => {
            // Calculate position relative to screen
            const offset = Platform.OS === 'ios' ? 150 : 100;
            const position = y - offset;
            scrollToPosition(position);
          });
        }
      },
      Platform.OS === 'ios' ? 250 : 100,
    );
  };

  const renderIcon = () => {
    if (SvgIcon) {
      return <SvgIcon width={22} height={22} fill={theme.inputBorder} />;
    }

    if (iconName) {
      return (
        <CustomIcon
          type={iconType}
          name={iconName}
          size={22}
          color={theme.inputBorder}
        />
      );
    }

    return null;
  };

  return (
    <CustomInputFieldCard
      title={title}
      showTitle={showTitle}
      error={inputField.validate()}>
      <CustomContainerComponent
        customStyle={[styles.container, {borderColor: theme.inputBorder}]}>
        {(SvgIcon || iconName) && (
          <CustomContainerComponent customStyle={styles.iconContainer}>
            {renderIcon()}
          </CustomContainerComponent>
        )}

        <TextInput
          ref={inputRef}
          style={[
            styles.inputStyle,
            !SvgIcon && !iconName && styles.inputWithoutIcon,
            {
              fontFamily: theme.fontFamily,
              color: theme.textInput,
            },
          ]}
          placeholderTextColor={theme.placeHolder}
          onChangeText={inputField.onChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          multiline={false}
          numberOfLines={1}
        />
      </CustomContainerComponent>
    </CustomInputFieldCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 12,
    height: 56,
    overflow: 'hidden',
  },
  iconContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
    height: 56,
    fontSize: 14,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  inputWithoutIcon: {
    paddingLeft: 15,
  },
});

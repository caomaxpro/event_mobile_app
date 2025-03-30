import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  findNodeHandle,
  Platform,
  ScrollView,
  TextInputProps,
  FlatList,
} from 'react-native';
import {CustomInputFieldCard} from './CustomInputFieldCard';
import CustomIcon from '../native_components/CustomIcon';
import CustomContainerComponent from '../native_components/ContainerComponent';
import {useReduxSelector} from '@src/hooks/useReduxSelector';
import {InputField} from '@src/types/types';
import {SvgProps} from 'react-native-svg';
import CustomText from '../native_components/CustomText';
import CustomVerticleScrollView from '../native_components/CustomVerticleScrollView';

type CustomLocationInputFieldProps = TextInputProps & {
  inputField: InputField;
  title?: string;
  placeholder?: string;
  showTitle?: boolean;
  iconName?: string;
  iconType?: any;
  SvgIcon?: React.FC<SvgProps>;
  scrollViewRef?: React.RefObject<ScrollView>;
};

type Result = {
  addresstype: string;
  boundingbox: [string, string, string, string]; // Array of 4 string coordinates
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  name: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  place_rank: number;
  type: string;
};

export function mergeOverlappingText(text1: string, text2: string): string {
  //   console.log(text1, text2);

  let maxOverlap = 0;
  let overlapIndex = 0;

  for (let i = 1; i <= Math.min(text1.length, text2.length); i++) {
    const end = text1.slice(-i);
    const start = text2.slice(0, i);

    if (end === start) {
      maxOverlap = i;
      overlapIndex = text1.length - i;
    }
  }

  // If no overlap found, just concatenate with space
  if (maxOverlap === 0) {
    return `${text1} ${text2}`;
  }

  console.log(text1.slice(0, overlapIndex) + text2);

  return text1.slice(0, overlapIndex) + text2;
}

export const CustomLocationInputField: React.FC<
  CustomLocationInputFieldProps
> = ({
  inputField,
  title,
  placeholder,
  showTitle = true,
  iconName = 'search-location',
  iconType = 'FontAwesome5',
  SvgIcon,
  scrollViewRef,
}) => {
  const {theme} = useReduxSelector();
  const inputRef = useRef<TextInput>(null);
  const timeout = useRef<NodeJS.Timeout>();
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<Result[]>([]);
  const [suggestedLocation, setSuggestedLocation] = React.useState<string>('');

  const searchTimeout = useRef<NodeJS.Timeout>();

  const debouncedFetchLocations = (text: string) => {
    setQuery(text.trim());

    // Clear any existing timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Set new timeout
    searchTimeout.current = setTimeout(() => {
      fetchLocations(text);
    }, 500); // 1 second delay
  };

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

  const fetchLocations = async (text: string) => {
    setQuery(text);
    if (text.length > 2) {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${text}&format=json`,
      );
      const data: Result[] = await JSON.parse(await res.text());
      //   console.log(data);

      setSuggestedLocation(
        mergeOverlappingText(text, data[0]?.display_name ?? ''),
      );

      setResults(data);
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
          onChangeText={debouncedFetchLocations}
          onBlur={() => {
            inputField.onChange(query);
          }}
          onFocus={handleFocus}
          placeholder={placeholder}
          multiline={false}
          numberOfLines={1}
        />
      </CustomContainerComponent>

      <CustomVerticleScrollView
        style={styles.searchResultContainer}
        contentContainerStyle={{height: 100 * results?.length}}
        scrollEnabled={true}>
        {results.map((result, index) => (
          <CustomContainerComponent
            key={index}
            customStyle={styles.searchResult}
            contentStyle={{
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <CustomIcon
              type="Ionicons"
              name="location-sharp"
              size={20}
              style={{width: '10%'}}
            />
            <CustomText
              customStyle={{textAlign: 'left', borderWidth: 0, width: '90%'}}>
              {result.display_name}
            </CustomText>
          </CustomContainerComponent>
        ))}
      </CustomVerticleScrollView>

      {/* {results.map((result, index) => (
          <CustomContainerComponent
            key={index}
            customStyle={styles.searchResult}>
            <CustomText>{result.display_name}</CustomText>
          </CustomContainerComponent>
        ))}
      </CustomContainerComponent> */}
    </CustomInputFieldCard>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: 317,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 12,
    height: 56,
    overflow: 'hidden',
  },

  inputContainer: {
    // flex: 1,
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  searchResultContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 300,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    // justifyContent: 'center',
  },

  searchResultContainerContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
  },

  searchResult: {
    height: 100,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    // borderWidth: 2,
  },
  iconContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  inputStyle: {
    width: '85%',
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

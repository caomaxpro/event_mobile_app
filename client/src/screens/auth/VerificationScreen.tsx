import ArrowButton from '@src/components/ArrowButton';
import CustomButton from '@src/components/ButtonComponent';
import CustomContainerComponent from '@src/components/ContainerComponent';
import CustomText from '@src/components/CustomText';
import HeaderComponent from '@src/components/HeaderComponent';
import {useSettingContext} from '@src/context/SettingContext';
import {log} from '@src/utils/logUtils';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const VerificationScreen: React.FC = () => {
  const [curIndex, setCurIndex] = useState<number>(0);
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(1000);

  const {state} = useSettingContext();

  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOnFocus = (index: number) => {
    const newCode = [...code];
    newCode[index] = '';
    setCode(newCode);

    // inputRefs.current[index]?.focus();
  };

  const handleChangeCode = (index: number, value: string) => {
    if (/^\d$/.test(value)) {
      // Only allow numbers
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to the next input automatically
      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    const newCode = [...code];
    newCode[index] = '';
    setCode(newCode);

    if (key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    console.log('Verification code:', code.join(''));
  };

  const handleResendCode = () => {
    setTimer(20);
    setCode(['', '', '', '']);
    inputRefs.current[0]?.focus();
    console.log('Re-sent verification code');
  };

  return (
    <CustomContainerComponent
      contentStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        paddingTop: 65,
      }}>
      <HeaderComponent />
      <CustomContainerComponent
        customStyle={{
          display: 'flex',
          flexDirection: 'column',
          width: 317,
        }}
        contentStyle={styles.container}>
        <CustomText customStyle={styles.title}>Verification</CustomText>
        <CustomText customStyle={styles.subTitle}>
          We've sent you the verification code on +1 2620 0323 7631
        </CustomText>

        <CustomContainerComponent
          customStyle={{
            // borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          contentStyle={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={el => (inputRefs.current[index] = el)}
              style={[styles.codeInput, {fontFamily: state.text.fontFamily}]}
              value={digit}
              keyboardType="number-pad"
              maxLength={1}
              onPressIn={() => {
                handleOnFocus(index);
              }}
              onChangeText={value => handleChangeCode(index, value)}
              onKeyPress={({nativeEvent}) =>
                handleKeyPress(index, nativeEvent.key)
              }
              placeholder="_"
              placeholderTextColor={state.theme.placeHolder}
            />
          ))}
        </CustomContainerComponent>

        <ArrowButton label="CONTINUE" onPress={() => {}} />

        <CustomContainerComponent style={styles.resendContainer}>
          <CustomButton
            customStyle={{backgroundColor: 'transparent'}}
            onPress={handleResendCode}>
            <CustomText
              customStyle={[
                styles.resendLink,
                {
                  color:
                    timer === 0 ? state.theme.button : state.theme.textOnBG,
                },
              ]}>
              Re-send{' '}
            </CustomText>
          </CustomButton>

          {timer > 0 && (
            <>
              <CustomText customStyle={styles.resendText}>code in </CustomText>
              <CustomText customStyle={styles.timer}>{timer}s</CustomText>
            </>
          )}
        </CustomContainerComponent>
      </CustomContainerComponent>
    </CustomContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // padding: 20,
    width: '100%',
    height: 'auto',
  },
  title: {
    width: 317,
    fontSize: 24,
    // fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subTitle: {
    width: 244,
    fontSize: 15,
    lineHeight: 25,
    color: '#707070',
    // textAlign: 'center',
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginBottom: 30,
  },
  codeInput: {
    width: 55,
    height: 55,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#B3B3B3',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#4c8bf5',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    // fontWeight: 'bold',
  },
  resendContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
  },
  timer: {
    fontSize: 14,
    color: '#4c8bf5',
    // fontWeight: 'bold',
    // marginHorizontal: 5,
  },
  resendLink: {
    fontSize: 14,
    color: '#4c8bf5',
    // fontWeight: 'bold',
  },
});

export default VerificationScreen;

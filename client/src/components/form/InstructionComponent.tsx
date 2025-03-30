import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  EmitterSubscription,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import CustomContainerComponent, {
  AnimatedCustomContainerComponent,
} from '../native_components/ContainerComponent';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CustomIcon from '../native_components/CustomIcon';
import CustomText from '../native_components/CustomText';
import {useReduxSelector} from '@src/hooks/useReduxSelector';

type InstructionItem = {
  message: string;
  isValid: boolean;
};

type InstructionComponentProps = {
  instructions?: InstructionItem[];
  isVisible?: boolean;
};

const InstructionComponent: React.FC<InstructionComponentProps> = ({
  instructions,
  isVisible = false,
}) => {
  const {theme} = useReduxSelector();
  const contentHeight = useSharedValue<number>(0);
  const contentRef = React.useRef<View>(null);

  //   const animatedInstructionStyle = useAnimatedStyle(() => {
  //     return {
  //       height: isVisible
  //         ? withTiming(contentHeight.value, {duration: 300})
  //         : withTiming(0, {duration: 300}),
  //       opacity: isVisible
  //         ? withTiming(1, {duration: 300})
  //         : withTiming(0, {duration: 300}),
  //     };
  //   });

  //   const measureContent = useCallback(() => {
  //     if (contentRef.current) {
  //       contentRef.current.measure((x, y, width, height) => {
  //         contentHeight.value = height;
  //       });
  //     }
  //   }, []);

  useEffect(() => {
    console.log('[Instruction Component]', instructions);
  }, []);

  return (
    <AnimatedCustomContainerComponent
      customStyle={[styles.container]}
      contentStyle={{display: 'flex', flexDirection: 'column'}}
      ref={contentRef}
      // onLayout={measureContent}
    >
      {instructions?.map((instruction, index) => (
        <View key={index} style={styles.instructionRow}>
          <CustomIcon
            type="Feather"
            name={instruction.isValid ? 'check-circle' : 'circle'}
            size={16}
            //   color={instruction.isValid ? theme.success : theme.textSecondary}
            style={styles.defaultIcon}
          />

          <CustomText
            customStyle={[
              styles.message,
              {
                textDecorationLine: instruction.isValid
                  ? 'line-through'
                  : 'none',
              },
            ]}>
            {instruction.message}
          </CustomText>
        </View>
      ))}
    </AnimatedCustomContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
    // height: 100,
  },
  instructionRow: {
    flexDirection: 'row',
    // alignItems: 'center',
    // marginVertical: 4,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  icon: {
    marginRight: 4,
  },
  defaultIcon: {
    marginRight: 8,
  },
  message: {
    fontSize: 14,
    flex: 1,
  },
});

export default InstructionComponent;

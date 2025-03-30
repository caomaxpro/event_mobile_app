import * as React from 'react';
import {ColorValue, StyleSheet} from 'react-native';
import Svg, {Path, SvgProps} from 'react-native-svg';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import {useEffect} from 'react';

interface CustomSvgProp extends SvgProps {
  fillColor?: SharedValue<string>;
  moving?: boolean;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const DraggingButton = React.forwardRef<Svg, CustomSvgProp>(
  ({fillColor = '#000000', moving, style, ...props}, ref) => {
    const bgColor = useSharedValue(
      StyleSheet.flatten(style)?.backgroundColor ?? '#000000',
    );

    useEffect(() => {
      bgColor.value = StyleSheet.flatten(style)?.backgroundColor ?? '#000000';
    }, [style]);

    const animatedProps = useAnimatedProps(() => {
      return {
        fill: bgColor.value,
      };
    });

    return (
      <Svg
        ref={ref}
        // onPressIn={() => {
        //   console.log('DraggingButton onPressIn:');
        // }}
        // onPressOut={() => {
        //   console.log('DraggingButton onPressOut:');
        // }}
        width={65}
        height={50}
        viewBox="0 0 65 50"
        {...props}>
        <AnimatedPath
          animatedProps={animatedProps}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50 45C50 47.7614 47.7614 50 45 50H5C2.23858 50 0 47.7614 0 45V5C0 2.23858 2.23857 0 5 0H45C47.7614 0 50 2.23857 50 5V6.94643L61.4524 10.4231C63.5595 11.0627 65 13.0055 65 15.2075V33.7925C65 35.9945 63.5594 37.9373 61.4524 38.5769L50 42.0536V45ZM8 3C5.23858 3 3 5.23858 3 8V42C3 44.7614 5.23858 47 8 47H42C44.7614 47 47 44.7614 47 42V8C47 5.23858 44.7614 3 42 3H8Z"
          fillOpacity={0.9}
        />
      </Svg>
    );
  },
);

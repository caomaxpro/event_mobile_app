import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {SvgProps} from 'react-native-svg';

interface BookmarkIconProps extends SvgProps {
  fillColor?: string;
  strokeColor?: string;
}

export const BookmarkIcon: React.FC<BookmarkIconProps> = ({
  fillColor = 'transparent',
  strokeColor = '#767676',
  ...props
}) => (
  <Svg width={18} height={22} viewBox="0 0 18 22" fill="none" {...props}>
    <Path
      d="M17 21L9 15.4444L1 21V3.22222C1 2.63285 1.24082 2.06762 1.66947 1.65087C2.09812 1.23413 2.67951 1 3.28571 1H14.7143C15.3205 1 15.9019 1.23413 16.3305 1.65087C16.7592 2.06762 17 2.63285 17 3.22222V21Z"
      stroke={strokeColor}
      fill={fillColor}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

import * as React from 'react';
import {SVGProps} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const MailIcon: React.FC<SvgProps> = props => (
  <Svg width={24} height={22} viewBox="0 0 24 22" fill="none" {...props}>
    <Path
      d="M23 3.5C23 2.125 22.01 1 20.8 1H3.2C1.99 1 1 2.125 1 3.5M23 3.5V18.5C23 19.875 22.01 21 20.8 21H3.2C1.99 21 1 19.875 1 18.5V3.5M23 3.5L12 12.25L1 3.5"
      stroke="#767676"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

import * as React from 'react';
import {SVGProps} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const BellIcon: React.FC<SvgProps> = props => (
  <Svg width={17} height={19} viewBox="0 0 17 19" fill="none" {...props}>
    <Path
      d="M13.5 6C13.5 3.23858 11.2614 1 8.5 1C5.73858 1 3.5 3.23858 3.5 6C3.5 11.8333 1 13.5 1 13.5H16C16 13.5 13.5 11.8333 13.5 6"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.94168 16.8333C9.64352 17.3473 9.09424 17.6636 8.50002 17.6636C7.90579 17.6636 7.35651 17.3473 7.05835 16.8333"
      stroke="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

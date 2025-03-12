import * as React from 'react';
import {SVGProps} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const MessageIcon: React.FC<SvgProps> = props => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21 10.4445C21.0038 11.911 20.6612 13.3577 20 14.6667C18.401 17.8659 15.1321 19.8875 11.5555 19.8889C10.089 19.8927 8.64234 19.5501 7.33332 18.8889L1 21L3.11111 14.6667C2.44992 13.3577 2.10729 11.911 2.11111 10.4445C2.11249 6.8679 4.13408 3.59896 7.33332 2.00003C8.64234 1.33884 10.089 0.996208 11.5555 1.00003H12.1111C16.9064 1.26459 20.7354 5.09357 21 9.88891V10.4445Z"
      stroke="#767676"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

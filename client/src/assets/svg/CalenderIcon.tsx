import * as React from 'react';
import {SVGProps} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const CalenderIcon: React.FC<SvgProps> = props => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
    <Path
      d="M15.4444 1V5M6.55555 1V5M1 9H21M3.22222 3H18.7778C20.0051 3 21 3.89543 21 5V19C21 20.1046 20.0051 21 18.7778 21H3.22222C1.99492 21 1 20.1046 1 19V5C1 3.89543 1.99492 3 3.22222 3Z"
      stroke="#767676"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

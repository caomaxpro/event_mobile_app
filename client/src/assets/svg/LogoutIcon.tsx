import * as React from 'react';
import {SVGProps} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const LogoutIcon: React.FC<SvgProps> = props => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
    <Path
      d="M7.36367 6V3.5C7.36367 2.83696 7.60312 2.20107 8.02933 1.73223C8.45555 1.26339 9.03363 1 9.63639 1H18.7273C19.33 1 19.9081 1.26339 20.3343 1.73223C20.7606 2.20107 21 2.83696 21 3.5V18.5C21 19.163 20.7606 19.7989 20.3343 20.2678C19.9081 20.7366 19.33 21 18.7273 21H10.0909C8.83582 21 7.36367 19.8806 7.36367 18.5V16M12.8182 16.0001L17.3636 11.0001L12.8182 6.00006M1 11.0001H16.4545"
      stroke="#767676"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

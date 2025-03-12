import * as React from 'react';
import {SVGProps} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const ProfileIcon: React.FC<SvgProps> = props => (
  <Svg width={20} height={22} viewBox="0 0 20 22" fill="none" {...props}>
    <Path
      d="M24.0165 279.317H5.0535C4.47167 279.317 4 279.789 4 280.371C4 280.953 4.47167 281.424 5.0535 281.424H24.0165C24.5983 281.424 25.07 280.953 25.07 280.371C25.07 279.789 24.5983 279.317 24.0165 279.317Z"
      fill="#00F8FF"
    />

    <Path
      d="M19 21V18.7778C19 17.599 18.5259 16.4686 17.682 15.6351C16.8381 14.8016 15.6935 14.3333 14.5 14.3333H5.5C4.30653 14.3333 3.16193 14.8016 2.31802 15.6351C1.47411 16.4686 1 17.599 1 18.7778V21M14.5 5.44444C14.5 7.89904 12.4853 9.88889 9.99998 9.88889C7.5147 9.88889 5.49998 7.89904 5.49998 5.44444C5.49998 2.98985 7.5147 1 9.99998 1C12.4853 1 14.5 2.98985 14.5 5.44444Z"
      stroke="#767676"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

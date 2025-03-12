import * as React from 'react';
import {SVGProps} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const QuestionIcon: React.FC<SvgProps> = props => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
    <Path
      d="M8.09001 7.99999C8.32511 7.33166 8.78916 6.7681 9.39997 6.40913C10.0108 6.05015 10.7289 5.91893 11.4272 6.03871C12.1255 6.15848 12.7588 6.52152 13.2151 7.06352C13.6713 7.60552 13.9211 8.29151 13.92 8.99999C13.92 11 10.92 12 10.92 12V13.7022M11 16H11.0109M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
      stroke="#767676"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

import * as React from 'react';
import {SVGProps} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {CustomSvgProp} from './types';

export const ProfileIcon: React.FC<CustomSvgProp> = ({
  fillColor = '#200E32',
  ...props
}): React.JSX.Element => (
  <Svg width={16} height={21} viewBox="0 0 16 21" fill="none" {...props}>
    <Path
      d="M13.2589 6.09029C13.2589 8.94755 11.0548 11.2638 8.33579 11.2638C5.61681 11.2638 3.41265 8.94755 3.41265 6.09029C3.41265 3.23302 5.61681 0.916748 8.33579 0.916748C11.0548 0.916748 13.2589 3.23302 13.2589 6.09029Z"
      fill={fillColor}
    />
    <Path
      d="M12.5614 14.1787C14.1268 14.5026 15.1487 15.0311 15.5867 15.8834C15.9156 16.5486 15.9156 17.3404 15.5867 18.0056C15.1487 18.8579 14.1673 19.4205 12.5452 19.7103C11.8224 19.8592 11.0907 19.956 10.3553 20C9.67404 20.0767 8.99275 20.0767 8.30334 20.0767H7.06242C6.80288 20.0427 6.55145 20.0256 6.30814 20.0256C5.57272 19.987 4.8409 19.893 4.11827 19.7443C2.55293 19.4375 1.53099 18.892 1.09302 18.0397C0.923944 17.7096 0.834808 17.3407 0.833478 16.9658C0.829954 16.5886 0.916393 16.2165 1.08491 15.8834C1.51477 15.0311 2.5367 14.4771 4.11827 14.1787C4.84408 14.0332 5.5784 13.9392 6.31625 13.8975C7.66594 13.7863 9.02185 13.7863 10.3715 13.8975C11.1065 13.9413 11.838 14.0352 12.5614 14.1787Z"
      fill={fillColor}
    />
  </Svg>
);

import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowLeft = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M15.5 19L8.5 12L15.5 5"
      stroke={props.stroke || '#1A1A1A'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ArrowLeft;

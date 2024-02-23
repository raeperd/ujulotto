import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const IconNext = (props: SvgProps) => (
  <Svg width={8} height={14} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M.243 1.899c-.353-.322-.317-.816.08-1.102.38-.274.952-.26 1.31.025l.047.04L7.7 6.36c.4.364.4.914 0 1.278l-6.02 5.499c-.353.322-.96.351-1.357.065-.38-.274-.43-.737-.124-1.06l.044-.042 5.352-4.888a.278.278 0 0 0 0-.426L.243 1.899Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default IconNext;

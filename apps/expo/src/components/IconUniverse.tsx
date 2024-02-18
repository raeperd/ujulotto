import type { SvgProps } from "react-native-svg";
import * as React from "react";
import Svg, {
  Circle,
  Defs,
  Ellipse,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";

const IconUniverse = (props: SvgProps) => (
  <Svg width={48} height={39} fill="none" {...props}>
    <Ellipse
      cx={24.069}
      cy={19.808}
      stroke="#D3C4FF"
      strokeWidth={2.477}
      rx={20.92}
      ry={2.789}
      transform="rotate(-24.376 24.07 19.808)"
    />
    <Circle
      cx={23.904}
      cy={19.441}
      r={11.559}
      fill="url(#a)"
      transform="rotate(-24.376 23.904 19.441)"
    />
    <Path
      stroke="#D3C4FF"
      strokeWidth={2.477}
      d="M43.125 11.174c.636 1.403-7.38 6.406-17.904 11.175-10.524 4.768-19.57 7.497-20.207 6.093"
    />
    <Circle
      cx={23.979}
      cy={10.545}
      r={0.697}
      fill="#fff"
      fillOpacity={0.53}
      transform="rotate(-24.376 23.979 10.545)"
    />
    <Circle
      cx={26.747}
      cy={11.586}
      r={1.395}
      fill="#fff"
      fillOpacity={0.8}
      transform="rotate(-24.376 26.747 11.586)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={7.213}
        x2={52.097}
        y1={19.441}
        y2={19.441}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#6E6BF3" />
        <Stop offset={0.747} stopColor="#B6A4FF" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default IconUniverse;

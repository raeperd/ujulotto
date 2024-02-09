import type { SvgProps } from "react-native-svg";
import * as React from "react";
import { Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Numbers() {
  const numbers = [];
  return (
    <View className="flex-1 bg-[#1B1C20] px-4 pt-[30]">
      <View className="flex-row justify-between">
        <Text className="text-2xl font-semibold text-white">번호저장함</Text>
        <DotSvg fill={"#1B1C20"}></DotSvg>
      </View>
    </View>
  );
}

const DotSvg = (props: SvgProps) => (
  <Svg width={7} height={26} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M7 3.457C7 1.548 5.433 0 3.5 0S0 1.548 0 3.457c0 1.91 1.567 3.458 3.5 3.458S7 5.367 7 3.457ZM3.5 9.543C1.567 9.543 0 11.09 0 13c0 1.91 1.567 3.457 3.5 3.457S7 14.91 7 13c0-1.91-1.567-3.457-3.5-3.457Zm0 9.542c-1.933 0-3.5 1.548-3.5 3.458C0 24.452 1.567 26 3.5 26S7 24.452 7 22.543c0-1.91-1.567-3.458-3.5-3.458Z"
      clipRule="evenodd"
    />
  </Svg>
);

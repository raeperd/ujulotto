import type { ViewProps } from "react-native";
import React from "react";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function NumberBall(props: NumberBallProps) {
  const colorsFromNumber = (num: number) => {
    if (num < 11) {
      return ["#FFCD12", "#FFF2AB"];
    }
    if (num < 21) {
      return ["#5F88F1", "#9BB2FB"];
    }
    if (num < 31) {
      return ["#FF6969", "#FEB1B1"];
    }
    if (num < 41) {
      return ["#636262", "#949494"];
    }
    return ["#3CE038", "#9BFA98"];
  };
  const { number, ...rest } = props;
  return (
    <LinearGradient
      colors={colorsFromNumber(number)}
      locations={[0.1655, 0.7122]}
      style={{
        width: 24,
        height: 24,
        padding: 4,
        borderRadius: 12,
      }}
    >
      <Text className="text-center text-xs font-semibold text-black">
        {number}
      </Text>
    </LinearGradient>
  );
}

interface NumberBallProps extends ViewProps {
  number: number;
}

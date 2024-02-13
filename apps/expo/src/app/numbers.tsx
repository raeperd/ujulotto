import type { ViewProps } from "react-native";
import type { SvgProps } from "react-native-svg";
import * as React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import NumberBall from "../components/NumberBall";

export default function Numbers() {
  const history: NumberHistory[] = [
    {
      numbers: [9, 18, 20, 22, 34, 38],
      createdAt: new Date(),
      type: "직접조합",
    },
    {
      numbers: [9, 18, 20, 22, 34, 38],
      createdAt: new Date(),
      type: "직접조합",
    },
    {
      numbers: [
        9, 18, 20, 22, 34, 38, 9, 18, 20, 22, 34, 38, 9, 18, 20, 22, 34, 38, 9,
        18, 20, 22, 34, 38, 9, 18, 20, 22, 34, 38, 9, 18, 20, 22, 34, 38,
      ],
      createdAt: new Date(),
      type: "미출현번호",
    },
  ];
  return (
    <View className="bg-black_2 flex-1 px-4 pt-[30]">
      <View className="flex-row justify-between">
        <Text className="text-2xl font-semibold text-white">번호저장함</Text>
        <DotSvg fill={"#1B1C20"}></DotSvg>
      </View>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <NumberHistoryItem history={item} className="mt-[30]" />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}

interface NumberHistory {
  numbers: number[];
  createdAt: Date;
  type: string;
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

const NumberHistoryItem = ({ history, ...props }: NumberHistoryProps) => {
  return (
    <View {...props}>
      <View className="flex-row justify-between">
        <Text className="text-white">{formatCreatedAt(history)}</Text>
        <Text className="text-white">{history.type}</Text>
      </View>
      <FlatList
        className="mt-2 flex-row flex-wrap justify-center gap-[10] rounded-[14] bg-white py-5"
        data={history.numbers}
        numColumns={6}
        renderItem={(num) => (
          <View className="m-[5]">
            <NumberBall number={num.item} width={32}></NumberBall>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      ></FlatList>
      <View className="mt-[10] flex-row">
        <Pressable className="bg-point w-1/2 rounded-3xl py-[10]">
          <Text className="text-center text-white">저장</Text>
        </Pressable>
        <Pressable className="w-1/2 rounded-3xl bg-[#242429] py-[10]">
          <Text className="text-center text-white">삭제</Text>
        </Pressable>
      </View>
    </View>
  );
};

interface NumberHistoryProps extends ViewProps {
  history: NumberHistory;
}

function formatCreatedAt(history: NumberHistory) {
  const date = history.createdAt;
  const [month, day, hour, minute, second] = [
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
  const zeroPad = (num: number, places: number) =>
    String(num).padStart(places, "0");

  return `${zeroPad(month, 2)}.${zeroPad(day, 2)} ${zeroPad(hour, 2)}:${zeroPad(
    minute,
    2,
  )}:${zeroPad(second, 2)}`;
}

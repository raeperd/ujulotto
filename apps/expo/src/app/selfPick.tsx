import type { PressableProps, ViewProps } from "react-native";
import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path, Rect } from "react-native-svg";
import { Link } from "expo-router";

import type { NumberBallProps } from "../components/NumberBall";
import IconNext from "../components/IconNext";
import NumberBall from "../components/NumberBall";
import RouteBackButton from "../components/RouteBackButton";

export default function SelfPick() {
  return (
    <SafeAreaView className="bg-point flex-1 px-[10]">
      <View className="flex-row items-center">
        <RouteBackButton></RouteBackButton>
        <Text className="font-medium text-white">직접조합</Text>
      </View>
      <SelfPickBoard className="w-full"></SelfPickBoard>
    </SafeAreaView>
  );
}

function SelfPickBoard(props: ViewProps) {
  const [index, setIndex] = useState(0);
  const [numbers, setNumbers] = useState<number[][]>(
    Array.from({ length: 5 }, () => Array.from({ length: 6 }, () => 46)),
  );

  const sortedNumbers = numbers.map((row) =>
    [...row].sort((left, right) => left - right).slice(0, 6),
  );
  const rowLabels = ["A", "B", "C", "D", "E"];
  const isFull = numbers.every((row) => row.length == 12);

  return (
    <View {...props}>
      <View className="items-center rounded-[14] bg-white pb-2 pl-5 pr-[18] pt-4">
        <FlatList
          data={Array.from({ length: 5 }, (_, i) => i)}
          renderItem={(row) => (
            <View className="mb-[10] flex-row items-center gap-[15]">
              <Pressable
                onPress={() => setIndex(row.item)}
                className="flex-row items-center gap-2.5"
              >
                <Text
                  className={`font-bold ${
                    row.item == index ? "text-point" : "text-gray_4"
                  }`}
                >
                  {rowLabels[row.item]}
                </Text>
                {sortedNumbers[row.item]?.map((num, i) => (
                  <NumberBallOrEmpty
                    key={i}
                    number={num}
                    width={32}
                  ></NumberBallOrEmpty>
                ))}
              </Pressable>
              <RefreshButton
                disabled={row.item != index}
                onPress={() =>
                  setNumbers((prev) => {
                    const next = [...prev];
                    next[row.item] = Array.from({ length: 6 }, () => 46);
                    return next;
                  })
                }
              ></RefreshButton>
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
        ></FlatList>
      </View>
      <View className="relative mt-2.5 items-center rounded-[14] bg-black px-[21] pb-[34] pt-5">
        <FlatList
          className="flex-row flex-wrap"
          data={Array.from({ length: 45 }, (_, i) => i + 1)}
          numColumns={7}
          renderItem={(num) => (
            <NumberPickButton
              className="m-1.5"
              active={numbers[index]?.includes(num.item) ?? false}
              number={num.item}
              onPress={() => {
                const included = numbers[index]?.includes(num.item);
                setNumbers((prev) => {
                  const next = [...prev];
                  if (included) {
                    next[index] =
                      next[index]?.filter((n) => n !== num.item) ?? [];
                  } else {
                    next[index] = [...(next[index] ?? []), num.item];
                  }
                  return next;
                });
                if (!included && numbers[index]?.length == 11) {
                  setIndex((prev) => (prev + 1) % 5);
                }
              }}
              disabled={
                numbers[index]?.length == 12 &&
                !numbers[index]?.includes(num.item)
              }
            ></NumberPickButton>
          )}
          keyExtractor={(_, index) => index.toString()}
        ></FlatList>
        <View className="absolute bottom-[20] right-[20] flex-row gap-[10]">
          <Pressable
            className="rounded-[4] bg-[#474747] px-[15] py-[6]"
            onPress={() => {
              setNumbers((prev) => {
                const next = [...prev];
                if (next[index]?.length == 12) {
                  next[index] = next[index]?.filter((n) => 45 < n) ?? [];
                }
                while ((next[index]?.length ?? 0) < 12) {
                  const num = Math.floor(Math.random() * 45) + 1;
                  if (!next[index]?.includes(num)) {
                    next[index] = [...(next[index] ?? []), num];
                  }
                }
                return next;
              });
              setIndex((prev) => (prev + 1) % 5);
            }}
          >
            <Text className="text-sm text-white">자동</Text>
          </Pressable>
          <Link
            href={{
              pathname: "/generates/[mode]",
              params: {
                mode: "직접조합",
                nums: sortedNumbers.flatMap((row) => row.toString()),
              },
            }}
            asChild
          >
            <Pressable
              className={`${
                isFull ? "bg-point" : "bg-[#474747] opacity-40"
              } flex-row items-center gap-[11] rounded-[4] px-[15] py-[6]`}
            >
              <Text className="text-sm text-white">완성</Text>
              <IconNext></IconNext>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

function NumberBallOrEmpty(props: NumberBallProps) {
  const { number, width } = props;
  const size = width ?? 32;
  if (number < 1 || 45 < number) {
    return (
      <Svg width={size} height={size} fill="none" {...props}>
        <Rect
          width={31}
          height={31}
          x={0.5}
          y={0.5}
          fill="#D6D6D7"
          stroke="#fff"
          strokeDasharray="1.85 1.85"
          strokeLinejoin="round"
          rx={15.5}
        />
      </Svg>
    );
  }
  return <NumberBall number={number} width={width}></NumberBall>;
}

function RefreshButton(props: PressableProps) {
  return (
    <Pressable {...props}>
      <Svg width={16} height={16} fill="none">
        <Path
          fill={props.disabled ? "#D6D6D7" : "#474747"}
          fillRule="evenodd"
          d="M7.97 0C12.405 0 16 3.582 16 8s-3.595 8-8.03 8a8.03 8.03 0 0 1-7.532-5.22.94.94 0 0 1 .558-1.21.946.946 0 0 1 1.214.555 6.142 6.142 0 0 0 5.76 3.993c3.391 0 6.14-2.74 6.14-6.118 0-3.379-2.749-6.118-6.14-6.118A6.136 6.136 0 0 0 3.12 4.25h2.077l.073.003c.488.037.871.443.871.938a.943.943 0 0 1-.877.94l-.067.001H2.662l-.11-.002a2.657 2.657 0 0 1-2.55-2.553L0 3.479V.955L.003.882A.943.943 0 0 1 .945.014c.499 0 .907.386.942.874l.002.067v1.82A8.027 8.027 0 0 1 7.97 0Z"
          clipRule="evenodd"
        />
      </Svg>
    </Pressable>
  );
}

function NumberPickButton(props: NumberPickButtonProps) {
  const { active, number, ...rest } = props;
  const size = 34;
  return (
    <Pressable {...rest}>
      <View
        className={`${active ? "bg-white" : "bg-black_2"} `}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          padding: 4,
        }}
      >
        <Text
          className={`${
            active ? "text-black" : "text-white"
          } text-center text-xs`}
          style={{ fontSize: 17, lineHeight: 34 - 8 }}
        >
          {number}
        </Text>
      </View>
    </Pressable>
  );
}

interface NumberPickButtonProps extends PressableProps {
  active: boolean;
  number: number;
}

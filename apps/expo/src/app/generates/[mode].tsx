import type { PressableProps } from "react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { router, useLocalSearchParams } from "expo-router";

import type { GenerationMode } from "../../types/type";
import NumberBall from "../../components/NumberBall";

export default function GeneratedNumber() {
  const { mode } = useLocalSearchParams<{ mode: GenerationMode }>();
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    setNumbers(generateNumbersForTimes(mode, 5));
  }, [mode]);

  return (
    <SafeAreaView
      className="bg-black_2 flex-1"
      style={{ paddingHorizontal: 16 }}
    >
      <View>
        <Pressable onPress={() => router.back()} className="w-12 py-4 pr-4">
          <Svg width={24} height={24} fill="none">
            <Path
              fill="#fff"
              fillRule="evenodd"
              d="M9.89 15.642c.45.42.405 1.062-.101 1.435-.484.357-1.214.338-1.67-.032l-.06-.052L.38 9.833c-.508-.475-.508-1.19 0-1.665l7.677-7.16c.45-.42 1.225-.457 1.73-.085.485.357.547.96.158 1.38l-.055.055-6.824 6.365a.366.366 0 0 0 0 .555l6.824 6.364Z"
              clipRule="evenodd"
            />
          </Svg>
        </Pressable>
      </View>
      <View className="items-center">
        <ImageBackground
          source={require("../images/cover-generated.png")}
          className="h-[413] w-[328] items-center"
        >
          <Text className="pt-10 text-center text-3xl font-semibold text-white">
            {mode}
          </Text>
          <Text className="pt-4 text-center text-sm font-medium text-white">
            23년 9월 23일 생성
          </Text>
          <FlatList
            className="mt-10 flex-row flex-wrap"
            data={numbers}
            numColumns={6}
            renderItem={(num) => (
              <View className="mx-1 my-2">
                <NumberBall number={num.item} width={32}></NumberBall>
              </View>
            )}
            keyExtractor={(_, index) => index.toString()}
          ></FlatList>
        </ImageBackground>
        <BottomButton
          className="bg-gray_5 mt-[10] py-[14]"
          onPress={() => setNumbers(generateNumbersForTimes(mode, 5))}
        >
          다시뽑기
        </BottomButton>
        <BottomButton className="bg-point mt-[10] py-[14]">
          이미지 저장
        </BottomButton>
      </View>
    </SafeAreaView>
  );
}

function BottomButton(props: BottomButtonProps) {
  const { className, ...rest } = props;
  return (
    <Pressable className={`w-full rounded-[20] ${className}`} {...rest}>
      <Text className="text-center text-base font-semibold text-white">
        {props.children}
      </Text>
    </Pressable>
  );
}

interface BottomButtonProps extends Omit<PressableProps, "children"> {
  children: string;
}

function generateNumbersForTimes(
  mode: GenerationMode,
  times: number,
): number[] {
  const numbers = [];
  for (let i = 0; i < times; i++) {
    numbers.push(...generateNumbers(mode));
  }
  return numbers;
}

function generateNumbers(mode: GenerationMode) {
  switch (mode) {
    case "짝홀조합":
      return generateOddEvenNumbers();
    case "랜덤뽑기":
    case "직접조합":
    case "우주추천":
    case "미출현 번호":
    case "1등 번호기반":
      return generateRandomNumbers();
  }
}

function generateRandomNumbers() {
  return streamRandomNumbers()
    .filter((_, i) => i < 6)
    .sort((left, right) => left - right);
}

function generateOddEvenNumbers() {
  let oddLeft = 3;
  let evenLeft = 3;
  return streamRandomNumbers()
    .filter((v) => {
      if (oddLeft > 0 && v % 2 == 1) {
        oddLeft -= 1;
        return true;
      }
      if (evenLeft > 0 && v % 2 == 0) {
        evenLeft -= 1;
        return true;
      }
      if (oddLeft == 0 && evenLeft == 0) {
        return false;
      }
    })
    .sort((left, right) => left - right);
}

function streamRandomNumbers() {
  return Array.from(Array(45), (_, i) => i + 1)
    .map((v) => ({ v: v, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ v: num }) => num);
}

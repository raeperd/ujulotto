import type { ModalProps, PressableProps } from "react-native";
import type { SvgProps } from "react-native-svg";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";
import { router, useGlobalSearchParams } from "expo-router";

import type { GenerationMode } from "../../types/type";
import NumberBall from "../../components/NumberBall";
import RouteBackButton from "../../components/RouteBackButton";

export default function GeneratedNumber() {
  const { mode, nums } = useGlobalSearchParams<{
    mode: GenerationMode;
    nums?: string;
  }>();
  const [numbers, setNumbers] = useState<number[]>([]);
  const { height } = useWindowDimensions();
  const [retry, setRetry] = useState(0);
  const [openSaveModal, setOpenSaveModal] = useState(false);

  useEffect(() => {
    let firstNumbers: number[] = [];
    if (nums && 0 < nums.length) {
      firstNumbers = nums.split(",").map((v) => parseInt(v));
    } else {
      firstNumbers = generateNumbersForTimes(mode, 5);
    }
    setNumbers(firstNumbers);
    return;
  }, [mode, nums]);

  const formatNow = () => {
    const date = new Date();
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일 생성`;
  };

  return (
    <SafeAreaView className="bg-black_2 flex-1 px-4 ">
      <RouteBackButton></RouteBackButton>
      <View className="items-center">
        <ImageBackground
          source={
            mode === "우주추천"
              ? require("../images/cover-generated-universe.png")
              : require("../images/cover-generated.png")
          }
          style={{
            width: "100%",
            height: (height / 100) * 55,
            alignItems: "center",
          }}
          imageStyle={{ resizeMode: "cover", borderRadius: 20 }}
        >
          <Text className="pt-10 text-center text-3xl font-semibold text-white">
            {mode}
          </Text>
          <Text className="pt-4 text-center text-sm font-medium text-white">
            {formatNow()}
          </Text>
          <FlatList
            className="mt-10 flex-row flex-wrap"
            data={numbers}
            extraData={numbers}
            numColumns={6}
            keyExtractor={(_, index) => (index + retry).toString()}
            renderItem={(num) => (
              <Animated.View
                className="mx-1 my-2"
                entering={FadeIn.duration(num.index * 100)}
              >
                <NumberBall number={num.item} width={32}></NumberBall>
              </Animated.View>
            )}
          ></FlatList>
        </ImageBackground>
        <BottomButton
          className="bg-gray_5 mt-[10] py-[14]"
          onPress={() => {
            if (mode == "직접조합") {
              router.push("/selfPick");
              return;
            }
            setRetry((prev) => prev + 1);
            setNumbers(generateNumbersForTimes(mode, 5));
          }}
        >
          다시뽑기
        </BottomButton>
        <BottomButton
          className="bg-point mt-[10] py-[14]"
          onPress={() => setOpenSaveModal((prev) => !prev)}
        >
          번호 저장하기
        </BottomButton>
      </View>
      {openSaveModal && (
        <SaveNumbersModal
          visible={openSaveModal}
          animationType="slide"
          transparent
          onRequestClose={() => setOpenSaveModal(false)}
        ></SaveNumbersModal>
      )}
    </SafeAreaView>
  );
}

function BottomButton(props: BottomButtonProps) {
  const { className, ...rest } = props;
  return (
    <View className={`w-full rounded-[20] ${className}`}>
      <Pressable {...rest}>
        <Text className="text-center text-base font-semibold text-white">
          {props.children}
        </Text>
      </Pressable>
    </View>
  );
}

interface BottomButtonProps extends Omit<PressableProps, "children"> {
  children: string;
}

function SaveNumbersModal(props: ModalProps) {
  const icons = [
    { name: "카카오톡 공유", Icon: IconKakaoTalk },
    { name: "클립보드 복사", Icon: IconClipboard },
    { name: "이미지 저장", Icon: IconSaveImage },
  ];

  return (
    <Modal {...props}>
      <View
        className="relative h-full rounded-t-xl"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View className="absolute bottom-0 w-full rounded-t-3xl bg-[#242429] bg-opacity-50 pb-[138] pt-[106]">
          <Pressable
            className="absolute right-4 top-4"
            onPress={props.onRequestClose}
          >
            <IconClose></IconClose>
          </Pressable>
          <View className="flex-shrink-0 flex-row justify-center gap-[22]">
            {icons.map((item, index) => (
              <View className="flex items-center gap-2.5" key={index}>
                <IconBackground>
                  <item.Icon></item.Icon>
                </IconBackground>
                <Text className="text-center text-white">{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const IconBackground = (props: Omit<ViewProps, "className">) => (
  <View className={`rounded-full bg-white p-3.5`} {...props}></View>
);

const IconClose = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <G
      stroke="#EDEDED"
      strokeLinecap="round"
      strokeWidth={1.778}
      clipPath="url(#a)"
    >
      <Path d="m1.333 1.333 13.2 13.2M14.667 1.333l-13.2 13.2" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

const IconKakaoTalk = (props: SvgProps) => (
  <Svg width={22} height={20} fill="none" {...props}>
    <Path
      fill="#000"
      d="M11 0C4.926 0 0 3.853 0 8.606c0 3.093 2.088 5.803 5.218 7.32-.23.85-.833 3.08-.952 3.556-.15.592.218.583.46.424.189-.124 3.014-2.024 4.232-2.845.663.098 1.345.148 2.042.148 6.074 0 11-3.853 11-8.606C22 3.851 17.074 0 11 0Z"
    />
  </Svg>
);

const IconClipboard = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M14 0a3 3 0 0 1 2.998 2.888L17 3a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3l-.112-.002a3 3 0 0 1-2.886-2.886L0 14V4.5A4.5 4.5 0 0 1 4.5 0H14Zm3 5H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Zm-3-3H5a3 3 0 0 0-3 3v9a1 1 0 0 0 .925.997L3 15V6a3 3 0 0 1 3-3h9a1 1 0 0 0-.925-.997L14 2Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

const IconSaveImage = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M19 12a1 1 0 0 1 .997.925L20 13v1a6 6 0 0 1-5.848 5.998L14 20H6a6 6 0 0 1-5.998-5.848L0 14v-1a1 1 0 0 1 1.997-.075L2 13v1a4 4 0 0 0 3.875 3.998L6 18h8a4 4 0 0 0 3.998-3.875L18 14v-1a1 1 0 0 1 1-1ZM11.69.657l.078.075 4.596 4.596a1 1 0 0 1-1.36 1.465l-.054-.05L11 2.793v11.242a1 1 0 1 1-2 0V2.793l-3.95 3.95a1 1 0 0 1-1.465-1.359l.051-.055L8.232.732A2.5 2.5 0 0 1 11.69.657Z"
      clipRule="evenodd"
    />
  </Svg>
);

function generateNumbersForTimes(
  mode: GenerationMode,
  times: number,
): number[] {
  if (!mode) {
    return [];
  }
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

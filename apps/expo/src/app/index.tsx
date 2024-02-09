import type { ViewProps } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

import NumberBall from "../components/NumberBall";

export default function Index() {
  return (
    <ScrollView className="flex-1 bg-[#1B1C20]">
      <View className="p-4">
        <View className="h-10 flex-row items-center justify-between rounded-3xl bg-[#6E2BFC] px-4">
          <View className="flex-row items-center gap-1">
            <Image source={require("./images/clock.png")}></Image>
            <Text className="text-white">3일 21:05:22</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Image source={require("./images/bell.png")}></Image>
            <Image source={require("./images/bell-arrow.png")}></Image>
          </View>
        </View>
        <View className="mt-6 flex-row items-center gap-2">
          <Text className="text-xl font-semibold text-white">
            로그인 해주세요
          </Text>
          <Image source={require("./images/arrow.png")}></Image>
        </View>
        <BannerCarousel className="mt-5 items-center"></BannerCarousel>
      </View>
      <NumberPickCarousel></NumberPickCarousel>
      <View className="mt-8 h-1 bg-[#474747]"></View>
      <RealtimeNumberThread></RealtimeNumberThread>
    </ScrollView>
  );
}

function BannerCarousel(props: ViewProps) {
  const width = Dimensions.get("window").width;
  const banners = [
    <View className="relative" key={0}>
      <Image
        source={require("./images/banner_1.png")}
        className="h-full w-full rounded-3xl"
      ></Image>
      <Text className="absolute left-[20] top-[18] text-xl font-semibold text-white">
        복권 판매점 쉽게 찾기
      </Text>
      <Text className="absolute left-[20] top-[44] text-base text-white">
        전국 1등 판매점
      </Text>
      <BannerPageNumber num={1}></BannerPageNumber>
    </View>,
    <View
      className="relative flex-1 gap-[10] rounded-3xl bg-[#E2E3FF] px-5 py-[13]"
      key={1}
    >
      <View className="flex-row items-center gap-2">
        <View className="rounded-3xl bg-[#6E2BFC] px-3 py-1">
          <Text className="rounded-3xl text-xl font-bold text-white">
            1,089회
          </Text>
        </View>
        <Text className="text-xl font-semibold">이번주 추첨 번호</Text>
      </View>
      <View className="flex-row gap-[6]">
        <NumberBall number={1}></NumberBall>
        <NumberBall number={11}></NumberBall>
        <NumberBall number={22}></NumberBall>
        <NumberBall number={33}></NumberBall>
        <NumberBall number={44}></NumberBall>
        <NumberBall number={33}></NumberBall>
        <Text>+</Text>
        <NumberBall number={44}></NumberBall>
      </View>
      <BannerPageNumber num={2}></BannerPageNumber>
    </View>,
  ];

  return (
    <View {...props}>
      <Carousel
        loop
        autoPlay
        width={width * 0.9}
        height={100}
        data={banners}
        scrollAnimationDuration={1000}
        renderItem={({ item: banner }) => banner}
      />
    </View>
  );
}

function BannerPageNumber({ num }: { num: number }) {
  return (
    <View className="absolute bottom-[10] right-[10] rounded-full bg-[#00000057] px-[10] py-[3]">
      <Text className="text-xs text-white">{num}/2</Text>
    </View>
  );
}

function NumberPickCarousel() {
  const [indexMode, setIndexMode] = useState(0);
  const refCarousel = useRef<ICarouselInstance>(null);

  const updateIndex = (index: number) => {
    refCarousel.current?.scrollTo({ index: index, animated: true });
    setIndexMode(index);
  };

  const width = Dimensions.get("window").width;
  const modes = [
    {
      name: "직접조합",
      description: "최대 6개 번호를 무작위로 랜덤 추첨합니다.",
      cover: require("./images/cover-random-pick.png"),
    },
    {
      name: "랜덤뽑기",
      description: "최대 6개 번호를 무작위로 랜덤 추첨합니다.",
      cover: require("./images/cover-random-pick.png"),
    },
    {
      name: "우주추천",
      description: "당첨번호와 선호 번호 생성 데이터에 기반한 추천 방식이에요.",
      cover: require("./images/cover-universe-pick.png"),
    },
    {
      name: "미출현 번호",
      description: "한달 간 추첨되지 않은 번호 조합이에요.",
      cover: require("./images/cover-missing-pick.png"),
    },
    {
      name: "짝홀조합",
      description: "짝수, 홀수 조합으로 추첨해드려요.",
      cover: require("./images/cover-odd-even-pick.png"),
    },
    {
      name: "1등 번호기반",
      description: "1등 번호를 기반으로 추첨해드려요.",
      cover: require("./images/cover-first-pick.png"),
    },
  ];

  return (
    <View>
      <ScrollView
        className="max-h-20 bg-black py-3"
        horizontal
        contentContainerStyle={{ gap: 10, alignItems: "center" }}
      >
        {modes.map((mode, index) => (
          <NumberPickButton
            key={index}
            index={index}
            active={index === indexMode}
            onPress={() => updateIndex(index)}
          >
            {mode.name}
          </NumberPickButton>
        ))}
      </ScrollView>
      <View className="relative mt-5 items-center">
        <Carousel
          ref={refCarousel}
          loop
          width={width * 0.9}
          height={420}
          data={modes}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => setIndexMode(index)}
          renderItem={({ index, item }) => (
            <View key={index} className="flex-1 rounded-2xl bg-black p-7">
              <Text className="text-semibold text-2xl text-white">
                {item.name}
              </Text>
              <Text className="mt-1 h-12 text-white">{item.description}</Text>
              {index != 0 ? (
                <View className="flex-1 items-center">
                  <Image
                    source={item.cover}
                    style={{ width: 300, height: 200, borderRadius: 10 }}
                  ></Image>
                  <Pressable className="mt-5 w-full rounded-xl bg-white">
                    <Text className="py-4 text-center font-bold text-black">
                      번호 뽑기
                    </Text>
                  </Pressable>
                </View>
              ) : null}
            </View>
          )}
        />
        <Pressable
          className="absolute left-2 top-1/2 -translate-y-1/2 transform"
          onPress={() => refCarousel.current?.prev()}
        >
          <Image source={require("./images/chevron-left.png")}></Image>
        </Pressable>
        <Pressable
          className="absolute right-2 top-1/2 -translate-y-1/2 transform"
          onPress={() => refCarousel.current?.next()}
        >
          <Image source={require("./images/chevron-right.png")}></Image>
        </Pressable>
      </View>
    </View>
  );
}

function NumberPickButton(
  props: ViewProps & { onPress: () => void; active: boolean; index: number },
) {
  const { onPress, active, index, children } = props;
  return (
    <Pressable onPress={onPress}>
      <View
        className={`justify-center rounded-full border-2 px-3 py-1 align-middle ${
          active ? "bg-[#6E2BFC]" : "bg-[#1B1C20]"
        } ${index == 0 ? "border-dashed border-white" : "border-[#1B1C20]"}`}
        {...props}
      >
        <Text className="text-center align-middle text-sm font-semibold text-white">
          {index != 0 ? children : `${children?.toString()} +`}
        </Text>
      </View>
    </Pressable>
  );
}

function RealtimeNumberThread() {
  return (
    <View className="mt-8 px-4">
      <Text className="text-lg font-semibold text-white">
        실시간 우주 생성 번호
      </Text>
    </View>
  );
}

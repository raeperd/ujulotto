import type { TextProps } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import React, { useRef } from "react";
import {
  Button,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function Index() {
  const width = Dimensions.get("window").width;

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
        <View className="mt-5 items-center">
          <Carousel
            loop
            width={width * 0.9}
            height={100}
            autoPlay={true}
            data={[...new Array(3).keys()]}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ index }) => (
              <View className="flex-1 justify-center rounded-3xl border-2 border-white">
                <Text className="text-semibold text-center text-3xl text-white">
                  {index}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
      <NumberPickCarousel></NumberPickCarousel>
      <View className="mt-8 h-1 bg-[#474747]"></View>
      <View className="mt-8 px-4">
        <Text className="text-white">실시간 우주 생성 번호</Text>
      </View>
    </ScrollView>
  );
}

function NumberPickCarousel() {
  const refCarousel = useRef<ICarouselInstance>(null);
  const width = Dimensions.get("window").width;
  const modes = [
    {
      name: "직접조합",
      description: "최대 6개 번호를 무작위로 랜덤 추첨합니다.",
      cover: require("./images/cover-random-pick.png"),
    },
    {
      name: "랜덤뽑기",
      description: "당첨번호와 선호 번호 생성 데이터에 기반한 추천 방식이에요.",
      cover: require("./images/cover-random-pick.png"),
    },
    {
      name: "우주추천",
      description: "한달 간 추첨되지 않은 번호 조합이에요.",
      cover: require("./images/cover-universe-pick.png"),
    },
    {
      name: "짝홀조합",
      description: "짝수, 홀수 조합으로 추첨해드려요.",
      cover: require("./images/cover-odd-even-pick.png"),
    },
    {
      name: "미출현 번호",
      description: "2개 회차의 1등 번호 조합이에요.",
      cover: require("./images/cover-missing-pick.png"),
    },
  ];

  return (
    <View>
      <ScrollView
        className="max-h-10 bg-black"
        horizontal
        contentContainerStyle={{ gap: 10, alignItems: "center" }}
      >
        {modes.map((mode, index) => (
          <NumberPickButton
            key={index}
            onPress={() =>
              refCarousel.current?.scrollTo({ index: index, animated: true })
            }
          >
            {mode.name}
          </NumberPickButton>
        ))}
      </ScrollView>
      <View className="mt-5 items-center">
        <Carousel
          ref={refCarousel}
          loop
          width={width * 0.9}
          height={400}
          data={modes}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ index, item }) => (
            <View
              key={index}
              className="flex-1 rounded-3xl border-2 border-white bg-black p-7"
            >
              <Text className="text-semibold text-2xl text-white">
                {item.name}
              </Text>
              <Text className="mt-1 text-white">{item.description}</Text>
              <Image
                source={item.cover}
                style={{ width: 300, height: 200, borderRadius: 10 }}
              ></Image>
              <Button onPress={() => alert("todo")} title="번호뽑기"></Button>
            </View>
          )}
        />
      </View>
    </View>
  );
}

function NumberPickButton(props: TextProps & { onPress: () => void }) {
  const { className, children } = props;
  return (
    <Pressable onPress={() => alert(children)}>
      <Text
        className={`justify-center rounded-full bg-[#1B1C20] px-3 py-2 align-middle text-white ${className}`}
        {...props}
      >
        {children}
      </Text>
    </Pressable>
  );
}

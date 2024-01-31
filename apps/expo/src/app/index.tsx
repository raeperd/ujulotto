import type { TextProps } from "react-native";
import React from "react";
import {
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
  const width = Dimensions.get("window").width;

  return (
    <View>
      <ScrollView
        className="max-h-10 bg-black"
        horizontal
        contentContainerStyle={{ gap: 10, alignItems: "center" }}
      >
        <NumberPickButton>직접조합</NumberPickButton>
        <NumberPickButton>랜덤뽑기</NumberPickButton>
        <NumberPickButton>우주추천</NumberPickButton>
        <NumberPickButton>미출현 번호</NumberPickButton>
        <NumberPickButton>짝홀조합</NumberPickButton>
      </ScrollView>
      <View className="mt-5 items-center">
        <Carousel
          loop
          width={width * 0.9}
          height={250}
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
  );
}

function NumberPickButton(props: TextProps) {
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

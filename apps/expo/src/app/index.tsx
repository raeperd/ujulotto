import { Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <ScrollView className="h-screen flex-1 bg-[#1B1C20] px-4">
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
    </ScrollView>
  );
}

import type { Dispatch, SetStateAction } from "react";
import type { ViewProps } from "react-native";
import React, { useState } from "react";
import { Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RouteBackButton from "../components/RouteBackButton";

export default function Notification() {
  const [enabled, setEnabled] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  return (
    <SafeAreaView className="flex-1 bg-black px-4">
      <RouteBackButton>알림설정</RouteBackButton>
      <View className="relative">
        <Switch
          className="absolute right-[0]"
          value={enabled}
          onValueChange={() => setEnabled((prev) => !prev)}
          trackColor={{ true: "#6E2bfc", false: "#474747" }}
          ios_backgroundColor="#474747"
        ></Switch>
        <View className="absolute left-0 right-0 top-[94] m-auto">
          <View className={`${enabled ? "" : "opacity-20"}`}>
            <Text className="text-center text-xl font-semibold text-white">
              매주 토요일
            </Text>
            <Text
              className="mt-2.5 text-center font-bold text-white"
              style={{ fontSize: 40 }}
            >{`${hour.toString().padStart(2, "0")}:${minute
              .toString()
              .padStart(2, "0")}`}</Text>
          </View>
          <NotificationSettingsView
            className="mt-[80] w-full items-center rounded-[14] bg-white py-[30]"
            hour={hour}
            setHour={setHour}
            minute={minute}
            setMinute={setMinute}
          ></NotificationSettingsView>
          <NoticeView className="bg-gray_5 mt-3 w-full rounded-[14] py-[13] pl-[10]"></NoticeView>
        </View>
      </View>
    </SafeAreaView>
  );
}

function NotificationSettingsView(props: NotificationSettingsProps) {
  const { hour, setHour, minute, setMinute, ...rest } = props;
  return (
    <View className="absolute" {...rest}>
      <Text className="font-medium">판매 마감시간 기준</Text>
      <Text>시간 분 전</Text>
      <Text className="font-medium">알림을 받을게요.</Text>
    </View>
  );
}

interface NotificationSettingsProps extends ViewProps {
  hour: number;
  setHour: Dispatch<SetStateAction<number>>;
  minute: number;
  setMinute: Dispatch<SetStateAction<number>>;
}

function NoticeView(props: ViewProps) {
  return (
    <View {...props}>
      <Text className="text-sm text-[#bcbdc1]">
        - 판매 마감 시간: 매주 토요일 오후 8시
      </Text>
      <Text className="text-sm text-[#bcbdc1]">
        - 알림 시간 도달 시 알림이 발송됩니다.
      </Text>
    </View>
  );
}

import type { Dispatch, SetStateAction } from "react";
import type { ViewProps } from "react-native";
import React, { useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
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
            className={`${
              enabled ? "" : "opacity-20"
            } mt-[80] w-full items-center rounded-[14] bg-[#ededed] py-[30]`}
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

function NotificationSettingsView({
  hour,
  setHour,
  minute,
  setMinute,
  className,
  ...rest
}: NotificationSettingsProps) {
  return (
    <View className={`${className}`} {...rest}>
      <Text className="font-medium">판매 마감시간 기준</Text>
      <View className="flex-row items-center gap-1">
        <DropdownComponent hour={hour} setHour={setHour}></DropdownComponent>
        <Text>시간</Text>
        <View></View>
        <MinuteView minute={minute} setMinute={setMinute}></MinuteView>
        <Text>분 전</Text>
      </View>
      <Text className="font-medium">알림을 받을게요.</Text>
    </View>
  );
}

const DropdownComponent = ({
  hour,
  setHour,
  ...rest
}: ViewProps & {
  hour: number;
  setHour: Dispatch<SetStateAction<number>>;
}) => {
  const hours = Array.from({ length: 4 }, (_, i) => ({
    label: i.toString(),
    value: i.toString(),
  }));

  return (
    <View className="w-[50] bg-[#ededed]" {...rest}>
      <Dropdown
        style={{
          borderColor: "#6e2bfc",
          backgroundColor: "#6E2bfc",
          borderRadius: 8,
        }}
        selectedTextStyle={{ color: "white", textAlign: "center" }}
        iconStyle={{ display: "none" }}
        renderItem={(item, selected) => {
          return (
            <View
              className={`${
                selected ? "bg-point" : "bg-white"
              } border-point flex justify-center rounded-[8] p-2`}
              style={{ borderWidth: 1 }}
            >
              <Text
                className={`${
                  selected ? "text-white" : "text-point"
                } text-center font-semibold`}
              >
                {item.value}
              </Text>
            </View>
          );
        }}
        value={hour.toString()}
        data={hours}
        maxHeight={300}
        labelField="label"
        valueField="value"
        onChange={(item) => setHour(parseInt(item.value, 10))}
      />
    </View>
  );
};

function MinuteView(
  props: ViewProps & {
    minute: number;
    setMinute: Dispatch<SetStateAction<number>>;
  },
) {
  const { className, minute, setMinute, ...rest } = props;
  return (
    <View className={`flex-row bg-white ${className}`} {...rest}>
      {[0, 30].map((m) => (
        <Pressable
          key={m}
          onPress={() => setMinute(m)}
          className={`${
            m == minute ? "bg-point" : "bg-[#EDEDED]"
          } rounded-[4] px-5 py-[4.5]`}
        >
          <Text
            className={`${
              minute == m ? "text-white" : "text-gray_4"
            } text-xl font-medium`}
          >
            {m}
          </Text>
        </Pressable>
      ))}
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

import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notification() {
  return (
    <SafeAreaView className="bg-gray_5 flex-1">
      <Text className="text-white">알림 설정</Text>
    </SafeAreaView>
  );
}

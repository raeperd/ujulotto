import { SafeAreaView } from "react-native-safe-area-context";

import RouteBackButton from "../components/RouteBackButton";

export default function Notification() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <RouteBackButton>알림설정</RouteBackButton>
    </SafeAreaView>
  );
}

import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function GeneratedNumber() {
  const { mode } = useLocalSearchParams<{ mode: string }>();
  return <Text>{mode}</Text>;
}

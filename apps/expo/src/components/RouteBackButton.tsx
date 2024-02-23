import type { PressableProps } from "react-native";
import { Pressable, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";

export default function RouteBackButton(props: RouteBackButtonProps) {
  const { className, ...rest } = props;
  return (
    <Pressable
      onPress={() => router.back()}
      className={`flex-row gap-1 py-4 ${className}`}
      {...rest}
    >
      <Svg width={24} height={24} fill="none">
        <Path
          fill="#fff"
          fillRule="evenodd"
          d="M9.89 15.642c.45.42.405 1.062-.101 1.435-.484.357-1.214.338-1.67-.032l-.06-.052L.38 9.833c-.508-.475-.508-1.19 0-1.665l7.677-7.16c.45-.42 1.225-.457 1.73-.085.485.357.547.96.158 1.38l-.055.055-6.824 6.365a.366.366 0 0 0 0 .555l6.824 6.364Z"
          clipRule="evenodd"
        />
      </Svg>
      {props.children ? (
        <Text className="text-base font-medium text-white">
          {props.children}
        </Text>
      ) : null}
    </Pressable>
  );
}

interface RouteBackButtonProps extends Omit<PressableProps, "onPress"> {
  children?: string;
}

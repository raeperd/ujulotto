import type { SvgProps } from "react-native-svg";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { Link } from "expo-router";

export default function Login() {
  return (
    <SafeAreaView className="relative flex-1 items-center bg-black px-4 py-[150]">
      <IconLogin></IconLogin>
      <Text className="mt-[27] text-center text-2xl text-white">
        당신의 로또 1등 번호,{"\n"}우주로또에서 뽑아가세요!
      </Text>
      <View className="relative bottom-[-300] w-full items-center">
        <View className="w-full flex-row items-center justify-center gap-[10] bg-[#FEE500] py-[18]">
          <IconKakaoTalk></IconKakaoTalk>
          <Text className="text-center text-lg font-semibold">
            카카오로 계속하기
          </Text>
        </View>
        <Link className="mt-[20] text-white underline" href={"/"}>
          비회원으로 둘러보기
        </Link>
      </View>
    </SafeAreaView>
  );
}

const IconLogin = (props: SvgProps) => (
  <Svg width={85} height={25} fill="none" {...props}>
    <Circle cx={12.5} cy={12.5} r={12.5} fill="#FFDD52" />
    <Circle cx={32.5} cy={12.5} r={12.5} fill="#4443F6" />
    <Circle cx={52.5} cy={12.5} r={12.5} fill="#FF2323" />
    <Circle cx={72.5} cy={12.5} r={12.5} fill="#62EB5E" />
  </Svg>
);

const IconKakaoTalk = (props: SvgProps) => (
  <Svg width={22} height={20} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#000"
        d="M11 0C4.926 0 0 3.853 0 8.606c0 3.093 2.088 5.803 5.218 7.32-.23.85-.833 3.08-.952 3.556-.15.592.218.583.46.424.189-.124 3.014-2.024 4.232-2.845.663.098 1.345.148 2.042.148 6.074 0 11-3.853 11-8.606C22 3.851 17.074 0 11 0Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect width={22} height={20} fill="#fff" rx={4} />
      </ClipPath>
    </Defs>
  </Svg>
);

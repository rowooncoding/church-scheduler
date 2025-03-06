import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: "로그인" }} />
      <Stack.Screen name="signup" options={{ title: "회원가입" }} />
      <Stack.Screen name="(tabs)"/>
    </Stack>
  );
}

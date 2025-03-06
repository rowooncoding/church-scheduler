import { Stack } from "expo-router";
import { Provider } from 'react-redux';
import { store } from "../redux/store";

export default function RootLayout() {
  return (
    <Provider store={store}>      
      <Stack>
        <Stack.Screen name="login" options={{ title: "로그인" }} />
        <Stack.Screen name="signup" options={{ title: "회원가입" }} />
        <Stack.Screen name="(tabs)"/>
      </Stack>
    </Provider>
  );
}

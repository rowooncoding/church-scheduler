import { ActivityIndicator, View } from "react-native";
import useCheckLogin from '@/hooks/useCheckLogin';

export default function Index() {
  useCheckLogin();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
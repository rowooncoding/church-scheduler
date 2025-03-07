import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt_token"); // ✅ jwt_token으로 수정

        if (isMounted) {
          if (token) {
            router.replace("/(tabs)"); // ✅ 로그인 되어 있으면 홈으로 이동
          } else {
            router.replace("/login"); // ✅ 로그인 안 되어 있으면 로그인 페이지로 이동
          }
        }
      } catch (error) {
        console.error("AsyncStorage Error!", error);
        if (isMounted) {
          router.replace("/login");
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();
  const [isLoading, setisLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      try {
        const token: string | null = await AsyncStorage.getItem("jwt_token");

        if (token) {
          router.replace("/(tabs)"); // 로그인이 되어 있다면 메인페이지로 이동
        } else {
          router.replace("/login"); // 로그인이 풀렸거나 로그인 한적이 없으면 로그인 페이지로 이동
        }
      } catch (error) {
        console.error('AsyncStorage Error!', error);
        router.replace("/login");
      } finally {
        setisLoading(false); // 로그인이 정상적으로 되었다면 로딩 멈춤
      }
    }

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return null;
}

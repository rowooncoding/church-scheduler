import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function useCheckLogin() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt_token");

        if (token) {
          // ✅ 서버에서 유저 정보 가져오기
          const response = await fetch("https://church-scheduler-server.onrender.com/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const userData = await response.json();
            console.log("저장된 유저 데이터", userData);
            dispatch(setUser(userData)); // ✅ Redux에 유저 정보 저장
            if (isMounted) router.replace("/(tabs)"); // ✅ 홈으로 이동
          } else {
            if (isMounted) router.replace("/login");
          }
        } else {
          if (isMounted) router.replace("/login");
        }
      } catch (error) {
        console.error("자동 로그인 오류:", error);
        if (isMounted) router.replace("/login");
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch, router]);
}
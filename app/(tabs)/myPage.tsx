import Button from '@/component/Button';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch } from "react-redux";
import { logoutUser } from '@/redux/authSlice';
import { AppDispatch } from '@/redux/store';

const MyPageScreen: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async() => {
    try {
      // 저장된 토큰 삭제
      await dispatch(logoutUser());

      // 로그인 화면으로 이동
      router.replace("/login");
    } catch (error) {
      Alert.alert("로그아웃 오류", "로그아웃 중 오류가 발생했습니다.");
    }
  }

  return (
    <View style={styles.container}>
      <Button 
        name="logout"
        onPress={handleLogout}
        loading={false}
        style={styles.customSignoutButton}
        textStyle={styles.customText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  customLoginButton: {
    width: "80%",
  },
  customSignoutButton: {
    width: "80%",
  },
  customText: {
    fontSize: 18,
  },
});

export default MyPageScreen;
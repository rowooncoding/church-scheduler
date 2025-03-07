import Button from '@/component/Button';
import { loginUser } from '@/redux/authSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Image, Pressable, Alert, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from 'react-redux';

const logo = require("@/assets/images/ahaba-logo.png");

const LoginScreen: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("오류", "이메일과 비밀번호를 입력해주세요.");
      return;
    }

    console.log("🚀 로그인 요청 시작");

    const resultAction = await dispatch(loginUser({ email, password }));

    console.log("🔥 Redux 액션 실행 완료:", resultAction);

    if (loginUser.fulfilled.match(resultAction)) {
      console.log("✅ 로그인 성공! 홈 화면으로 이동");
      Alert.alert("로그인 성공!", "홈 화면으로 이동합니다.");
      router.replace("/(tabs)"); // ✅ 로그인 성공 시 홈으로 이동
    } else {
      console.log("❌ 로그인 실패: ", resultAction.payload);
      Alert.alert("로그인 실패", typeof resultAction.payload === 'string' ? resultAction.payload : "로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.avoidContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Image source={logo} style={styles.logo} />
            <TextInput style={styles.inputs} placeholder="이메일" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <TextInput style={styles.inputs} placeholder="비밀번호" value={password} onChangeText={setPassword} secureTextEntry />
            <Button name='login' onPress={handleLogin} disabled={loading} />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <Link href="/signup" style={styles.signupText}>회원가입</Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  avoidContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    backgroundColor: "#FAFAFA",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5, 
    elevation: 3,
  },
  inputs: {
    width: "100%",
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  logo: {
    width: 400,
    height: 100,
  },
  loginButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  signupText: {
    color: "#808080", // 회색
    fontSize: 14,
    marginTop: 20,
    textDecorationLine: "underline", // 밑줄
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default LoginScreen;
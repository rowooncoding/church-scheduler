import Button from '@/component/Button';
import { registerUser } from '@/redux/authSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Image, Pressable, Alert, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from 'react-redux';

const logo = require("@/assets/images/ahaba-logo.png");

const SignupScreen: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("모든 항목을 입력해주세요");
      return;
    }

    // 리덕스 액션 실행 (회원가입)
    const resultAction = await dispatch(registerUser({ name, email, password }));

    if (registerUser.fulfilled.match(resultAction)) {
      Alert.alert("회원가입 성공", "로그인 페이지로 이동합니다.");
      router.replace("/login");
    } else if (registerUser.rejected.match(resultAction)) {
      Alert.alert("회원가입 실패", typeof resultAction.payload === 'string' ? resultAction.payload : "회원가입 중 오류가 발생하였습니다. 관리자에게 문의하세요");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.avoidContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Image source={logo} style={styles.logo} />
            <TextInput style={styles.inputs} placeholder="이름" value={name} onChangeText={setName} />
            <TextInput style={styles.inputs} placeholder="이메일" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <TextInput style={styles.inputs} placeholder="비밀번호" value={password} onChangeText={setPassword} secureTextEntry />
            <Button name='signup' onPress={handleSignup} disabled={loading} />
            {error && <Text style={styles.errorText}>{error}</Text>}
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
  signupButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  signupButtonText: {
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

export default SignupScreen;
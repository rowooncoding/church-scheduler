import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Image, Pressable } from "react-native";

const logo = require("@/assets/images/ahaba-logo.png");

const LoginScreen: React.FC = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.avoidContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Image source={logo} style={styles.logo} />
            <TextInput style={styles.inputs} placeholder="이메일" />
            <TextInput style={styles.inputs} placeholder="비밀번호" secureTextEntry />
            <Pressable style={styles.loginButton}>
              <Text style={styles.loginButtonText}>로그인</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.signupText}>회원가입</Text>
            </Pressable>
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
});

export default LoginScreen;
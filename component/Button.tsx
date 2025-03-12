import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

interface ButtonProps {
  name: 'login'|'signup'|'logout'|'default';
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  name,
  onPress,
  loading = false,
  disabled = false,
  style = {},
  textStyle = {}, 
}) => {
  const { title, defaultStyle } = (() => {
    switch (name) {
      case 'login':
        return { title: '로그인', defaultStyle: styles.loginButton };
      case 'signup':
        return { title: '회원가입', defaultStyle: styles.signupButton };
      case 'logout':
        return { title: '로그아웃', defaultStyle: styles.logoutButton };
      default:
        return { title: '버튼', defaultStyle: styles.defaultButton };
    }
  })();

  return (
    <Pressable
      style={[defaultStyle, style, (disabled || loading) && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  loginButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  signupButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  defaultButton: {
    backgroundColor: "#6c757d", // 회색 (기본 버튼)
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Button;

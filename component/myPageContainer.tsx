import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  style?: object;
}

const MyPageContainer: React.FC<CustomTextInputProps> = ({ style, ...props }) => {
    return <View style={[styles.container, style]} {...props}>
      <Text>hello</Text>
    </View>
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: "#D3D3D3",
  },
})

export default MyPageContainer;
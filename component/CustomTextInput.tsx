import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  style?: object;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ style, ...props }) => {
    return <TextInput style={[styles.inputs, style]} {...props} />
}

const styles = StyleSheet.create({
  inputs: {
    width: "100%",
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
})

export default CustomTextInput;
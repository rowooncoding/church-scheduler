import { ReactNode } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface MyPageConainerProps {
  children?: ReactNode;
  style?: object;
}

const MyPageContainer: React.FC<MyPageConainerProps> = ({ style, children,...props}) => {
    return (
      <View style={[styles.container, style]} {...props}>
        <Text>{children}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
  },
})

export default MyPageContainer;
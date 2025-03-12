import { ReactNode } from 'react';
import { StyleSheet, Text, TextInputProps, View } from 'react-native'

interface LabeledInputProps {
  label: string;
  children: ReactNode;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'column',
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
})

export default LabeledInput;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyPageScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>내정보 화면</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyPageScreen;
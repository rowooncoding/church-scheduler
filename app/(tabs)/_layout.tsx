import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{
          title: '일정',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='calendar' size={size} color={color} /> 
          )
        }} 
      />
      <Tabs.Screen 
        name="myPage" 
        options={{
          title: '내정보',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='person' size={size} color={color} /> 
          )
        }} 
      />
    </Tabs>
  );
}

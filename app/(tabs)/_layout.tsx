import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: '일정' }} />
      <Tabs.Screen name="myPage" options={{ title: '내정보' }} />
    </Tabs>
  );
}

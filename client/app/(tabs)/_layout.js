import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: true, 
      tabBarActiveTintColor: '#28A745' 
    }}>
      <Tabs.Screen 
        name="explore" 
        options={{ title: 'Dashboard' }} 
      />
      <Tabs.Screen 
        name="index" 
        options={{ title: 'Settings' }} 
      />
    </Tabs>
  );
}
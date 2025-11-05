import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name="Home" options={{ headerShown: false }}></Tabs.Screen>
      <Tabs.Screen name="Tutor" options={{ headerShown: false }}></Tabs.Screen>
      <Tabs.Screen
        name="Profile"
        options={{ headerShown: false }}
      ></Tabs.Screen>
    </Tabs>
  );
}

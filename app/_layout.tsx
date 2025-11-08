import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="(tabs)" options={{headerShown: false}}></Stack.Screen>
    <Stack.Screen name="lessons" options={{headerTitle: "All Lessons"}}></Stack.Screen>
  </Stack>;
}

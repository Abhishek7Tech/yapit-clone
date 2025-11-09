import { Stack } from "expo-router";

export default function LessonsLayout() {
 return (
    <Stack>
      <Stack.Screen name="lesson" options={{headerShown: false}}></Stack.Screen>
    </Stack>
 )   
}
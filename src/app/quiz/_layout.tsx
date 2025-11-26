import { Stack } from "expo-router";

export default function QuizLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[params]"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}

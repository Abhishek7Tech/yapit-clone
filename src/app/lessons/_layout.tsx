import { Stack } from "expo-router";

export default function AllLessonsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="allLessons"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}

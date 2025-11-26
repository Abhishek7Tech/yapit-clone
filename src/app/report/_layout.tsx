import { Stack } from "expo-router";

export default function ReportLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="report"
        options={{
         headerShown: false
        }}
      ></Stack.Screen>
    </Stack>
  );
}

import { Stack } from "expo-router";

export default function AgentsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
    
      <Stack.Screen
        name="[agent]"
        options={{
          headerShown: false
        }}
      ></Stack.Screen>
    </Stack>
  );
}

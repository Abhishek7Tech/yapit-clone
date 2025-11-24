import { AntDesign } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";
import Styles from "../../../utils/styles";

export default function AgentsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      {/* <Stack.Screen
        name="agents"
        options={{
         headerShown: false
        }}
      ></Stack.Screen> */}
      <Stack.Screen
        name="[agent]"
        options={{
          headerShown: false
        }}
      ></Stack.Screen>
    </Stack>
  );
}

import { router, Stack } from "expo-router";
import Styles from "../utils/styles";
import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

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

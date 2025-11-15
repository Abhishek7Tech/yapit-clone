import { router, Stack } from "expo-router";
import Styles from "../utils/styles";
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

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

import Styles from "@/app/utils/styles";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function TutorLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"  options={{
          headerShown: false,
        }}></Stack.Screen>
    </Stack>
  );
}

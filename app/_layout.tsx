import { router, Stack } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import Styles from "./utils/styles";
import { AntDesign } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="lessons"
        options={{
          headerTitle: "All Lessons",
          headerStyle: { backgroundColor: Styles.backgroundColor },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "600",
            color: Styles.textSecondary,
          },
          headerLeft: () => (
            <Pressable
              style={{ paddingRight: 12 }}
              onPress={() => router.back()}
            >
              <AntDesign name="left" size={20} color={Styles.textSecondary} />
            </Pressable>
          ),
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="lesson"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="report"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}

import Styles from "@/src/utils/styles";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function TutorLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="agents"
        options={{
           headerTitle: "Choose Your Tutor Level",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Styles.backgroundColor },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "600",
            color: Styles.textSecondary,
          },
          headerLeft: () => (
            <Pressable
              style={{ paddingRight: 12 }}
              onPress={() => router.navigate("/(tabs)/home")}
            >
              <AntDesign name="left" size={20} color={Styles.textSecondary} />
            </Pressable>
          ),
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="[agent]"
        options={{
          headerTitle: "Live Chat",
          headerTitleAlign: "center",
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
    </Stack>
  );
}

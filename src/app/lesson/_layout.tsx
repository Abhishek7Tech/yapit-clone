import { AntDesign } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";
import Styles from "../../utils/styles";

export default function LessonsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[index]"
        // options={{ headerShown: false }}
        options={{
          headerTitle: " ",
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

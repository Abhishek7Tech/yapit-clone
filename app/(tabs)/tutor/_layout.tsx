import Styles from "@/app/utils/styles";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function TutorLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"  options={{
          headerTitle: "Tutor",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Styles.backgroundColor },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "700",
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
        }}></Stack.Screen>
    </Stack>
  );
}

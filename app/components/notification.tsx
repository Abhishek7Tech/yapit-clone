import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Pressable, StatusBar } from "react-native";
import Styles from "../utils/styles";

export function Notifications() {
  return (
    <View style={styles.notificationsComponent}>
        <Ionicons
          name="notifications-circle-outline"
          size={24}
          color={"#3B82F6"}
        />
        <Text style={styles.notificationsText}>
          Finish 5 more lessons to unlock the quiz.
        </Text>
        <Pressable>
          <Text style={styles.buttonText}>x</Text>
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  notificationsComponent: {
    position: "absolute",
    top: 26,
    zIndex: 1000,
    insetInline: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: 240,
    maxWidth: 448,
    borderBottomWidth: 2,
    borderRightWidth: 1,
    borderColor: "#e3ded3",
    backgroundColor: Styles.backgroundColor,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    marginVertical: 8,
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },
  notificationsText: {
    fontSize: 14,
    fontWeight: "500",
  },
  buttonText: {
    fontSize: 14,
    color: Styles.backgroundSecondary,
  },
});

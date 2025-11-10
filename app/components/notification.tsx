import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Animated,
} from "react-native";

import Styles from "../utils/styles";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export default function Notifications({
  handleNotifications,
  notification,
  message,
}: {
  message: String;
  notification: Boolean;
  handleNotifications: Dispatch<SetStateAction<boolean>>;
}) {
  const zIndexValue = useRef(new Animated.Value(-1)).current;
  const distanceFromTop = useRef(new Animated.Value(0)).current;
  const handleNotification = () => {
    Animated.timing(distanceFromTop, {
      toValue: 0,
      duration: 10,
      useNativeDriver: true,
    }).start();

    Animated.timing(zIndexValue, {
      toValue: 0,
      duration: 10,
      useNativeDriver: true,
    }).start();
    handleNotifications(!notification);
  };
  
  useEffect(() => {
    Animated.timing(distanceFromTop, {
      toValue: 2,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(zIndexValue, {
      toValue: 100,
      duration: 1,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(distanceFromTop, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(zIndexValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      handleNotifications(!notification);
    }, 5000);
    console.log("Notification", notification);
  }, [notification]);

  return (
    <Animated.View
      style={[
        styles.notificationsComponent,
        { zIndex: zIndexValue, transform: [{ translateY: distanceFromTop }] },
      ]}
    >
      <Ionicons
        name="notifications-circle-outline"
        size={24}
        color={"#3B82F6"}
      />
      <Text style={styles.notificationsText}>{message}</Text>
      <Pressable onPress={() => handleNotification()}>
        <Text style={styles.buttonText}>x</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  notificationsComponent: {
    position: "absolute",
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

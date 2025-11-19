import { Feather, FontAwesome, Fontisto, Ionicons } from "@expo/vector-icons";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text
} from "react-native";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import useNotificationStore from "../../store/thanksNotification";
import Styles from "../../utils/styles";

export default function Notifications({
  handleNotifications,
  notification,
  message,
  icon,
}: {
  message: String;
  notification: Boolean;
  handleNotifications: Dispatch<SetStateAction<boolean>>;
  icon: string;
}) {
  const zIndexValue = useRef(new Animated.Value(-1)).current;
  const distanceFromTop = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const store = useNotificationStore();
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

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

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

    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

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
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
      handleNotifications(!notification);
      if (store.thanksNotification) {
        store.toggleThanksNotification(false);
      }
    }, 5000);
  }, [notification]);

  return (
    <Animated.View
      style={[
        styles.notificationsComponent,
        { zIndex: zIndexValue, transform: [{ translateY: distanceFromTop }] },
      ]}
    >
      {icon === "notification" && (
        <Ionicons
          name="notifications-circle-outline"
          size={24}
          color={"#3B82F6"}
        />
      )}
      {icon === "alert" && (
        <Feather name="alert-triangle" size={24} color="#DC2626" />
      )}

      {icon === "submit" && (
        <Animated.View style={{ transform: [{ rotate: rotate }] }}>
          <Fontisto name="circle-o-notch" size={24} color="#FFC12E" />
        </Animated.View>
      )}

      {icon === "thanks" && (
        <FontAwesome name="check-circle" size={24} color="#FFC12E" />
      )}

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

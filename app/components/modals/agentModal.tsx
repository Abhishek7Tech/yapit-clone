import Styles from "@/app/utils/styles";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  View,
  StyleSheet,
  Text,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AgentModal({
  switchChatMethod,
  switchToChat,
  modelHandler,
}: {
  switchChatMethod: () => void;
  switchToChat: boolean;
  modelHandler: () => void;
}) {
  const slideAnim = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
    }).start()
  },[])

  return (
    <View style={styles.agentsModelContainer}>
      <Pressable style={{flex: 1}} onPress={() => modelHandler()}>
        <View></View>
      </Pressable>
      
      <Animated.View
        style={[
          styles.switchChatModal,

          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.modalWall}></View>
        <Text style={styles.modalHeading}>
          Switch To {switchToChat ? "Live Service?" : "Text?"}
        </Text>
        <Text style={styles.modalSubHeading}>
          You are about to switch to {switchToChat ? "Live Service" : "Text"}.
          You will be able to interact with our live chat agents. Starting{" "}
          {switchToChat ? "Live Service" : "Text"} will begin a new conversation
          and clear your current chat history.
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => switchChatMethod()}
            style={styles.switchButton}
          >
            <Text style={styles.switchButtonText}>Switch</Text>
          </Pressable>
          <Pressable onPress={() => modelHandler()} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
    agentsModelContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        flex: 1,
        backgroundColor: "transparent",
        zIndex: 400,
        justifyContent: "flex-end"
    },
  switchChatModal: {
    minHeight: 280,
    width: "100%",
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "white",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    alignItems: "center",
  },
  modalWall: {
    height: 4,
    width: 48,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: "#0000001A",
    marginBottom: 16,
  },
  modalHeading: {
    fontSize: 30,
    color: Styles.textSecondary,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalSubHeading: {
    fontSize: 14,
    color: Styles.textSecondary,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  buttonContainer: {
    marginTop: 16,
    gap: 8,
    width: "100%"
  },
  switchButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Styles.backgroundSecondary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  switchButtonText: {
    color: "white",
    fontWeight: "500",
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    color: Styles.textSecondary,
  },
});

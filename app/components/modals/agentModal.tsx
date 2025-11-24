import Styles from "@/app/utils/styles";
import { useRef } from "react";
import { Animated, Pressable, View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AgentModal() {
  const slideAnim = useRef(new Animated.Value(200)).current;

  return (
    <SafeAreaView>
      <Pressable>
        <View></View>
      </Pressable>
      <Animated.View
        style={[
          styles.switchChatModal,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.modalWall}></View>
        <Text style={styles.modalHeading}>Switch To Text?</Text>
        <Text style={styles.modalSubHeading}>
          You are about to switch to Live Service. You will be able to interact
          with our live chat agents. Starting Live Service will begin a new
          conversation and clear your current chat history.
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.switchButton}>
            <Text style={styles.switchButtonText}>Switch</Text>
          </Pressable>
          <Pressable style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  switchChatModal: {
    minHeight: 358,
    width: "100%",
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 16,
    paddingLeft: 20,
    backgroundColor: "white",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
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

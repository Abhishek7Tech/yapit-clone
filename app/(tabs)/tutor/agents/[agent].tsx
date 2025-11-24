import { ImageBackground } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../../../utils/styles";
import { useEffect, useState } from "react";
import useTabsStore from "@/app/store/tabsStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AgentModal from "@/app/components/modals/agentModal";
const TutorImg = require("@/assets/images/tutor.png");

export default function Agent() {
  const params = useLocalSearchParams();
  const tabStore = useTabsStore();
  const [switchToChat, setSwitchTChat] = useState(false);
  console.log("Agent params", tabStore.showTabs);
  useEffect(() => {
    tabStore.setShowTabs(true);
  }, []);
  const chatOptionsHandler = () => {
    setSwitchTChat(!switchToChat);
  };


  return (
    <View style={styles.container}>
      <ImageBackground
        imageStyle={styles.imageStyles}
        source={TutorImg}
        style={styles.imageContainer}
      >
        <View style={styles.sessionTimerContainer}>
          <Text>You have 3:00 left in your tutor session.</Text>
        </View>
        <SafeAreaView>
          <View style={styles.recordingContainer}>
            <TextInput
              readOnly={switchToChat ? false : true}
              style={styles.recordingContainerText}
              placeholder="Live mode - press Start to begin."
            ></TextInput>
            <View style={styles.recordingButtonsContainer}>
              <View style={styles.chatOptionsContainer}>
                <Pressable
                  onPress={() => chatOptionsHandler()}
                  style={styles.switchChatOptionsContainer}
                >
                  <View style={switchToChat ? styles.activeChatOption : {}}>
                    <AntDesign
                      name="message"
                      size={20}
                      color={switchToChat ? "white" : "#00000066"}
                    />
                  </View>
                  <View style={switchToChat ? {} : styles.activeChatOption}>
                    <Feather
                      name="mic"
                      size={20}
                      color={!switchToChat ? "white" : "#00000066"}
                    />
                  </View>
                </Pressable>
              </View>
              <Pressable style={styles.recordingButton}>
                <View>
                  <FontAwesome name="microphone" size={24} color="white" />
                </View>
                <Text style={styles.recordingButtonText}>Record</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
        <AgentModal/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.backgroundColor,
    paddingHorizontal: 16,
  },
  imageContainer: {
    flex: 1,
  },
  imageStyles: {
    opacity: 0.14,
    resizeMode: "contain",
  },
  sessionTimerContainer: {
    backgroundColor: "#fdfbfa",
    paddingVertical: 4,
    boxShadow: "0 1px 3px 0 var(#0000001a),0 1px 2px -1px var(#0000001a)",
  },
  sessionTimerText: {
    color: Styles.textSecondary,
    fontWeight: "600",
    textAlign: "left",
    fontSize: 12,
  },
  recordingContainer: {
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: 16,
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    alignContent: "flex-end",
    gap: 12,
  },
  recordingContainerText: {
    minHeight: 60,
    borderRadius: 6,
    fontWeight: "600",
  },
  recordingButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  chatOptionsContainer: {
    flexDirection: "row",
  },
  switchChatOptionsContainer: {
    flexDirection: "row",
    height: 40,
    width: 84,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#0000001A",
    backgroundColor: "white",
    paddingHorizontal: 4,
    gap: 8,
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },

  activeChatOption: {
    backgroundColor: Styles.backgroundTertiary,
    height: 32,
    width: 38,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  recordingButton: {
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#EF4444",
  },
  recordingButtonText: {
    color: "white",
    fontSize: 14,
  },
});

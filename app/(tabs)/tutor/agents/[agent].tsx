import { ImageBackground } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../../../utils/styles";
import { useEffect, useState } from "react";
import useTabsStore from "@/app/store/tabsStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AgentModal from "@/app/components/modals/agentModal";
import Octicons from "@expo/vector-icons/Octicons";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { speak } from "expo-speech";
const TutorImg = require("@/assets/images/tutor.png");

type Chat = {
  sender: "user" | "agent";
  message: String;
};

const meesagesDummyData = [
  { sender: "user", message: "Hi" },
  {
    sender: "agent",
    message:
      "Ola, I am Sophia your teacher. Agent is not integrated yet. Please stop the recording.",
  },
];
console.log("ImageBackground is", ImageBackground);

export default function Agent() {
  const params = useLocalSearchParams();
  const tabStore = useTabsStore();
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const [switchToChat, setSwitchTChat] = useState(false);
  const [text, setText] = useState<string | "">("");
  const [messages, setMessages] = useState<Chat[] | []>([]);
  const [showModal, setShowModal] = useState(false);
  console.log("Agent params", tabStore.showTabs);
  useEffect(() => {
    tabStore.setShowTabs(true);
  }, []);
  const chatOptionsHandler = () => {
    setShowModal(true);
  };

  const switchChatMethod = async () => {
    setSwitchTChat(!switchToChat);
    setShowModal(false);
    if (recorderState.isRecording) {
      await stopRecordingHandler();
    }
    setMessages([]);
  };
  const modelHandler = () => {
    setShowModal(false);
  };

  const requestRecordingPermission = async () => {
    const status = await AudioModule.requestRecordingPermissionsAsync();
    if (!status.granted) {
      return false;
    }
    setAudioModeAsync({ playsInSilentMode: true, allowsRecording: true });
    return true;
  };

  const recordButtonHandler = async () => {
    console.log("CLICKED");
    const requestStatus = await requestRecordingPermission();
    if (!requestStatus) {
      // SHOW NOTIFICATION AND RETURN
      return;
    }
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
    speak(
      "Ola, I am Sophia your teacher. Agents are not integrated yet. Please stop the recording."
    );
  };

  const stopRecordingHandler = async () => {
    await audioRecorder.stop();
  };

  const sendMessageHandler = () => {
    if (messages.length === 0) {
      setMessages([
        { sender: "user", message: text },
        {
          sender: "agent",
          message: "Agents are not integrated yet. Please stop the chat.",
        },
      ]);
      return;
    }
    setMessages([...messages, { sender: "user", message: text }]);
    setText("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
      style={styles.container}
    >
      <ImageBackground
        imageStyle={styles.imageStyles}
        source={TutorImg}
        style={styles.imageContainer}
      >
        <View>
          <View style={styles.sessionTimerContainer}>
            <Text>You have 3:00 left in your tutor session.</Text>
          </View>
          {!recorderState.isRecording && !switchToChat && (
            <Text style={styles.recordingStateText}>Press start to begin</Text>
          )}
          {recorderState.isRecording && !switchToChat && (
            <Text style={styles.recordingStateText}>Live</Text>
          )}

          {messages.length < 1 && switchToChat && (
            <Text style={styles.recordingStateText}>No messages yet.</Text>
          )}
        </View>
        {messages.length > 0 && switchToChat && (
          <View style={styles.messagesContainer}>
            <FlatList
              data={messages}
              contentContainerStyle={{
                gap: 20,
                paddingHorizontal: 16,
              }}
              renderItem={({ item }) =>
                item.sender === "user" ? (
                  <View style={styles.userMessageContainer}>
                    <LinearGradient
                      colors={["#3B82F6", "#1D4ED8", "#1E3A8A"]}
                      style={styles.messageIcon}
                    >
                      <Text style={styles.iconText}>U</Text>
                    </LinearGradient>
                    <Text
                      style={[
                        styles.messageText,
                        {
                          backgroundColor: Styles.backgroundSecondary,
                          color: "white",
                        },
                      ]}
                    >
                      {item.message}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.agentMessageContainer}>
                    <LinearGradient
                      colors={["#22C55E", "#15803D", "#14532D"]}
                      style={styles.messageIcon}
                    >
                      <Text style={styles.iconText}>AI</Text>
                    </LinearGradient>
                    <Text
                      style={[
                        styles.messageText,
                        { backgroundColor: "white", color: "#2D1C1C" },
                      ]}
                    >
                      {item.message}
                    </Text>
                  </View>
                )
              }
            />
          </View>
        )}
        <View style={{ position: "relative" }}>
          <View style={styles.recordingContainer}>
            <TextInput
              onChangeText={setText}
              value={text}
              readOnly={switchToChat ? false : true}
              style={styles.recordingContainerText}
              placeholder={
                switchToChat
                  ? "Message to Tutor..."
                  : "Live mode - press Start to begin."
              }
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
              {!recorderState.isRecording && !switchToChat && (
                <Pressable
                  onPress={() => recordButtonHandler()}
                  style={styles.recordingButton}
                >
                  <View>
                    <FontAwesome name="microphone" size={24} color="white" />
                  </View>
                  <Text style={styles.recordingButtonText}>Record</Text>
                </Pressable>
              )}

              {recorderState.isRecording && !switchToChat && (
                <Pressable
                  onPress={() => stopRecordingHandler()}
                  style={styles.recordingButton}
                >
                  <View>
                    <FontAwesome name="microphone" size={24} color="white" />
                  </View>
                  <Text style={styles.recordingButtonText}>Stop</Text>
                </Pressable>
              )}
              {switchToChat && (
                <Pressable
                  onPress={() => sendMessageHandler()}
                  disabled={text.length ? false : true}
                  style={[
                    styles.sendMessageButton,
                    { opacity: text.length ? 1 : 0.7 },
                  ]}
                >
                  <Text style={styles.recordingButtonText}>Send</Text>
                  <View>
                    <Octicons name="paper-airplane" size={12} color="white" />
                  </View>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
      {showModal && (
        <AgentModal
          switchChatMethod={switchChatMethod}
          switchToChat={switchToChat}
          modelHandler={modelHandler}
        />
      )}
    </KeyboardAvoidingView>
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
    justifyContent: "space-between",
    paddingBottom: 16,
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
  recordingStateText: {
    paddingTop: 24,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 12,
  },
  recordingContainer: {
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 24,
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
  sendMessageButton: {
    backgroundColor: Styles.backgroundSecondary,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  messagesContainer: {
    flex: 1,
    paddingTop: 16,
    overflowY: "auto",
    paddingBottom: 8
  },
  userMessageContainer: {
    flexDirection: "row-reverse",
    gap: 8,
    justifyContent: "flex-start",
  },
  agentMessageContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-start",
  },
  messageIcon: {
    height: 32,
    width: 32,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontWeight: "600",
    fontSize: 14,
    color: "white",
  },
  messageText: {
    textAlign: "left",
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    width: "auto",
    maxWidth: "78%",
    borderRadius: 8,
  },
});

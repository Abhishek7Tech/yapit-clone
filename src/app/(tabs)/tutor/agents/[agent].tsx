import Messages from "@/src/components/chats/chats";
import AgentsMenu from "@/src/components/menus/agents";
import AgentModal from "@/src/components/modals/agentModal";
import useBalanceStore from "@/src/store/balanceStore";
import useTabsStore from "@/src/store/tabsStore";
import { Chat } from "@/src/types/types";
import {
    AudioModule,
    RecordingPresets,
    setAudioModeAsync,
    useAudioRecorder,
    useAudioRecorderState
} from "expo-audio";
import { router, useLocalSearchParams } from "expo-router";
import { speak } from "expo-speech";
import { useEffect, useRef, useState } from "react";
import {
    ImageBackground, KeyboardAvoidingView,
    Platform, StyleSheet,
    Text, View
} from "react-native";
import Styles from "../../../../utils/styles";
const TutorImg = require("@/assets/images/tutor.png");

export default function Agent() {
  const params = useLocalSearchParams();
  const tabStore = useTabsStore();
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const [switchToChat, setSwitchTChat] = useState(false);
  const [text, setText] = useState<string | "">("");
  const [messages, setMessages] = useState<Chat[] | []>([]);
  const [showModal, setShowModal] = useState(false);
  const [timer, setTimer] = useState({ minutes: 2, seconds: 0 });
  const balanceStore = useBalanceStore();

  useEffect(() => {
    tabStore.setShowTabs(true);
  }, []);
  const chatOptionsHandler = () => {
    setShowModal(true);
  };
  const remainingRef = useRef<number>(120); // total seconds
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    remainingRef.current = 10;
    setTimer({
      minutes: Math.floor(remainingRef.current / 60),
      seconds: remainingRef.current % 60,
    });

    intervalRef.current = setInterval(() => {
      remainingRef.current -= 1;
      const mins = Math.floor(Math.max(0, remainingRef.current) / 60);
      const secs = Math.max(0, remainingRef.current) % 60;
      setTimer({ minutes: mins, seconds: secs });

      if (remainingRef.current <= 0 && intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        balanceStore.setBalance(balanceStore.balance - 1);
        router.navigate("/(tabs)/tutor");
      }
    }, 1000) as unknown as number;

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

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
            <Text>
              You have {timer.minutes}:
              {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds} left in
              your tutor session.
            </Text>
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
          <Messages messages={messages} />
        )}
        <AgentsMenu
          setText={setText}
          text={text}
          switchToChat={switchToChat}
          chatOptionsHandler={chatOptionsHandler}
          isRecording={recorderState.isRecording}
          recordButtonHandler={recordButtonHandler}
          stopRecordingHandler={stopRecordingHandler}
          sendMessageHandler={sendMessageHandler}
        />
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
});

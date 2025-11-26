import Styles from "@/src/utils/styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function AgentsMenu({
  setText,
  text,
  switchToChat,
  chatOptionsHandler,
  isRecording,
  recordButtonHandler,
  stopRecordingHandler,
  sendMessageHandler,
}: {
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  switchToChat: boolean;
  chatOptionsHandler: () => void;
  isRecording: boolean;
  recordButtonHandler: () => void;
  stopRecordingHandler: () => void;
  sendMessageHandler: () => void;
}) {
  return (
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
          {!isRecording && !switchToChat && (
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

          {isRecording && !switchToChat && (
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
  );
}

const styles = StyleSheet.create({
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

import Styles from "@/app/utils/styles";
import {
  Animated,
  Easing,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";

export default function RecordingMenu({
  isRecording,
  opacity,
  submit,
  playButton,
  stopRecording,
  playRecording,
  pauseRecording,
}: {
  isRecording: boolean;
  opacity: Animated.AnimatedInterpolation<string | number>;
  submit: boolean;
  playButton: boolean;
  stopRecording: () => void;
  playRecording: () => void;
  pauseRecording: () => void;
}) {
  return (
    <View style={styles.recordingContainer}>
      <View style={styles.recordingWall}></View>
      <Text style={styles.recordingHeading}>Recording</Text>
      <Text style={styles.recordingSubHeading}>
        Repeat the word or phrase from above
      </Text>
      <View style={styles.recordPlayerContainer}>
        <Animated.Text style={[styles.recordPlayerText, { opacity }]}>
          • • • ▮▮▮ •• ▮ ▮ • • • ▮▮ • •
        </Animated.Text>
        {/* RECORD BUTTON */}
        {isRecording && (
          <Pressable
            onPress={() => stopRecording()}
            style={styles.recordVoiceButton}
          >
            <FontAwesome name="square" size={10} color="white" />
          </Pressable>
        )}

        {/* PLAYBACK BUTTON */}
        {!playButton && !isRecording && submit && (
          <Pressable
            onPress={() => playRecording()}
            style={styles.playbackButton}
          >
            <Feather name="play" size={16} color="white" />
          </Pressable>
        )}

        {/* PAUSE BUTTON */}
        {playButton && !isRecording && (
          <Pressable
            onPress={() => pauseRecording()}
            style={styles.playbackButton}
          >
            <FontAwesome6 name="pause" size={16} color="white" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recordingContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 12,
    boxShadow: "0 -6px 24px rgba(0, 0, 0, 0.08)",
  },

  recordingWall: {
    height: 6,
    width: 64,
    alignSelf: "center",
    borderRadius: 999,
    backgroundColor: "#0000001A",
  },
  recordingHeading: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: "900",
    color: Styles.textSecondary,
    textAlign: "center",
  },
  recordingSubHeading: {
    marginBottom: 12,
    fontSize: 14,
    color: "#00000099",
    textAlign: "center",
  },
  recordPlayerContainer: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "#0000000D",
    paddingHorizontal: 12,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  recordPlayerText: {
    fontSize: 12,
    color: "#00000066",
  },
  recordVoiceButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  playbackButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4eed71",
  },
});

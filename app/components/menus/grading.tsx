import { GradesData } from "@/app/types/types";
import Styles from "@/app/utils/styles";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
export default function GradingMenu({
    isRecording,
  showResults,
  gradingData,
  opacity,
  submit,
  loadingResults,
  playButton,
  playRecording,
  pauseRecording
}: {
  isRecording: boolean;  
  showResults: boolean;
  gradingData: GradesData | null;
  opacity: Animated.AnimatedInterpolation<string | number>;
  submit: boolean;
  loadingResults: boolean;
  playButton: boolean;
  playRecording: () => void;
  pauseRecording: () => void;
}) {
  return (
    <View style={styles.resultAudioContainer}>
      {!showResults && <Text style={styles.resultAudioText}>Grading...</Text>}

      {showResults && (
        <Text style={styles.resultAudioText}>
          {gradingData && gradingData.score > 240 ? "Good" : "Poor"}
        </Text>
      )}

      <View style={[styles.recordPlayerContainer, { borderRadius: 4 }]}>
        <Animated.Text style={[styles.recordPlayerText, { opacity }]}>
          • • • ▮▮▮ •• ▮ ▮ • • • ▮▮ • •
        </Animated.Text>
        {/* RECORD BUTTON */}

        {/* PLAYBACK BUTTON */}
        {loadingResults && (
          <>
            {!playButton && !isRecording && submit && (
              <Pressable
                onPress={() => playRecording()}
                style={[
                  styles.playbackButton,
                  { backgroundColor: Styles.backgroundTertiary },
                ]}
              >
                <Feather name="play" size={16} color="white" />
              </Pressable>
            )}

            {/* PAUSE BUTTON */}
            {playButton && !isRecording && (
              <Pressable
                onPress={() => pauseRecording()}
                style={[
                  styles.playbackButton,
                  { backgroundColor: Styles.backgroundTertiary },
                ]}
              >
                <FontAwesome6 name="pause" size={16} color="white" />
              </Pressable>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultAudioContainer: {
    marginTop: 12,
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#0000000D",
  },
  resultAudioText: {
    marginBottom: 8,
    fontSize: 12,
    color: "#2D1C1C",
    fontWeight: "600",
  },
  recordPlayerContainer: {
    height: 48,
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

  playbackButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
});

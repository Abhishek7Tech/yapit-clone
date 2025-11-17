import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import Styles from "../utils/styles";
import { speak } from "expo-speech";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";

import { useEffect, useRef, useState } from "react";
import Notifications from "../components/notification";
import ScoreModal from "../components/scoreModal";
function VocabularyLessons() {
  const flip = useRef(new Animated.Value(0)).current;
  const recordAnim = useRef(new Animated.Value(1)).current;

  const [flipped, setFlipped] = useState(false);
  const [startRecording, setStartRecording] = useState(false);
  // Handles submit button state
  const [submit, setSubmit] = useState(false);
  // Handles audio submission state
  const [submitAudio, setSubmitAudio] = useState(false);

  const [playButton, setPlayButton] = useState(false);
  const [notifications, setNotifications] = useState(false);

  const [showResults, setShowResults] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const player = useAudioPlayer(null);
  const playerStatus = useAudioPlayerStatus(player);
  const recorderState = useAudioRecorderState(audioRecorder);

  const params = useLocalSearchParams();
  const speechHandler = () => {
    speak("Kan cha");
  };

  const flipBack = flip.interpolate({
    inputRange: [0, 180],
    outputRange: ["360deg", "180deg"],
  });

  const flipFront = flip.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "0deg"],
  });

  const flipCard = () => {
    Animated.timing(flip, {
      toValue: flipped ? 0 : 180,
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => setFlipped(!flipped));
  };

  useEffect(() => {
    if (recorderState.isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(recordAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(recordAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [recorderState.isRecording]);

  const opacity = recordAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 0.4],
  });

  const askForMicroPhonePermission = async () => {
    try {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        setNotifications(true);
        return false;
      }
      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
      return true;
    } catch (error) {
      console.log("Something went wrong.", error);
    }
  };

  const stopRecording = async () => {
    if (submit) {
      return;
    }
    await audioRecorder.stop();

    if (audioRecorder.uri) {
      player.replace(audioRecorder.uri);
    }
    setSubmit(true);
  };

  const playRecording = () => {
    setPlayButton(true);
    player.seekTo(0);
    player.play();
    const playingTime = setTimeout(
      () => pauseRecoding(),
      player.duration * 1000
    );
    return () => clearTimeout(playingTime);
  };

  const pauseRecoding = () => {
    console.log("Paused", audioRecorder.uri);
    setPlayButton(false);
    player.pause();
  };

  const recordButtonHandler = async () => {
    setStartRecording(true);
    console.log("Clicked");
    const hasPermission = await askForMicroPhonePermission();
    if (!hasPermission) return;
    await audioRecorder.prepareToRecordAsync();
    await audioRecorder.record();
    const recordingTime = setTimeout(stopRecording, 5100);
    return () => clearTimeout(recordingTime);
  };

  const retryHandler = () => {
    setStartRecording(false);
    setSubmit(false);
    setPlayButton(false);
    setShowResults(false);
    setSubmitAudio(false);
    player.remove();
  };

  const submitAudioHandler = () => {
    setSubmitAudio(true);
    setShowResults(true);
    setLoadingResults(true);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={{ paddingHorizontal: 16 }}>
          {notifications && (
            <Notifications
              notification={notifications}
              handleNotifications={setNotifications}
              message={"Permission denied"}
              icon="notification"
            />
          )}
          <View style={styles.headerContainer}>
            <View>
              <Pressable onPress={() => router.navigate("/home")}>
                <Entypo name="cross" size={24} color={Styles.textSecondary} />
              </Pressable>
            </View>
            <Text style={styles.headingText}>Vocabulary</Text>
            <View>
              <Pressable onPress={() => router.navigate("/report/report")}>
                <Ionicons name="flag" size={24} color={Styles.textSecondary} />
              </Pressable>
            </View>
          </View>
          {/* PROGRESS */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}></View>
          </View>
          {/* LESSON CARD FRONT SIDE */}
          {/* <View style={{paddingHorizontal: 16}}> */}
          <View
            style={{
              position: "relative",
              paddingBottom: 12,
              minHeight: 280,
              maxHeight: "auto",
            }}
          >
            {/* <View> */}
            <Animated.View
              style={[
                styles.viewContainer,
                {
                  transform: [{ rotateY: flipBack }],
                },
              ]}
              pointerEvents={"box-none"}
            >
              <Pressable onPress={() => flipCard()}>
                <View style={{ paddingHorizontal: 32, paddingTop: 32 }}>
                  <View style={styles.instructionContainer}>
                    <Text style={styles.instructionsText}>
                      Repeat what you hear.
                    </Text>
                    <Text style={styles.lessonText}>
                      <Text style={{ fontWeight: "bold" }}>3</Text>/08
                    </Text>
                  </View>
                  <Text style={styles.vocalbularyText}>buenaus tardes</Text>
                  <Text style={styles.instructionText}>
                    Tab card to see defination.
                  </Text>
                </View>
                <Pressable
                  disabled={flipped}
                  style={styles.speakButton}
                  onPress={() => {
                    speechHandler();
                  }}
                >
                  <Foundation name="sound" size={24} color="white" />
                </Pressable>
              </Pressable>
            </Animated.View>
            {/* </View> */}
            {/* LESSON CARD BACK SIDE */}
            {/* <View> */}
            <Pressable onPress={() => flipCard()}>
              <Animated.View
                style={[
                  styles.viewContainer,
                  {
                    transform: [{ rotateY: flipFront }],
                    paddingHorizontal: 32,
                    paddingTop: 32,
                    paddingBottom: 24,
                  },
                ]}
              >
                <View style={styles.instructionContainer}>
                  <Text style={styles.instructionsText}>Defination</Text>
                  <Text style={styles.lessonText}>
                    <Text style={{ fontWeight: "bold" }}>3</Text>/08
                  </Text>
                </View>
                <Text style={styles.vocabularyTextBack}>buenaus tardes</Text>
                <View style={styles.translationContainer}>
                  <Text style={styles.translationHeading}>Translation:</Text>
                  <Text style={styles.translationText}>good afternoon</Text>
                </View>
                <View>
                  <Text style={styles.exampleHeading}>Example:</Text>
                  <Text style={styles.exampleText}>
                    "Buenas tardes, profesora."
                  </Text>
                </View>
                <Text style={[styles.instructionText, { marginTop: 12 }]}>
                  Tap to go back
                </Text>
              </Animated.View>
            </Pressable>
            {/* </View> */}
          </View>

          {submitAudio && (
            <View style={styles.resultAudioContainer}>
              <Text style={styles.resultAudioText}>Poor</Text>
              <View style={[styles.recordPlayerContainer, { borderRadius: 4 }]}>
                <Animated.Text style={[styles.recordPlayerText, { opacity }]}>
                  • • • ▮▮▮ •• ▮ ▮ • • • ▮▮ • •
                </Animated.Text>
                {/* RECORD BUTTON */}

                {/* PLAYBACK BUTTON */}
                {!playButton && !recorderState.isRecording && submit && (
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
                {playButton && !recorderState.isRecording && (
                  <Pressable
                    onPress={() => pauseRecoding()}
                    style={[
                      styles.playbackButton,
                      { backgroundColor: Styles.backgroundTertiary },
                    ]}
                  >
                    <FontAwesome6 name="pause" size={16} color="white" />
                  </Pressable>
                )}
              </View>
            </View>
          )}
        </View>
        {/* </View> */}
        {!startRecording && (
          <View style={styles.recordButtonContainer}>
            <Pressable
              onPress={() => recordButtonHandler()}
              style={styles.recordButton}
            >
              <FontAwesome name="microphone" size={40} color="white" />
            </Pressable>
          </View>
        )}
        {/* Record */}
        {startRecording && (
          <View
            style={[
              styles.recordAndResultContainer,
              {
                backgroundColor: showResults ? Styles.backgroundColor : "white",
              },
            ]}
          >
            {showResults && (
              <View style={styles.resultContainer}>
                <View style={styles.result}>
                  <View style={styles.resultIcon}>
                    <Entypo name="cross" size={24} color="white" />
                  </View>
                  <Text style={styles.resultText}>Incorrect</Text>
                </View>

                <View style={styles.resultScoreContainer}>
                  <View style={styles.resultScore}>
                    <Pressable
                      onPress={() => setShowModal(true)}
                      style={styles.resultScoreButton}
                    >
                      <Text style={styles.resultScoreButtonText}>64</Text>
                    </Pressable>
                    <Pressable>
                      <Text style={styles.resultScoreText}>Accuracy</Text>
                    </Pressable>
                  </View>

                  <View style={styles.resultScore}>
                    <Pressable style={styles.resultScoreButton}>
                      <Text style={styles.resultScoreButtonText}>63</Text>
                    </Pressable>
                    <Pressable>
                      <Text style={styles.resultScoreText}>Fluency</Text>
                    </Pressable>
                  </View>

                  <View style={styles.resultScore}>
                    <Pressable style={styles.resultScoreButton}>
                      <Text style={styles.resultScoreButtonText}>62</Text>
                    </Pressable>
                    <Pressable>
                      <Text style={styles.resultScoreText}>Intonation</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
            {!showResults && (
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
                  {recorderState.isRecording && (
                    <Pressable
                      onPress={() => stopRecording()}
                      style={styles.recordVoiceButton}
                    >
                      <FontAwesome name="square" size={10} color="white" />
                    </Pressable>
                  )}

                  {/* PLAYBACK BUTTON */}
                  {!playButton && !recorderState.isRecording && submit && (
                    <Pressable
                      onPress={() => playRecording()}
                      style={styles.playbackButton}
                    >
                      <Feather name="play" size={16} color="white" />
                    </Pressable>
                  )}

                  {/* PAUSE BUTTON */}
                  {playButton && !recorderState.isRecording && (
                    <Pressable
                      onPress={() => pauseRecoding()}
                      style={styles.playbackButton}
                    >
                      <FontAwesome6 name="pause" size={16} color="white" />
                    </Pressable>
                  )}
                </View>
              </View>
            )}
            <View style={styles.recordButtonsContainer}>
              <Pressable
                onPress={() => retryHandler()}
                style={styles.retryButton}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </Pressable>

              {!showResults && (
                <Pressable
                  onPress={() => submitAudioHandler()}
                  disabled={!submit}
                  style={[
                    styles.submitButton,
                    {
                      backgroundColor: submit
                        ? Styles.backgroundSecondary
                        : Styles.backgroundSecondaryDark,
                      borderColor: submit ? "black" : "#00000099",
                    },
                  ]}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </Pressable>
              )}

              {showResults && (
                <Pressable
                  onPress={() => {}}
                  disabled={!loadingResults}
                  style={[
                    styles.submitButton,
                    {
                      backgroundColor: loadingResults
                        ? Styles.backgroundSecondary
                        : Styles.backgroundSecondaryDark,
                      borderColor: loadingResults ? "black" : "#00000099",
                    },
                  ]}
                >
                  <Text style={styles.submitButtonText}>Next</Text>
                </Pressable>
              )}
            </View>
          </View>
        )}
      </SafeAreaView>
      {showModal && <ScoreModal isVisible={showModal} setIsVisible={setShowModal}/>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.backgroundColor,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  progressContainer: {
    marginTop: 8,
    padding: 0.5,
    borderRadius: 48,
    height: 16,
    borderWidth: 2,
    borderColor: "rgb(249 250 251)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  progressBar: {
    height: "100%",
    width: "18.75%",
    backgroundColor: Styles.backgroundTertiary,
    borderTopLeftRadius: 48,
    borderBottomLeftRadius: 48,
  },
  viewContainer: {
    marginTop: 24,
    zIndex: 1,
    backfaceVisibility: "hidden",
    position: "absolute",
    width: "100%",
    // marginInline: 12,
    // alignItems: "center",
    backgroundColor: "white",
    borderRadius: 28,
    // paddingHorizontal: 32,
    // paddingTop: 32,
    boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
  },
  instructionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  instructionsText: {
    color: Styles.textSecondary,
    fontSize: 14,
    fontWeight: "500",
  },
  lessonText: {
    fontWeight: "600",
    color: Styles.textSecondary,
  },
  totalLessons: {},
  vocalbularyText: {
    marginTop: 16,
    fontSize: 30,
    fontWeight: "900",
    paddingBottom: 64,
    color: "#2D1C1C",
  },
  instructionText: {
    color: "#9CA3AF",
    fontSize: 12,
  },
  speakButton: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    backgroundColor: "#FFC12E",
    boxShadow: "0 2px 2px 1px #E0A924",
    shadowColor: "#E0A924",
    shadowOffset: { width: 4, height: 4 },
    marginBottom: 20,
    marginTop: 4,
    marginRight: 20,
    alignSelf: "flex-end",
    elevation: 5,
    zIndex: 999,

    // boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
  },
  recordButtonContainer: {
    position: "absolute",
    bottom: 75,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EF4444",
    boxShadow: "1px 2px #bf373a",
  },
  vocabularyTextBack: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 24,
    fontWeight: "900",
    color: "#2D1C1C",
  },
  translationContainer: {
    marginVertical: 16,
  },
  translationHeading: {
    fontSize: 14,
    fontWeight: "500",
    color: Styles.textSecondary,
  },
  translationText: {
    fontWeight: "600",
    color: "#2D1C1C",
    fontSize: 18,
  },
  exampleHeading: {
    fontSize: 14,
    fontWeight: "500",
    color: Styles.textSecondary,
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#374151",
  },
  recordAndResultContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    zIndex: 999,
    paddingBottom: 16,
  },
  recordingContainer: {
    // left: 16,
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
  recordButtonsContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
    paddingHorizontal: 48,
  },
  retryButton: {
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 999,
    backgroundColor: "white",
    color: "black",
    borderBottomWidth: 3,
    borderRightWidth: 1,
    borderColor: "#ebe6df",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
  },
  retryButtonText: {
    color: "black",
  },
  submitButton: {
    width: 150,
    paddingVertical: 16,
    borderRadius: 999,
    borderBottomWidth: 3,
    borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: 600,
  },
  playbackButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4eed71",
  },

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

  resultContainer: {
    backgroundColor: Styles.backgroundColor,
    paddingTop: 12,
    paddingBottom: 8,
    borderTopWidth: 4,
    borderTopColor: "rgb(246, 178, 178)",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 16,
  },
  result: {
    gap: 8,
    marginLeft: 20,
    marginBottom: 16,
  },
  resultIcon: {
    width: 32,
    height: 32,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f04648",
    borderBottomWidth: 3,
    borderRightWidth: 1,
    borderColor: "#bf383a",
  },
  resultText: {
    fontWeight: "600",
    color: Styles.textSecondary,
    fontSize: 24,
  },
  resultScoreContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
  },
  resultScore: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  resultScoreButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: Styles.backgroundTertiary,
    shadowColor: "#e4a92d",
    shadowOffset: { height: 3, width: 1 },
    shadowRadius: 3,
    boxShadow: "1px 3px 1px #e4a92d",
    elevation: 5,
  },
  resultScoreButtonText: {
    color: "#141414",
    fontWeight: "500",
    fontSize: 14,
  },
  resultScoreText: {
    fontSize: 14,
    color: "#2D1C1CE6",
  },
});

export default VocabularyLessons;

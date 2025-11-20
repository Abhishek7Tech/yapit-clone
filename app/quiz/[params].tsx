import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { router, useLocalSearchParams } from "expo-router";
import { speak } from "expo-speech";
import {
  Animated,
  Easing,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../utils/styles";

import { BlurView } from "expo-blur";
import { useEffect, useRef, useState } from "react";
import ScoreModal from "../components/modals/scoreModal";
import Notifications from "../components/notification/notification";
import useNotificationStore from "../store/thanksNotification";
import scoreStyles from "../utils/scoreStyles";
import { Questions } from "../types/types";
import Cards from "../components/cards/card";
import RecordingMenu from "../components/menus/recording";
import GradingMenu from "../components/menus/grading";
function VocabularyLessons() {
  const recordAnim = useRef(new Animated.Value(1)).current;

  const [startRecording, setStartRecording] = useState(false);
  // Handles submit button state
  const [submit, setSubmit] = useState(false);
  // Handles audio submission state
  const [submitAudio, setSubmitAudio] = useState(false);

  const [playButton, setPlayButton] = useState(false);
  const [notifications, setNotifications] = useState(false);

  const [showResults, setShowResults] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const [gradeResults, setGradeResults] = useState<Grades | null>(null);

  const [showModal, setShowModal] = useState(false);
  // Data for Models
  const [gradingData, setGradingData] = useState<GradesData | null>(null);
  // Score Button Styles

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const player = useAudioPlayer(null);
  const playerStatus = useAudioPlayerStatus(player);
  const recorderState = useAudioRecorderState(audioRecorder);
  const [questions, setQuestions] = useState<Questions | null>(null);
  const [submitNotification, setSubmitNotification] = useState(false);
  const store = useNotificationStore();

  const params = useLocalSearchParams();
  console.log("PArams", params.params);

  type GradesData = {
    title: string;
    score: number;
    feedback: string;
    grade: string;
    remarks: string[];
  };

  type Grades = {
    total: number;
    accuracy: GradesData;
    fluency: GradesData;
    intonation: GradesData;
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/question/${params.params}`);
      if (response.status === 200) {
        const data = await response.json();
        console.log("Data", data);
        setQuestions(data.question[0]);
      }
    })();
  }, [params.params]);

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

  const showModalHandler = (gradesData: GradesData) => {
    setShowModal(true);
    setGradingData(gradesData);
  };
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
      () => pauseRecording(),
      player.duration * 1000
    );
    return () => clearTimeout(playingTime);
  };

  const pauseRecording = () => {
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

  const submitAudioHandler = async () => {
    setSubmitAudio(true);
    setTimeout(async () => {
      setShowResults(true);
      setLoadingResults(true);
    }, 3000);
    const response = await fetch("/api/grading");
    const data = await response.json();
    setGradeResults(data.result);
  };
  const nextButtonHandler = async () => {
    const response = await fetch(`/api/question/${params.params}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        index: questions?.currentQuestion.index,
      }),
    });

    if (
      response.status === 200 &&
      questions?.total !== questions?.currentQuestion.index
    ) {
      const data = await response.json();
      console.log("Data", data);
      setQuestions(data.question[0]);
      retryHandler();
    }

    if (
      response.status === 200 &&
      questions?.total === questions?.currentQuestion.index
    ) {
      setSubmitNotification(true);
      setTimeout(() => {
        store.toggleThanksNotification(true);
        router.navigate("/home");
      }, 3000);
    }
  };

  if (!questions) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <BlurView
      style={styles.blurContainer}
      tint="extraLight"
      intensity={submitNotification ? 90 : 0}
    >
      {submitNotification && (
        <View style={{ top: StatusBar.currentHeight, marginHorizontal: 16 }}>
          <Notifications
            notification={notifications}
            handleNotifications={setNotifications}
            message={"Evaluating submissions..."}
            icon="submit"
          />
        </View>
      )}
      <SafeAreaView
        style={[styles.container, submitNotification ? { zIndex: -100 } : {}]}
      >
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
            <View
              style={[
                styles.progressBar,
                {
                  width: `${
                    (questions.currentQuestion.index / questions.total) * 100
                  }%`,
                  borderTopRightRadius:
                    questions.currentQuestion.index === questions.total
                      ? 48
                      : 0,
                  borderBottomRightRadius:
                    questions.currentQuestion.index === questions.total
                      ? 48
                      : 0,
                },
              ]}
            ></View>
          </View>

          {/* //CARD// */}
          <Cards questions={questions} />
           {/* GRADING    */}
          {submitAudio && (
           <GradingMenu isRecording={recorderState.isRecording} showResults={showResults} gradingData={gradingData} opacity={opacity} submit={submit} loadingResults={loadingResults} playButton={playButton} playRecording={playRecording} pauseRecording={pauseRecording} />
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
            {showResults && gradeResults && (
              <View style={styles.resultContainer}>
                <View style={styles.result}>
                  {gradeResults.total > 240 ? (
                    <View
                      style={[
                        styles.resultIcon,
                        { backgroundColor: "#4eed71", borderColor: "#41ca55" },
                      ]}
                    >
                      <Entypo name="check" size={24} color="white" />
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.resultIcon,
                        { backgroundColor: "#f04648", borderColor: "#bf383a" },
                      ]}
                    >
                      <Entypo name="cross" size={24} color="white" />
                    </View>
                  )}

                  <Text style={styles.resultText}>
                    {gradeResults.total > 240 ? "Correct" : "Incorrect"}
                  </Text>
                </View>

                <View style={styles.resultScoreContainer}>
                  <View style={styles.resultScore}>
                    <Pressable
                      onPress={() => showModalHandler(gradeResults.accuracy)}
                      style={[
                        styles.resultScoreButton,
                        scoreStyles(gradeResults?.accuracy.grade),
                      ]}
                    >
                      <Text style={styles.resultScoreButtonText}>
                        {gradeResults?.accuracy.score}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => showModalHandler(gradeResults.accuracy)}
                    >
                      <Text style={styles.resultScoreText}>Accuracy</Text>
                    </Pressable>
                  </View>

                  <View style={styles.resultScore}>
                    <Pressable
                      onPress={() => showModalHandler(gradeResults.fluency)}
                      style={[
                        styles.resultScoreButton,
                        scoreStyles(gradeResults?.fluency.grade),
                        ,
                      ]}
                    >
                      <Text style={styles.resultScoreButtonText}>
                        {gradeResults?.fluency.score}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => showModalHandler(gradeResults.fluency)}
                    >
                      <Text style={styles.resultScoreText}>Fluency</Text>
                    </Pressable>
                  </View>

                  <View style={styles.resultScore}>
                    {
                      <Pressable
                        onPress={() =>
                          showModalHandler(gradeResults.intonation)
                        }
                        style={[
                          styles.resultScoreButton,
                          scoreStyles(gradeResults?.intonation.grade),
                          ,
                        ]}
                      >
                        <Text style={styles.resultScoreButtonText}>
                          {gradeResults?.intonation.score}
                        </Text>
                      </Pressable>
                    }
                    <Pressable
                      onPress={() => showModalHandler(gradeResults.intonation)}
                    >
                      <Text style={styles.resultScoreText}>Intonation</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}

            {/* // RECORDING  */}
            {!showResults && (
              <RecordingMenu
                isRecording={recorderState.isRecording}
                opacity={opacity}
                submit={submit}
                playButton={playButton}
                stopRecording={stopRecording}
                playRecording={playRecording}
                pauseRecording={pauseRecording}
              />
            )}
            <View style={styles.recordButtonsContainer}>
              <Pressable
                onPress={() => retryHandler()}
                style={styles.retryButton}
                disabled={!loadingResults}
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
                  onPress={() => nextButtonHandler()}
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
      {showModal && gradingData && (
        <ScoreModal
          modelData={gradingData}
          isVisible={showModal}
          setIsVisible={setShowModal}
        />
      )}
    </BlurView>
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
    backgroundColor: Styles.backgroundTertiary,
    borderTopLeftRadius: 48,
    borderBottomLeftRadius: 48,
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

  recordAndResultContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    zIndex: 900,
    paddingBottom: 16,
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
    flexDirection: "row",
  },
  resultIcon: {
    width: 32,
    height: 32,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 3,
    borderRightWidth: 1,
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
    borderBottomWidth: 3,
    borderRightWidth: 1,
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
  blurContainer: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.2)",
    zIndex: 999,
    position: "relative",
  },
});

export default VocabularyLessons;

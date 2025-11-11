import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Styles from "../utils/styles";

import Animated from "react-native-reanimated";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
function VocabularyLessons() {
  const flip = useSharedValue(0);
  const params = useLocalSearchParams();

  const flipBackHandler = useAnimatedStyle(() => {
    const flipBack = interpolate(flip.value, [0, 1], [360, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${flipBack}deg`, { duration: 500 }),
        },
      ],
      position: "absolute",
      width: "100%"
    };
  });

  const flipFrontHandler = useAnimatedStyle(() => {
    const flipFront = interpolate(flip.value, [0, 1], [180, 0]);
    return {
      transform: [
        {
          rotateY: withTiming(`${flipFront}deg`, { duration: 500 }),
        },
      ],
      backfaceVisibility: "hidden",
    };
  });
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View>
          <Entypo name="cross" size={24} color={Styles.textSecondary} />
        </View>
        <Text style={styles.headingText}>Vocabulary</Text>
        <View>
          <Ionicons name="flag" size={24} color={Styles.textSecondary} />
        </View>
      </View>
      {/* PROGRESS */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}></View>
      </View>
      {/* LESSON CARD FRONT SIDE */}
      {/* <View style={{paddingHorizontal: 16}}> */}
        <Pressable onPress={() => (flip.value = flip.value ? 1 : 0)}>
          <Animated.View style={[styles.viewContainer, flipBackHandler]}>
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionsText}>Repeat what you hear.</Text>
              <Text style={styles.lessonText}>
                <Text style={{ fontWeight: "bold" }}>3</Text>/08
              </Text>
            </View>
            <Text style={styles.vocalbularyText}>buenaus tardes</Text>
            <Text style={styles.instructionText}>
              Tab card to see defination.
            </Text>
            <Pressable style={styles.speakButton}>
              <Foundation name="sound" size={24} color="white" />
            </Pressable>
          </Animated.View>
        </Pressable>
        {/* LESSON CARD BACK SIDE */}
        <Pressable onPress={() => (flip.value = flip.value ? 0 : 1)}>
          <Animated.View style={[styles.viewContainer, flipFrontHandler]}>
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
            <Text
              style={[
                styles.instructionText,
                { marginTop: 12, marginBottom: 20 },
              ]}
            >
              Tap to go back
            </Text>
          </Animated.View>
        </Pressable>
      {/* </View> */}
      <View style={styles.recordButtonContainer}>
        <Pressable style={styles.recordButton}>
          <FontAwesome name="microphone" size={40} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
    // marginInline: 12,
    // alignItems: "center",
    backgroundColor: "white",
    borderRadius: 28,
    paddingHorizontal: 32,
    paddingTop: 32,
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
    borderRadius: "100%",
    backgroundColor: "#FFC12E",
    boxShadow: "0 2px 2px 1px #E0A924",
    shadowColor: "#E0A924",
    shadowOffset: { width: 4, height: 4 },
    marginBottom: 20,
    marginTop: 4,
    alignSelf: "flex-end",
    // boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
  },
  recordButtonContainer: {
    right: 16,
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
});

export default VocabularyLessons;

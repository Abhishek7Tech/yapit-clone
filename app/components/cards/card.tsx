import { Questions } from "@/app/types/types";
import Styles from "@/app/utils/styles";
import Foundation from "@expo/vector-icons/Foundation";
import { speak } from "expo-speech";
import { useRef, useState } from "react";
import {
    Animated,
    Easing,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

export default function Cards({questions}: {questions: Questions}) {
      const flip = useRef(new Animated.Value(0)).current;
      const [flipped, setFlipped] = useState(false);
      const flipCard = () => {
    Animated.timing(flip, {
      toValue: flipped ? 0 : 180,
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => setFlipped(!flipped));
  };
      const flipBack = flip.interpolate({
    inputRange: [0, 180],
    outputRange: ["360deg", "180deg"],
  });

  const flipFront = flip.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "0deg"],
  });

  const speechHandler = (term: string) => {
      speak(term);
    };

  return (
    <>
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
                  <Text style={{ fontWeight: "bold" }}>
                    {questions.currentQuestion.index}
                  </Text>
                  /0{questions.total}
                </Text>
              </View>
              <Text style={styles.vocalbularyText}>
                {questions.currentQuestion.term}
              </Text>
              <Text style={styles.instructionText}>
                Tab card to see defination.
              </Text>
            </View>
            <Pressable
              disabled={flipped}
              style={styles.speakButton}
              onPress={() => {
                speechHandler(questions.currentQuestion.term);
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
                <Text style={{ fontWeight: "bold" }}>
                  {questions.currentQuestion.index}
                </Text>
                /0
                {questions.total}
              </Text>
            </View>
            <Text style={styles.vocabularyTextBack}>
              {questions.currentQuestion.term}
            </Text>
            <View style={styles.translationContainer}>
              <Text style={styles.translationHeading}>Translation:</Text>
              <Text style={styles.translationText}>
                {questions.currentQuestion.translation}
              </Text>
            </View>
            <View>
              <Text style={styles.exampleHeading}>Example:</Text>
              <Text style={styles.exampleText}>
                "{questions.currentQuestion.example}"
              </Text>
            </View>
            <Text style={[styles.instructionText, { marginTop: 12 }]}>
              Tap to go back
            </Text>
          </Animated.View>
        </Pressable>
        {/* </View> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 24,
    zIndex: 1,
    backfaceVisibility: "hidden",
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 28,
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
    zIndex: 900,
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

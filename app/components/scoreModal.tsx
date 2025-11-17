import {
  Modal,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  Animated,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../utils/styles";
// import  from "react-native-reanimated";
import { useEffect, useRef } from "react";
const screenDimensions = Dimensions.get("screen").height;

export default function ScoreModal({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}) {
  const slideAnim = useRef(new Animated.Value(200)).current;
  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);
  const hideModalHandler = () => {
    Animated.timing(slideAnim, {
      toValue: 200,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsVisible(false));
  };
  return (
    <SafeAreaView style={styles.modalContainer}>
      <Pressable
        onPress={() => hideModalHandler()}
        style={{ flex: 1 }}
      >
        <View></View>
      </Pressable>
      <Animated.View
        style={[styles.scoreModal, { transform: [{ translateY: slideAnim }] }]}
      >
        <View>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreTitle}>Accuracy</Text>
            <View style={styles.scoreCard}>
              <Text style={styles.scoreText}>65</Text>
            </View>
          </View>
          <Text style={styles.suggestionText}>
            The pronunciation is not very clear, and the sounds are not
            accurately produced.
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: "transparent",
    zIndex: 400,
    justifyContent: "flex-end",
  },
  scoreModal: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: Styles.backgroundColor,
  },
  scoreContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  scoreTitle: {
    fontWeight: "600",
    fontSize: 12,
    color: Styles.textSecondary,
    marginBottom: 8,
  },
  scoreCard: {
    width: 48,
    height: 48,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Styles.backgroundTertiary,
    borderBottomWidth: 3,
    borderRightWidth: 1,
    borderColor: "#e4a92d",
  },
  scoreText: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 24,
  },
  suggestionText: {
    fontWeight: "600",
    fontSize: 16,
    color: Styles.textSecondary,
    marginBottom: 8,
    textAlign: "center",
  },
});

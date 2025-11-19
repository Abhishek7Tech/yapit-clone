import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../../utils/styles";
// import  from "react-native-reanimated";
import { useEffect, useRef } from "react";
import scoreStyles from "../../utils/scoreStyles";
const screenDimensions = Dimensions.get("screen").height;

  type GradesData = {
    title: string,
     score: number;
    feedback: string;
    grade: string;
    remarks: string[];
  }
export default function ScoreModal({
  isVisible,
  setIsVisible,
  modelData,
}: {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  modelData: GradesData
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
      duration: 200,
      useNativeDriver: true,
    }).start(() => setIsVisible(false));
  };

  const DummyDetails = [
    "Audio quality is poor.",
    "Speech is absent or unintelligible.",
  ];
  return (
    <SafeAreaView style={styles.modalContainer}>
      <Pressable onPress={() => hideModalHandler()} style={{ flex: 1 }}>
        <View></View>
      </Pressable>
      <Animated.View
        style={[styles.scoreModal, { transform: [{ translateY: slideAnim }] }]}
      >
        <View>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreTitle}>{modelData.title}</Text>
            <View style={[styles.scoreCard, scoreStyles(modelData.grade)]}>
              <Text style={styles.scoreText}>{modelData.score}</Text>
            </View>
          </View>
          <Text style={styles.suggestionText}>
            {modelData.feedback}

          </Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsHeading}>Details</Text>
            <FlatList
            data={modelData.remarks}
            keyExtractor={item => item}
            renderItem={({item}) => <Text style={styles.detailText}>  <Text style={{ fontSize: 16 }}>•</Text> {item}</Text>}
            />
          </View>
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
    minHeight: screenDimensions * 0.30,
    width: "100%"
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
    // backgroundColor: Styles.backgroundTertiary,
    borderBottomWidth: 3,
    borderRightWidth: 1,
    // borderColor: "#e4a92d",
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
  detailsContainer: {
    marginTop: 12,
  },
  detailsHeading: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    color: "#6B7280",
  },
  detailText: {
    fontSize: 12,
    color: "#374151"
  }
});

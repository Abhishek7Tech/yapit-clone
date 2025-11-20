import { Grades, GradesData } from "@/app/types/types";
import Styles from "@/app/utils/styles";
import { Entypo } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import scoreStyles from "@/app/utils/scoreStyles";

export default function ScoreMenu({
  gradeResults,
  showModalHandler,
}: {
  gradeResults: Grades;
  showModalHandler: (gradesData: GradesData) => void;
}) {
  return (
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
          <Pressable onPress={() => showModalHandler(gradeResults.accuracy)}>
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
          <Pressable onPress={() => showModalHandler(gradeResults.fluency)}>
            <Text style={styles.resultScoreText}>Fluency</Text>
          </Pressable>
        </View>

        <View style={styles.resultScore}>
          {
            <Pressable
              onPress={() => showModalHandler(gradeResults.intonation)}
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
          <Pressable onPress={() => showModalHandler(gradeResults.intonation)}>
            <Text style={styles.resultScoreText}>Intonation</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});

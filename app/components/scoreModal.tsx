import { Modal, StyleSheet, View, Text, StatusBar, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../utils/styles";
const screenDimensions = Dimensions.get('screen').height;

export default function ScoreModal({ showModal }: { showModal: boolean }) {
  return (
    <SafeAreaView style={styles.modalContainer}>
      <Modal
        style={styles.scoreModal}
        animationType="slide"
        transparent={true}
        visible={showModal}
        backdropColor={Styles.backgroundColor}
        
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
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "red",
    height: 300,
    position: "relative"

  },
  scoreModal: {
    position: "absolute",
    bottom: StatusBar.currentHeight,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: Styles.backgroundColor,
    height: 500,  
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
    textAlign: "center"
  },
});

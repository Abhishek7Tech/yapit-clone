import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../utils/styles";

export default function HomeTab() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingView}>
        <Text style={styles.headingText}>Welcome John Doe</Text>
        <Text style={styles.subHeadingText}>Hola, ¿cómo estás hoy?</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.backgroundColor,
    paddingHorizontal: 16
  },
  headingView: {

  },
  headingText: {
    fontSize: 18,
    color: Styles.textSecondary,
    fontWeight: "bold",
    lineHeight: 20
  },
  subHeadingText: {
    fontSize: 14,
    color: "#5C4B4B",
    lineHeight: 15
  }
});

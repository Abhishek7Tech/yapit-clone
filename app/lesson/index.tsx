import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import Styles from "../utils/styles";
import { StatusBar } from "expo-status-bar";
const YappyImg = require("@/assets/images/yappy.webp");
export default function Lesson() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lessonContainer}>
        <Image
          style={styles.yappyImg}
          source={YappyImg}
          accessibilityLabel="Yappy icon"
        ></Image>
        <Text style={styles.lessonText}>Lesson 1</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
  lessonContainer: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingBottom: 70
  },
  lessonText: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  yappyImg: {
    height: 220,
    width: 220,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    width: "100%",
    position: "absolute",
    bottom: 75,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 24,
    backgroundColor: Styles.backgroundSecondary,
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});

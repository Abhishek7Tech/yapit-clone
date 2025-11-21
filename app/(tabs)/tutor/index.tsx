import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, View, ImageComponent } from "react-native";
import Styles from "@/app/utils/styles";
import { ImageBackground } from "expo-image";
const TutorImg = require("@/assets/images/tutor.png")
export default function Tutor() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground  imageStyle={styles.imageStyles} source={TutorImg} style={styles.imageContainer}>
      <View style={styles.textContainer}>
      <Text style={styles.text}>Choose a tutor to begin.</Text>
    </View>
      </ImageBackground>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.backgroundColor,
  },
  textContainer: {
    paddingTop: 88,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#6B7280",
    fontSize: 12
  },
  imageContainer: {
    flex: 1,
  },
  imageStyles: {
    opacity: 0.14,
    resizeMode: "contain"
  }
});

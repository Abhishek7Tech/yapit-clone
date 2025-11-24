import { ImageBackground } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../../../utils/styles";
import { useEffect } from "react";
import useTabsStore from "@/app/store/tabsStore";
const TutorImg = require("@/assets/images/tutor.png");

export default function Agent() {
  const params = useLocalSearchParams();
  const tabStore = useTabsStore();
  console.log("Agent params", tabStore.showTabs);
  useEffect(() => {
    tabStore.setShowTabs(true);
  },[])
  return (
    <View style={styles.container}>
      <ImageBackground
        imageStyle={styles.imageStyles}
        source={TutorImg}
        style={styles.imageContainer}
      >
        <View style={styles.sessionTimerContainer}>
            <Text>You have 3:00 left in your tutor session.</Text>
        </View>
        <SafeAreaView>

        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.backgroundColor,
    paddingHorizontal: 16,
  },
  imageContainer: {
    flex: 1,
  },
  imageStyles: {
    opacity: 0.14,
    resizeMode: "contain",
  },
  sessionTimerContainer: {
    backgroundColor: "#fdfbfa",
    paddingVertical: 4,
    boxShadow: "0 1px 3px 0 var(#0000001a),0 1px 2px -1px var(#0000001a)",
},
sessionTimerText: {
    color: Styles.textSecondary,
    fontWeight: "600",
    textAlign: "left",
    fontSize: 12
  }
});

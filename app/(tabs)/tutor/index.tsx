import TutorModal from "@/app/components/modals/tutorModal";
import useTabsStore from "@/app/store/tabsStore";
import Styles from "@/app/utils/styles";
import { AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const TutorImg = require("@/assets/images/tutor.png");
export default function Tutor() {
  const tabsStore = useTabsStore();
  useEffect(() => {
    tabsStore.setShowTabs(false);
  }, []);
  return (
    <BlurView style={styles.blurContainer} tint="regular" intensity={90}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          imageStyle={styles.imageStyles}
          source={TutorImg}
          style={styles.imageContainer}
        >
          <View style={styles.headerContainer}>
            <Pressable style={{}} onPress={() => router.back()}>
              <AntDesign name="left" size={20} color={Styles.textSecondary} />
            </Pressable>
            <Text style={styles.headingText}>Tutor</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Choose a tutor to begin.</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
      <TutorModal />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.backgroundColor,
    zIndex: -10,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    fontSize: 20,
    fontWeight: "700",
    color: Styles.textSecondary,
    textAlign: "center",
    flexGrow: 1,
    paddingRight: 16,
  },
  textContainer: {
    paddingTop: 88,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#6B7280",
    fontSize: 12,
  },
  imageContainer: {
    flex: 1,
  },
  imageStyles: {
    opacity: 0.14,
    resizeMode: "contain",
  },
  blurContainer: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.2)",
    zIndex: 999,
    position: "relative",
  },
});

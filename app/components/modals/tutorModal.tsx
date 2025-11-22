import useTabsStore from "@/app/store/tabsStore";
import Styles from "@/app/utils/styles";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const TutorImg = require("@/assets/images/tutor.png");
const YapCoin = require("@/assets/images/coin.webp");
const screenDimensions = Dimensions.get("screen").height;
export default function TutorModal({
  balance,
  spendButtonHandler,
}: {
  balance: number;
  spendButtonHandler: () => void;
}) {
  const slideAnim = useRef(new Animated.Value(200)).current;
  const tabsStore = useTabsStore();
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  const modalHandler = () => {
    router.back();
  };
 
  return (
    <SafeAreaView style={styles.modalContainer}>
      <Pressable onPress={() => modalHandler()} style={{ flex: 1 }}>
        <View></View>
      </Pressable>
      <Animated.View
        style={[styles.tutorModal, { transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.modalHeader}>
          <Image
            style={styles.tutorImg}
            source={TutorImg}
            accessibilityLabel="Tutor Icon"
          ></Image>
          <Text style={styles.tutorHeading}>Tutor A.I</Text>
        </View>
        <Text style={styles.tutorText}>
          Get 5 mins of personalized Spanish tutoring for just 1 YAP. Your AI
          tutor will assess your level, identify your strengths, and help you
          improve pronunciation in real-time.
        </Text>
        <View style={styles.tutorButtonContainer}>
          <Pressable
            onPress={() => spendButtonHandler()}
            style={styles.tutorButton}
          >
            <Image
              style={styles.tutorButtonImg}
              source={YapCoin}
              accessibilityLabel="Yap coin"
            ></Image>
            <Text style={styles.tutorButtonText}>Spend {balance} YAP</Text>
          </Pressable>
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
    width: "100%",
  },
  tutorModal: {
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: Styles.backgroundColor,
    minHeight: screenDimensions * 0.2,
    shadowColor: "#0000001a",
    boxShadow: "0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
  },
  tutorImg: {
    height: 48,
    width: 62,
  },
  tutorHeading: {
    marginLeft: 8,
    fontSize: 36,
    fontWeight: "800",
    color: Styles.textSecondary,
  },
  tutorText: {
    color: Styles.textSecondary,
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tutorButtonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tutorButton: {
    paddingVertical: 12,
    backgroundColor: Styles.backgroundSecondary,
    borderBottomWidth: 3,
    borderColor: "black",
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  tutorButtonImg: {
    width: 20,
    height: 20,
  },
  tutorButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

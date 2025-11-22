import TutorModal from "@/app/components/modals/tutorModal";
import useBalanceStore from "@/app/store/balanceStore";
import useNotificationStore from "@/app/store/thanksNotification";
import useTabsStore from "@/app/store/tabsStore";
import Styles from "@/app/utils/styles";
import { AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Notifications from "@/app/components/notification/notification";
const TutorImg = require("@/assets/images/tutor.png");
export default function Tutor() {
  // Low balance notification
  const [notifications, setNotifications] = useState(false);

  const [verifyNotification, setVerifiyNotification] = useState(false);

  const [tutorModal, showTutorModal] = useState(true);
  const tabsStore = useTabsStore();
  const store = useNotificationStore();
  const balanceStore = useBalanceStore();
  useEffect(() => {
    if (tutorModal) {
      tabsStore.setShowTabs(false);
    }
    if (balanceStore.balance < 1 && !notifications) {
      showTutorModal(true);
    }
  }, [tutorModal, notifications]);

  const spendButtonHandler = () => {
    if (balanceStore.balance < 1) {
      setNotifications(true);
      setTimeout(() => {
        router.push("/(tabs)/home");
      }, 3000);
      tabsStore.setShowTabs(false);
    }
    setVerifiyNotification(true);
    showTutorModal(false);
    setTimeout(() => {
      router.push("/agents");
    }, 2000);
    tabsStore.setShowTabs(true);
  };
  return (
    <BlurView
      style={styles.blurContainer}
      tint="regular"
      intensity={tutorModal ? 90 : 0}
    >
      <SafeAreaView
        style={[styles.container, { zIndex: tutorModal ? -10 : 1 }]}
      >
        <ImageBackground
          imageStyle={styles.imageStyles}
          source={TutorImg}
          style={styles.imageContainer}
        >
          {notifications && (
            <Notifications
              notification={notifications}
              handleNotifications={setNotifications}
              message={`Insufficient Balance!`}
              icon="alert"
            />
          )}
          {verifyNotification && (
            <Notifications
              notification={verifyNotification}
              handleNotifications={setVerifiyNotification}
              message={"Verifying..."}
              icon="submit"
            />
          )}
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
      {tutorModal && (
        <TutorModal
          balance={balanceStore.balance}
          spendButtonHandler={spendButtonHandler}
        />
      )}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.backgroundColor,
    paddingHorizontal: 16,
    position: "relative",
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

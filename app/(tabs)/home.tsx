import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LessonsList } from "@/app/types/types";
import Loading from "@/app/components/loading/loading";
import Lessons from "../components/lessons/lessons";
import Notifications from "../components/notification/notification";
import Streak from "../components/streak/streak";
import useBalanceStore from "../store/balanceStore";
import useNotificationStore from "../store/thanksNotification";
import Styles from "../utils/styles";
const coinUrl = require("@/assets/images/coin.webp");

export default function HomeTab() {
  const today = new Date().getDay();
  const [notifications, setNotifications] = useState(false);
  const [lessonList, setLessonList] = useState<LessonsList[]>([]);
  const quizHandler = () => {
    setNotifications(true);
  };
  const store = useNotificationStore();
  const balanceStore = useBalanceStore();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/lessons");
      const data = await response.json();
      if (data.lessonsList) {
        setLessonList(data.lessonsList);
      }
    })();
  }, []);

  const incompleteLessons = lessonList?.filter(
    (lesson) => lesson.completed === false
  ).length;

  useEffect(() => {
    if (lessonList.length) {
      const completedLessons = lessonList.filter((lesson) => lesson.completed);
      balanceStore.setBalance(completedLessons.length || 0);
    }
  }, [lessonList]);

  if (!lessonList.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Loading />
      </SafeAreaView>
    );
  }
  return (
    <>
      {store.thanksNotification && (
        <Notifications
          notification={notifications}
          handleNotifications={setNotifications}
          message={"Thanks for the report!"}
          icon="thanks"
        />
      )}
      {notifications && (
        <Notifications
          notification={notifications}
          handleNotifications={setNotifications}
          message={`Finish ${incompleteLessons} more lessons to unlock the quiz.`}
          icon="notification"
        />
      )}
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Welcome John Doe</Text>
            <Text style={styles.subHeadingText}>Hola, ¿cómo estás hoy?</Text>
          </View>
          {/* // AccountsView */}
          <View style={styles.accountsView}>
            <View style={styles.accountsContainer}>
              <View style={styles.accountsHeadingView}>
                <Text style={styles.accountsHeadingText}>
                  {" "}
                  Available Balance
                </Text>
                <Text style={styles.accountsBalanceText}>
                  {balanceStore.balance}
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                      textTransform: "capitalize",
                    }}
                  >
                    {" "}
                    yap
                  </Text>
                </Text>
              </View>
              <Image
                source={coinUrl}
                accessibilityLabel="Yap Coin"
                contentFit="contain"
                style={styles.currencyImg}
              />
            </View>
          </View>

          {/* StreakView */}
          <Streak />

          {/* //Lessons */}
          <Lessons lessonList={lessonList} />

          {/* // Talk to Teacher  */}
          <View style={styles.talkToTeacherContainer}>
            <Pressable style={styles.talkToTeacherButton}>
              <Text style={styles.talkToTeacherButtonText}>
                Talk to Spanish Teacher
              </Text>
            </Pressable>
          </View>

          {/* Quiz */}
          <View>
            <Text style={styles.quizHeading}>Quiz</Text>
            <Pressable onPress={() => quizHandler()}>
              <View style={styles.quizContainer}>
                <View style={styles.quizIcon}>
                  <FontAwesome5 name="lock" size={28} color={"#6b7280"} />
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.backgroundColor,
    paddingHorizontal: 16,
  },
  headingView: {
    paddingVertical: 8,
  },
  headingText: {
    fontSize: 18,
    color: Styles.textSecondary,
    fontWeight: "bold",
    lineHeight: 20,
  },
  subHeadingText: {
    fontSize: 14,
    color: "#5C4B4B",
    lineHeight: 15,
  },
  accountsView: {
    marginTop: 8,
  },
  accountsContainer: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#e3ded3",
    borderBottomWidth: 3,
    borderRightWidth: 1,
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px -1px rgba(0, 0, 0, 0.1)",
    ...Platform.select({
      ios: {
        shadowColor: "#0000001a",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowBRadius: 1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  accountsHeadingView: {
    flexDirection: "column",
  },
  accountsHeadingText: {
    fontSize: 14,
    color: Styles.textSecondary,
    marginBottom: 1,
  },
  accountsBalanceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Styles.textSecondary,
  },
  currencyImg: {
    width: 64,
    height: 64,
  },
  talkToTeacherContainer: {
    marginTop: 4,
  },
  talkToTeacherButton: {
    borderBottomWidth: 3,
    borderRightWidth: 1,
    borderColor: "black",
    backgroundColor: Styles.backgroundSecondary,
    paddingVertical: 12,
    borderRadius: 16,
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  talkToTeacherButtonText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  quizHeading: {
    color: Styles.textSecondary,
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 8,
  },
  quizContainer: {
    borderRadius: 12,
    paddingVertical: 32,
    borderBottomWidth: 3,
    borderRightWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignContent: "center",
  },
  quizIcon: {
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { FontAwesome5 } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LessonsList from "../utils/lessonsList";
import StreakDays from "../utils/streak";
import Styles from "../utils/styles";
import Notifications from "../components/notification";
import { useEffect, useState } from "react";
import useNotificationStore from "../store/thanksNotification";
const coinUrl = require("@/assets/images/coin.webp");
const flamesUrl = require("@/assets/images/flame.png");

type LessonsList = {
  group: number;
  lesson: number;
  disabled: boolean;
  completed: boolean;
}[];

export default function HomeTab() {
  const today = new Date().getDay();
  const [notifications, setNotifications] = useState(false);
  const [lessonList, getLessonList] = useState<LessonsList | null>(null);
  const quizHandler = () => {
    setNotifications(true);
  };
  const store = useNotificationStore();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/lessons");
      const data = await response.json();
      if(data) {
        getLessonList(data.lessonsList);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {store.thanksNotification && (
        <View>
          <Notifications
            notification={notifications}
            handleNotifications={setNotifications}
            message={"Thanks for the report!"}
            icon="thanks"
          />
        </View>
      )}
      <View>
        {notifications && (
          <Notifications
            notification={notifications}
            handleNotifications={setNotifications}
            message={"Finish 5 more lessons to unlock the quiz."}
            icon="notification"
          />
        )}
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Welcome John Doe</Text>
          <Text style={styles.subHeadingText}>Hola, ¿cómo estás hoy?</Text>
        </View>
        {/* // AccountsView */}
        <View style={styles.accountsView}>
          <View style={styles.accountsContainer}>
            <View style={styles.accountsHeadingView}>
              <Text style={styles.accountsHeadingText}> Available Balance</Text>
              <Text style={styles.accountsBalanceText}>
                0
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
        <View style={styles.streakView}>
          <View style={styles.streakContainer}>
            <View style={styles.streakHeading}>
              <Image
                style={styles.flamesImg}
                source={flamesUrl}
                accessibilityLabel="Flame icon"
              />
              <Text style={styles.streakHeadingText}>Daily Streak</Text>
            </View>
            <View style={styles.streakDaysContainer}>
              <FlatList
                data={StreakDays}
                horizontal={true}
                contentContainerStyle={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
                renderItem={({ item }) => (
                  <View style={styles.streakChecksContainer}>
                    <View style={styles.streakChecks}>
                      {item.value === today && (
                        <Feather name="check" size={24} color={"white"} />
                      )}
                    </View>
                    <Text style={styles.streakDaysText}>{item.day[0]}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>

        {/* //Lessons */}
        <View>
          <View style={styles.lessonsHeadingContainer}>
            <Text style={styles.lessonsHeading}>Lessons</Text>
            <Link style={styles.allLessons} href={"/lessons/allLessons"}>
              See all
            </Link>
          </View>

          <View style={styles.lessonsListContainer}>
            <FlatList
              data={lessonList}
              horizontal={true}
              contentContainerStyle={{
                overflowX: "auto",
                paddingHorizontal: 16,
                gap: 16,
                marginInline: -16,
                paddingBottom: 10,
              }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.lessonsContainer,
                    {
                      backgroundColor: item.disabled ? "#e5e7eb" : "white",
                      boxShadow: `0 3px ${
                        item.disabled ? "#e2ddd3" : "#d1d5db"
                      }`,
                    },
                  ]}
                >
                  <Pressable
                    onPress={() => router.navigate(`/lesson/${item.lesson}`)}
                    disabled={item.disabled}
                  >
                    <View style={{ paddingBottom: 12 }}>
                      <Text
                        style={[
                          styles.lessonText,
                          { color: item.disabled ? "#6b7280" : "#2d1c1c" },
                        ]}
                      >
                        Lesson {item.lesson}
                      </Text>
                      <Text
                        style={[
                          styles.groupText,
                          { color: item.disabled ? "#6b7280" : "#2d1c1c" },
                        ]}
                      >
                        Group {item.group}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              )}
            />
          </View>
        </View>

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
  streakView: {
    marginTop: 16,
    flexDirection: "column",
  },
  streakContainer: {
    backgroundColor: Styles.backgroundSecondary,
    borderRadius: 24,
    padding: 16,
    flexDirection: "column",
    borderBottomWidth: 3,
    borderColor: "#100909",
  },
  streakHeading: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginBottom: 16,
  },
  flamesImg: {
    height: 20,
    width: 20,
  },
  streakHeadingText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  streakDaysContainer: {
    flexDirection: "row",
    marginHorizontal: 8,
  },
  streakDaysText: {
    fontSize: 12,
    color: "white",
    marginTop: 4,
  },
  streakChecksContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  streakChecks: {
    width: 40,
    height: 40,
    borderRadius: "100%",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#382324",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  lessonsHeadingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  lessonsHeading: {
    color: Styles.textSecondary,
    fontSize: 20,
    fontWeight: "600",
  },
  allLessons: {
    color: Styles.textSecondary,
    fontSize: 14,
    fontWeight: "200",
  },
  lessonsListContainer: {
    paddingVertical: 8,
  },
  lessonsContainer: {
    borderRadius: 16,
    position: "relative",
    overflow: "hidden",
    paddingHorizontal: 16,
    paddingVertical: 24,
    width: 160,
    height: 128,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 16,
  },
  lessonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  groupText: {
    fontSize: 14,
    flexWrap: "wrap",
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

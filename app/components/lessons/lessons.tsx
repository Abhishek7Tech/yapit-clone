import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, router } from "expo-router";
import Styles from "@/app/utils/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LessonsList } from "@/app/types/types";


export default function Lessons({lessonList}: {lessonList:LessonsList[]}) {

    return (
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
              renderItem={({ item }) =>
                item.completed ? (
                  <View
                    style={[
                      styles.lessonsContainer,
                      {
                        backgroundColor: "#EF4444",
                        boxShadow: "0 3px #d12a2c",
                      },
                    ]}
                  >
                    <Ionicons
                      style={{ position: "absolute", top: 8, left: 12 }}
                      name="checkmark-circle-sharp"
                      size={20}
                      color={Styles.backgroundTertiary}
                    />
                    <Pressable
                      onPress={() => router.navigate(`/lesson/${item.lesson}`)}
                      disabled={item.completed}
                    >
                      <View style={{ paddingBottom: 12 }}>
                        <Text style={[styles.lessonText, { color: "white" }]}>
                          Lesson {item.lesson}
                        </Text>
                        <Text style={[styles.groupText, { color: "white" }]}>
                          Group {item.group}
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                ) : (
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
                )
              }
            />
          </View>
        </View>

    )
}

const styles = StyleSheet.create({
     
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
})
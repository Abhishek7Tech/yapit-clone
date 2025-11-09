import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import GroupBg from "../utils/groupsBg";
import Lessons from "../utils/lessonsList";
import Styles from "../utils/styles";
import AllLessons from "../utils/AllLessons";
import useLessonsStore from "../store/allLessonsStore";

const Dappy = require("@/assets/images/dappy.svg");

export function Groups({
  item,
}: {
  item: { group: number; showLessons: boolean };
}) {
    const toggleLessons = useLessonsStore((state) => state.toggleLessons);
    const showGroup = (groupNo: number) => {
        console.log("Group number", groupNo);
        toggleLessons(groupNo);
    }
  return (
    <View
      style={[
        styles.groupContainer,
        {
          backgroundColor: GroupBg[item.group % GroupBg.length].background,
          borderColor: GroupBg[item.group % GroupBg.length].border,
        },
      ]}
    >
      <Pressable onPress={() => showGroup(item.group)}>
        <View style={styles.groupHeader}>
          <View style={styles.groupName}>
            <Image
              style={styles.dappyImg}
              source={Dappy}
              accessibilityLabel="Dappy icon"
              contentFit="contain"
            />
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <Text style={styles.groupHeading}>Group {item.group}</Text>
              <Text style={styles.groupSubHeading}>0/6 Complete</Text>
            </View>
          </View>
          <View style={styles.overAllScore}>
            <Text style={styles.overAllScoreText}>-</Text>
            <Text style={styles.groupSubHeading}>Overall Score</Text>
          </View>
        </View>
      </Pressable>

     { item.showLessons && <FlatList
        contentContainerStyle={{
          paddingVertical: 8,
        }}
        data={Lessons}
        ItemSeparatorComponent={() => (
          <View
            style={{ height: 1, paddingTop: 1, backgroundColor: "white" }}
          ></View>
        )}
        ListFooterComponent={() => (
          <>
            <View
              style={{
                height: 1,
                paddingTop: 1,
                backgroundColor: "white",
              }}
            ></View>
            <View
              style={[
                styles.lessonContainer,
                {
                  backgroundColor: GroupBg[item.group % GroupBg.length].background,
                  borderColor: GroupBg[item.group % GroupBg.length].border,
                },
              ]}
            >
              <Text style={styles.lessonHeading}>Final Quiz</Text>
              <View>
                <AntDesign
                  name="right"
                  size={14}
                  color={Styles.textSecondary}
                />
              </View>
            </View>
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.lessonContainer}>
            <Text style={styles.lessonHeading}>Lesson {item.lesson}</Text>
            <View>
              <AntDesign name="right" size={14} color={Styles.textSecondary} />
            </View>
          </View>
        )}
      /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.backgroundColor,
    paddingHorizontal: 16,
  },
  groupContainer: {
    // backgroundColor: "#c4beae",
    borderRadius: 20,
    marginVertical: 12,
    // borderColor: "#d8d2c6",
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  groupName: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  dappyImg: {
    width: 30,
    height: 30,
  },
  groupHeading: {
    fontSize: 14,
    fontWeight: 600,
    color: Styles.textSecondary,
  },
  groupSubHeading: {
    fontSize: 11,
    color: Styles.textSecondaryWithOpacity,
    marginTop: 1,
  },
  overAllScore: {
    alignItems: "center",
  },
  overAllScoreText: {
    fontSize: 36,
    fontWeight: "800",
    transform: [{ scaleX: 3 }],
  },
  lessonContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#c4beae",
    // borderColor: "#d8d2c6",
    borderRadius: 20,
  },
  lessonHeading: {
    fontWeight: "500",
    color: Styles.textSecondary,
  },
});

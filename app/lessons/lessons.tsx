import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../utils/styles";
import { Image } from "expo-image";
import Lessons from "../utils/lessons";
import { AntDesign } from "@expo/vector-icons";
const Dappy = require("@/assets/images/dappy.svg");

export default function Lesson() {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable>
        <View style={styles.groupContainer}>
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
                <Text style={styles.groupHeading}>Group 1</Text>
                <Text style={styles.groupSubHeading}>0/6 Complete</Text>
              </View>
            </View>
            <View style={styles.overAllScore}>
              <Text style={styles.overAllScoreText}>-</Text>
              <Text style={styles.groupSubHeading}>Overall Score</Text>
            </View>
          </View>
          <FlatList
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
                  style={{ height: 1, paddingTop: 1, backgroundColor: "white" }}
                ></View>
                <View style={styles.lessonContainer}>
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
                  <AntDesign
                    name="right"
                    size={14}
                    color={Styles.textSecondary}
                  />
                </View>
              </View>
            )}
          />
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.backgroundColor,
    paddingHorizontal: 16,
  },
  groupContainer: {
    backgroundColor: "#c4beae",
    borderRadius: 20,
    borderColor: "#d8d2c6",
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
    backgroundColor: "#c4beae",
    borderColor: "#d8d2c6",
    borderRadius: 20,
  },
  lessonHeading: {
    fontWeight: "500",
    color: Styles.textSecondary,
  },
});

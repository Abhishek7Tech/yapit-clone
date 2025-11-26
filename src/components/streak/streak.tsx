import StreakDays from "@/src/utils/streak";
import Styles from "@/src/utils/styles";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { FlatList, StyleSheet, Text, View } from "react-native";

const flamesUrl = require("@/assets/images/flame.png");

export default function Streak() {
  const today = new Date().getDay();

  return (
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
  );
}

const styles = StyleSheet.create({
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
});

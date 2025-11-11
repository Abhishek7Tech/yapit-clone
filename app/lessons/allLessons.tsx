import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../utils/styles";
import  Groups from "../components/groups";
import AllLessons from "../utils/AllLessons";
import useLessonsStore from "../store/allLessonsStore";
import  Notifications  from "../components/notification";
import { useState } from "react";

export default function AllLesson() {
  const allLessons = useLessonsStore((state) => state.allLessons);
  const [notifications, setNotifications] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {notifications && (
          <Notifications
            notification={notifications}
            handleNotifications={setNotifications}
            message={"No score yet for this lesson."}
          />
        )}

        <FlatList
          data={allLessons}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Groups
              notification={notifications}
              handleNotifications={setNotifications}
              item={item}
            />
          )}
        />
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
});

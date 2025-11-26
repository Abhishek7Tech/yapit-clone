import { LessonsList } from "@/src/types/types";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Groups from "../../components/group/groups";
import Notifications from "../../components/notification/notification";
import useLessonsStore from "../../store/allLessonsStore";
import Styles from "../../utils/styles";

export default function AllLesson(lessonList: LessonsList) {
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
            icon="notification"
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

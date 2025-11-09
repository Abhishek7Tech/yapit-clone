import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../utils/styles";
import { Groups } from "../components/groups";
import AllLessons from "../utils/AllLessons";
import useLessonsStore from "../store/allLessonsStore";


export default function Lesson() {
  const allLessons = useLessonsStore((state) => state.allLessons);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allLessons}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          
          <Groups item={item}/>
        )}
      />
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

import { View, Text, StyleSheet } from "react-native";

export default function Lessons() {
    return <View style={styles.container}><Text>Show all lessons.</Text></View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red"
    }
})
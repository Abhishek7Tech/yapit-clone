import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  StatusBar,
} from "react-native";
import Styles from "../utils/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Notifications from "../components/notification";

export default function ReportAnIssue() {
  const [reason, setReason] = useState("");
  const [explaination, setExplaination] = useState("");
  const [notifications, setNotifications] = useState(false);
  const handleSubmit = () => {
    if (!reason || !explaination) {
        setNotifications(true);
        return;
    }
    console.log("Inputs", reason, explaination);
  };
  return (
    <SafeAreaView style={styles.container}>
      {notifications && (
        <View>
        <Notifications
          notification={notifications}
          handleNotifications={setNotifications}
          message={"Please fill in all the fields."}
          icon="alert"
        />
        </View>
      )}
      {/* ISSUE */}
      <View style={styles.headerContainer}>
        <View>
          <Pressable onPress={() => router.back()}>
            <Entypo name="cross" size={24} color={Styles.textSecondary} />
          </Pressable>
        </View>
        <Text style={styles.headingText}>Report an Issue</Text>
        <View></View>
      </View>

      <View style={styles.formContainer}>
        <View>
          <Text style={styles.headingLabel}>Reason</Text>
          <TextInput
            style={styles.inputText}
            placeholder="What's the reason?"
            inputMode="text"
            value={reason}
            onChangeText={setReason}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.headingLabel}>Explain</Text>
          <TextInput
            style={[
              styles.inputText,
              { height: 256, textAlignVertical: "top" },
            ]}
            placeholder="Tell us more..."
            inputMode="text"
            value={explaination}
            onChangeText={setExplaination}
          ></TextInput>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => handleSubmit()}
          //   onPress={() => router.navigate("/lesson/3?seq=1")}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  formContainer: {
    marginTop: 48,
    gap: 24,
  },
  headingLabel: {
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
    fontSize: 14,
  },
  inputText: {
    borderRightWidth: 1,
    borderColor: "#e2ddd3",
    borderBottomWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "white",
    tintColor: "black",
  },
  buttonContainer: {
    paddingHorizontal: 16,
    width: "100%",
    position: "absolute",
    bottom: StatusBar.currentHeight,
    alignSelf: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 24,
    backgroundColor: Styles.backgroundSecondary,
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});

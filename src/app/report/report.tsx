import { Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { useState } from "react";
import {
  Platform,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Notifications from "../../components/notification/notification";
import useNotificationStore from "../../store/thanksNotification";
import Styles from "../../utils/styles";

export default function ReportAnIssue() {
  const [reason, setReason] = useState("");
  const [explaination, setExplaination] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [submitNotification, setSubmitNotification] = useState(false);
  const store = useNotificationStore();
  const resetForm = () => {
    setSubmitNotification(false);
    setExplaination("");
    setReason("");
  };
  const handleSubmit = () => {
    if (!reason || !explaination) {
      setNotifications(true);
      return;
    }
    console.log("Inputs", reason, explaination);
    setSubmitNotification(true);
    setTimeout(() => {
      resetForm();
      store.toggleThanksNotification(true);
      router.navigate("/home");
    }, 3000);
  };
  return (
    <BlurView
      style={styles.blurContainer}
      tint="extraLight"
      intensity={submitNotification ? 90 : 0}
    >
      {submitNotification && (
        <Notifications
          notification={notifications}
          handleNotifications={setNotifications}
          message={"Submitting report..."}
          icon="submit"
        />
      )}

      <SafeAreaView
        style={[styles.container, { zIndex: submitNotification ? -100 : 0 }]}
      >
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
        {notifications && !submitNotification && (
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

        <View style={[styles.headerContainer]}>
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
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: -100,
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Styles.backgroundColor,
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
      shadowColor: '#0000001a',
         ...Platform.select({
          ios: {
            shadowOpacity: 0.1,
            shadowRadius: 3,
            shadowOffset: { width: 0, height: 1 },
          },
          android: {
            elevation: 4,
          },
        }),
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  blurContainer: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.2)",
    // paddingHorizontal: 16,
    zIndex: 200,
    position: "relative",

    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
  },
});

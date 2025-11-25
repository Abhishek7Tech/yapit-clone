import { Chat } from "@/app/types/types";
import Styles from "@/app/utils/styles";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Messages({ messages }: { messages: Chat[] }) {
  return (
    <View style={styles.messagesContainer}>
      <FlatList
        data={messages}
        contentContainerStyle={{
          gap: 20,
          paddingHorizontal: 16,
        }}
        renderItem={({ item }) =>
          item.sender === "user" ? (
            <View style={styles.userMessageContainer}>
              <LinearGradient
                colors={["#3B82F6", "#1D4ED8", "#1E3A8A"]}
                style={styles.messageIcon}
              >
                <Text style={styles.iconText}>U</Text>
              </LinearGradient>
              <Text
                style={[
                  styles.messageText,
                  {
                    backgroundColor: Styles.backgroundSecondary,
                    color: "white",
                  },
                ]}
              >
                {item.message}
              </Text>
            </View>
          ) : (
            <View style={styles.agentMessageContainer}>
              <LinearGradient
                colors={["#22C55E", "#15803D", "#14532D"]}
                style={styles.messageIcon}
              >
                <Text style={styles.iconText}>AI</Text>
              </LinearGradient>
              <Text
                style={[
                  styles.messageText,
                  { backgroundColor: "white", color: "#2D1C1C" },
                ]}
              >
                {item.message}
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1,
    paddingTop: 16,
    overflowY: "auto",
    paddingBottom: 8,
  },
  userMessageContainer: {
    flexDirection: "row-reverse",
    gap: 8,
    justifyContent: "flex-start",
  },
  agentMessageContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-start",
  },
  messageIcon: {
    height: 32,
    width: 32,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontWeight: "600",
    fontSize: 14,
    color: "white",
  },
  messageText: {
    textAlign: "left",
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    width: "auto",
    maxWidth: "78%",
    borderRadius: 8,
  },
});

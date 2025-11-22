import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../utils/styles";
import { useEffect, useState } from "react";
import { Agent } from "../types/types";
import Loading from "../components/loading/loading";

export default function Agents() {
  const [agentsList, setAgentsList] = useState<Agent[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/agents");
      const data = await response.json();
      if (data.agentsList) {
        setAgentsList(data.agentsList);
      }
    })();
  }, []);
   if (!agentsList.length) {
      return (
        <SafeAreaView style={styles.container}>
          <Loading />
        </SafeAreaView>
      );
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.agentsContainer}>
        <Text style={styles.agentsHeadingText}>
          Select the level that matches your Spanish proficiency.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Styles.backgroundColor,
    alignItems: "center",
  },
  agentsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  agentsHeadingText: {
    textAlign: "center",
    color: Styles.textSecondary,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "400",
  },
});

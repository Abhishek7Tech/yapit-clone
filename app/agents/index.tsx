import { StyleSheet, View, Text, Pressable, ColorValue } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../utils/styles";
import { useEffect, useState } from "react";
import { Agent } from "../types/types";
import Loading from "../components/loading/loading";
import { FlatList } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import genrateAgentsBackground from "../utils/agentsStyles";
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
        <FlatList
          data={agentsList}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 16,
            alignItems: "center",
          }}
          renderItem={({ item }) => (
            <Pressable style={{width: "100%", flexDirection: "row"}}>
              <BlurView intensity={20} tint="light" style={{width: "100%"}}>
              <LinearGradient
                style={styles.agentsListContainer}
                colors={
                  genrateAgentsBackground(item.level) as [
                    ColorValue,
                    ColorValue
                  ]
                }
              >
                  <Text style={styles.agentLevelText}>{item.level}</Text>
                  <View style={styles.agentsDetailContainer}>
                    <Text style={styles.agentsTitle}>{item.title}</Text>
                    <Text style={styles.agentDescriptionText}>
                      {item.description}
                    </Text>
                  </View>
              </LinearGradient>
                </BlurView>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Styles.backgroundColor,
  },
  agentsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  agentsHeadingText: {
    textAlign: "center",
    color: Styles.textSecondary,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "400",
  },
  agentsListContainer: {
    minHeight: 90,
    borderWidth: 1,
    borderColor: "#FFFFFF33",
    justifyContent: "space-between",
    borderRadius: 8,
    padding: 12,
    width: "100%"
  },
  agentLevelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  agentsDetailContainer: {
    marginTop: 4,
  },
  agentsTitle: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 18,
    color: "white",
  },
  agentDescriptionText: {
    fontSize: 14,
    opacity: 0.9,
    color: "white",
  },
});

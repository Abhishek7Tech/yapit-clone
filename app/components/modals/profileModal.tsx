import {
  Animated,
  Pressable,
  View,
  StyleSheet,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { useEffect, useRef } from "react";
import { BlurView } from "expo-blur";
import Styles from "@/app/utils/styles";
import Entypo from "@expo/vector-icons/Entypo";
import { Content } from "@/app/types/types";
const screenDimensions = Dimensions.get("screen").height;

export default function ProfileModal({
  showModal,
  modelHandler,
  content,
}: {
  showModal: boolean;
  modelHandler: () => void;
  content: Content;
}) {
  const slideAnim = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <BlurView
      tint="extraLight"
      intensity={showModal ? 100 : 0}
      style={styles.profileModelContainer}
    >
      <Pressable style={{ flex: 1 }} onPress={() => modelHandler()}>
        <View></View>
      </Pressable>

      <Animated.View
        style={[
          styles.contentContainer,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.containerHeader}>
          <Pressable onPress={() => modelHandler()}>
            <Entypo name="cross" size={20} color={Styles.textSecondary} />
          </Pressable>
          <Text style={styles.containerHeaderText}>{content.name}</Text>
        </View>
        <View style={styles.contentTextContainer}>
          <Text style={styles.contentText}>{content.name}</Text>
          <Text style={styles.contentText}>{content.content}</Text>
        </View>
      </Animated.View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  profileModelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flex: 1,
    backgroundColor: "transparent",
    zIndex: 400,
    justifyContent: "flex-end",
  },
  contentContainer: {
    height: screenDimensions * 0.75,
    backgroundColor: Styles.backgroundColor,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  containerHeader: {
    paddingHorizontal: 16,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
  },
  containerHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: Styles.textSecondary,
  },
  contentTextContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  contentText: {
    color: Styles.textSecondary,
  },
});

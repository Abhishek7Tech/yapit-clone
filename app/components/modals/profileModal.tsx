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
const screenDimensions = Dimensions.get("screen").height;

export default function ProfileModal({
  showModal,  
  modelHandler,
}: {
    showModal: boolean,
  modelHandler: () => void;
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
    <BlurView tint="extraLight"
      intensity={showModal ? 100 : 0} style={styles.profileModelContainer}>
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
        <Text> Modal....</Text>
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
    backgroundColor: Styles.backgroundColor
  }
});

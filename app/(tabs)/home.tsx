import { View, Text, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../utils/styles";
import { Image } from "expo-image";
const coinUrl = require("@/assets/images/coin.webp");
export default function HomeTab() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingView}>
        <Text style={styles.headingText}>Welcome John Doe</Text>
        <Text style={styles.subHeadingText}>Hola, ¿cómo estás hoy?</Text>
      </View>
      <View style={styles.accountsView}>
        <View style={styles.accountsContainer}>
          <View style={styles.accountsHeadingView}>
            <Text style={styles.accountsHeadingText}> Available Balance</Text>
            <Text style={styles.accountsBalanceText}>
              0<Text style={{fontSize: 12, fontWeight: "400", textTransform: "capitalize"}}> yap</Text>
            </Text>
          </View>
          <Image source={coinUrl} accessibilityLabel="Yap Coin" contentFit="contain" style={styles.currencyImg} />
        </View>
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
  headingView: {
    paddingVertical: 8,
  },
  headingText: {
    fontSize: 18,
    color: Styles.textSecondary,
    fontWeight: "bold",
    lineHeight: 20,
  },
  subHeadingText: {
    fontSize: 14,
    color: "#5C4B4B",
    lineHeight: 15,
  },
  accountsView: {
    marginTop: 8,
  },
  accountsContainer: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#e3ded3",
    borderBottomWidth: 3,
    borderRightWidth: 1,
    boxShadow:  "0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px -1px rgba(0, 0, 0, 0.1)",
    ...Platform.select({
      ios: {
        shadowColor: "#0000001a",
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowBRadius: 1
      },
      android: {
        elevation: 5
      }
    })
    
  },
  accountsHeadingView: {
    flexDirection: "column",
  },
  accountsHeadingText: {
    fontSize: 14,
    color: Styles.textSecondary,
    marginBottom: 1
  },
  accountsBalanceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Styles.textSecondary
  },
  currencyImg: {
    width: 64,
    height: 64
  }
});

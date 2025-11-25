import { Text, StyleSheet, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "../utils/styles";
import { Image } from "expo-image";
import useBalanceStore from "../store/balanceStore";

const coinUrl = require("@/assets/images/coin.webp");
export default function ProfileTab() {
  const balanceStore = useBalanceStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.accountContainer}>
        <Text style={styles.accountHeading}>Account</Text>
        <View style={styles.accountDetailsContainer}>
          <View style={styles.accountIconContainer}>
            <Text style={styles.accountIconText}>J</Text>
          </View>
          <View style={styles.accountDetails}>
            <Text style={styles.accountNameText}>John Doe</Text>
            <Text style={styles.accountJoiningText}>Joined October</Text>
          </View>
        </View>
        <View style={styles.accountsView}>
          <View style={styles.accountsContainer}>
            <View style={styles.accountsHeadingView}>
              <Text style={styles.accountsHeadingText}> Available Balance</Text>
              <Text style={styles.accountsBalanceText}>
                {balanceStore.balance}
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    textTransform: "capitalize",
                  }}
                >
                  {" "}
                  yap
                </Text>
              </Text>
            </View>
            <Image
              source={coinUrl}
              accessibilityLabel="Yap Coin"
              contentFit="contain"
              style={styles.currencyImg}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accountContainer: {
    backgroundColor: Styles.backgroundColor,
    paddingBottom: 45,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  accountHeading: {
    fontSize: 20,
    fontWeight: 600,
    color: Styles.textSecondary,
    textAlign: "center",
  },
  accountDetailsContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  accountIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: Styles.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  accountIconText: {
    fontSize: 30,
    color: "white",
    fontWeight: "300",
  },
  accountDetails: {
    justifyContent: "center",
  },
  accountNameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Styles.textSecondary,
  },
  accountJoiningText: {
    fontSize: 11,
    marginTop: 6,
    color: "#9CA3AF",
  },
  accountsView: {
    marginTop: 8,
  },
  accountsContainer: {
    position: "absolute",
    width: "100%",
    bottom: -90,
    // marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 10,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#e3ded3",
    borderBottomWidth: 3,
    borderRightWidth: 1,
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px -1px rgba(0, 0, 0, 0.1)",
    ...Platform.select({
      ios: {
        shadowColor: "#0000001a",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowBRadius: 1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  accountsHeadingView: {
    flexDirection: "column",
  },
  accountsHeadingText: {
    fontSize: 14,
    color: Styles.textSecondary,
    marginBottom: 1,
  },
  accountsBalanceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Styles.textSecondary,
  },
  currencyImg: {
    width: 64,
    height: 64,
  },
});

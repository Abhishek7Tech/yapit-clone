import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image } from "expo-image";
import {
    FlatList,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useBalanceStore from "../../store/balanceStore";
import Styles from "../../utils/styles";

import { Link, RelativePathString, router } from "expo-router";
import { useEffect, useState } from "react";
import ProfileModal from "../../components/modals/profileModal";
import { Content } from "../../types/types";
import ProfileData from "../../utils/profileList";

const coinUrl = require("@/assets/images/coin.webp");
export default function ProfileTab() {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<Content | null>(null);
  const balanceStore = useBalanceStore();
  useEffect(() => {}, []);
  const linkButtonHandler = (
    type: string,
    link?: RelativePathString,
    modalContent?: Content
  ) => {
    if (type === "modal" && modalContent) {
      setContent(modalContent);
      setShowModal(true);
      // Open Modal
    }
    if (type === "link" && link) {
      console.log("CLICKED", link);
      router.navigate(link);
    }
  };
  const modelHandler = () => {
    setShowModal(false);
  };

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
      <FlatList
        data={ProfileData}
        contentContainerStyle={{
          flex: 1,
          paddingTop: 50,
          paddingBottom: 24,
          backgroundColor: "white",
        }}
        renderItem={({ item }) =>
          item.type === "modal" ? (
            <Pressable
              onPress={() => linkButtonHandler(item.type, undefined, item)}
              style={styles.profileLinkButton}
            >
              <Text>{item.name}</Text>
              <AntDesign name="right" size={16} color="#9CA3AF" />
            </Pressable>
          ) : (
            <Pressable
              onPress={() =>
                linkButtonHandler(item.type, item.link as RelativePathString)
              }
              style={styles.profileLinkButton}
            >
              <Text>{item.name}</Text>
              <AntDesign name="right" size={16} color="#9CA3AF" />
            </Pressable>
          )
        }
        ItemSeparatorComponent={() => (
          <View style={styles.profileLinkSeperator}></View>
        )}
        ListFooterComponent={() => (
          <View style={styles.listFooterContainer}>
            <Text style={styles.listFooterText}>This is a clone project.</Text>
            <Text style={styles.listFooterText}>
              Try out the real Yap!{" "}
              <Link style={{ color: "blue" }} href={"https://www.goyap.ai/"}>
                here.
              </Link>
            </Text>
            <Link href={"https://github.com/Abhishek7Tech/yapit-clone"}>
              <FontAwesome
                name="github"
                size={24}
                color={Styles.textSecondary}
              />
            </Link>
          </View>
        )}
      />
      {showModal && content && (
        <ProfileModal
          modelHandler={modelHandler}
          showModal={showModal}
          content={content}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#e3ded3",
    borderBottomWidth: 3,
    borderRightWidth: 1,
     ...Platform.select({
      ios: {
        shadowColor: '#0000001a',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
      },
      android: {
        elevation: 4,
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
  profileLinkButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  profileTextLink: {
    fontSize: 15,
    fontWeight: "500",
    color: Styles.textSecondary,
  },
  profileLinkSeperator: {
    width: 1,
    paddingHorizontal: 16,
    color: Styles.textSecondary,
  },
  listFooterContainer: {
    marginTop: 24,
    alignItems: "center",
    gap: 3,
  },
  listFooterText: {
    fontSize: 14,
    fontWeight: "500",
    color: Styles.textSecondary,
  },
});

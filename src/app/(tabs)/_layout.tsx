import { FontAwesome } from "@expo/vector-icons";
import { Tabs, useSegments } from "expo-router";
import useTabsStore from "../../store/tabsStore";
export default function TabLayout() {
  const segments = useSegments();
  const tabStore = useTabsStore();
  const hideTabBar = segments.some((s) => s === "tutor" || s === "[agent]") && tabStore.showTabs === false;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "#999595",
        tabBarActiveTintColor: "#2d1c1c",
        tabBarStyle: hideTabBar ? {display: "none"}: { backgroundColor: "#fdfbfa" },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="tutor"
        options={{
          headerShown: false,
          tabBarLabel: "Tutor",
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="comments" color={color} />
          ),
          href: "/(tabs)/tutor"
        }
        
      }
      ></Tabs.Screen>
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="user" color={color} />
          ),
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}

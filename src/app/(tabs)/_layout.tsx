import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Redirect, Tabs } from "expo-router";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import Colors from "@/constants/Colors";
import { useAuth } from "@/providers/AuthProvider";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
}) {
  return <FontAwesome5 size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  const { session } = useAuth();
  if (!session) {
    return <Redirect href={"/log-in"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: "DegularBold",
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="producteurs"
        options={{
          title: "Nos producteurs",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="address-book" color={color} />
          ),
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome5
          //           name="info-circle"
          //           size={25}
          //           color={Colors["light"].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="commandes"
        options={{
          title: "Vos commandes",
          headerTitleStyle: {
            fontFamily: "DegularSemibold",
            fontSize: 25,
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}

import { FontText } from "@/components/FontText";

import Colors from "@/constants/Colors";
import { useCart } from "@/providers/CartProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable, View } from "react-native";

const _layout = () => {
  const { items } = useCart();
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "DegularSemibold",
          fontSize: 25,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Nos producteurs",
          headerRight: () => (
            <Link href="/panier" asChild>
              <Pressable>
                {({ pressed }) => (
                  <View
                    style={{
                      marginRight: 5,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome5
                      name="shopping-basket"
                      size={25}
                      color={
                        items.length
                          ? Colors["light"].tint
                          : Colors["light"].text
                      }
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />

                    {items.length > 0 && (
                      <FontText
                        style={{
                          color: Colors.light.tint,
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        {items.length}
                      </FontText>
                    )}
                  </View>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
};

export default _layout;

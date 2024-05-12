import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Nos producteurs",
          headerRight: () => (
            <Link href="/panier" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="shopping-basket"
                    size={25}
                    color={Colors["light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
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

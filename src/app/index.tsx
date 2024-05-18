import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, Redirect } from "expo-router";
import { Image } from "expo-image";
import { FontText } from "@/components/FontText";
import { MonoText } from "@/components/StyledText";

export default function Index() {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/log-in"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Image
        style={styles.image}
        source={require("@assets/images/locafresh_condensed.png")}
        contentFit="contain"
      />
      <Link href={"/producteurs"} asChild>
        <Pressable style={styles.button}>
          <FontText
            style={{
              fontWeight: 600,
              fontSize: 25,
              color: "white",
            }}
          >
            Producteurs
          </FontText>
        </Pressable>
      </Link>
      <Link href={"/log-in"} asChild>
        <Pressable style={styles.button}>
          <FontText
            style={{
              fontWeight: 600,
              fontSize: 25,
              color: "white",
            }}
          >
            Se connecter
          </FontText>
        </Pressable>
      </Link>
      <Pressable
        style={[styles.button, { backgroundColor: "tomato" }]}
        onPress={() => supabase.auth.signOut()}
      >
        <FontText style={{ fontWeight: 600, fontSize: 25, color: "white" }}>
          Se déconnecter
        </FontText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    width: "60%",
    aspectRatio: 1 / 1,
  },
  button: {
    backgroundColor: Colors.light.tint,
    flexDirection: "row",
    gap: 10,
    padding: 10,
    paddingTop: 7.5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});

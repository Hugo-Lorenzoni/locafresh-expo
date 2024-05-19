import { FontText } from "@/components/FontText";
import Colors from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { FontAwesome6 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfileIndexPage() {
  const { session, loading, isAdmin } = useAuth();
  const menu = [
    { title: "Mes commandes", href: "/profile/orders" },
    { title: "Mes informations", href: "/profile/informations" },
    { title: "Mes adresses", href: "/profile/addresses" },
    { title: "Mes moyens de paiement", href: "/profile/payment-methods" },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={menu}
        renderItem={({ item, index }) => (
          <Link key={index} href={item.href} asChild>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 15,
                justifyContent: "space-between",
              }}
            >
              <FontText style={{ fontSize: 20 }}>{item.title}</FontText>
              <FontAwesome6 name="chevron-right"></FontAwesome6>
            </Pressable>
          </Link>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: "lightgrey" }} />
        )}
      />
      {isAdmin && (
        <Link href={"/"} asChild>
          <Pressable style={styles.adminButton}>
            <FontText
              style={{
                fontWeight: 600,
                fontSize: 25,
                color: Colors.light.tint,
              }}
            >
              Espace admin
            </FontText>
          </Pressable>
        </Link>
      )}
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
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: Colors.light.tint,
    flexDirection: "row",
    gap: 10,
    padding: 10,
    paddingTop: 7.5,
    marginTop: "auto",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  adminButton: {
    backgroundColor: "white",
    borderColor: Colors.light.tint,
    borderWidth: 3,
    flexDirection: "row",
    gap: 10,
    padding: 10,
    paddingTop: 7.5,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

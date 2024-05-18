import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { Link, Stack } from "expo-router";
import { Image } from "expo-image";

import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const FormData = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
  password: z.string().min(8, "Le mot de passe n'est pas valide"),
});

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePress() {
    setLoading(true);
    const result = FormData.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Se connecter" }} />
      <Image
        style={styles.image}
        source={require("@assets/images/locafresh_condensed.png")}
        contentFit="contain"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="email@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <Pressable
        style={[styles.button, { opacity: loading ? 0.5 : 1 }]}
        onPress={handlePress}
        disabled={loading}
      >
        {loading ? (
          <Text style={{ fontWeight: 600, fontSize: 20, color: "white" }}>
            Chargement...
          </Text>
        ) : (
          <>
            <Text style={{ fontWeight: 600, fontSize: 20, color: "white" }}>
              Se connecter
            </Text>
            <FontAwesome5 style={{ color: "white" }} name="check" size={20} />
          </>
        )}
      </Pressable>
      <Link href="/register" style={styles.textButton}>
        Vous n'avez pas de compte ? Inscrivez-vous !
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  image: {
    alignSelf: "center",
    width: "60%",
    aspectRatio: 1 / 1,
  },
  label: {
    color: "gray",
  },
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
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
    marginTop: 20,
  },
});

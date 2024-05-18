import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link, Stack } from "expo-router";
import { Image } from "expo-image";
import { useState } from "react";
import Colors from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { FontText } from "@/components/FontText";

const FormData = z
  .object({
    email: z.string().email("Veuillez entrer une adresse email valide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePress() {
    setLoading(true);
    const result = FormData.safeParse({ email, password, confirmPassword });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError("");

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "S'incrire à LocaFresh" }} />
      <Image
        style={styles.image}
        source={require("@assets/images/locafresh_condensed.png")}
        contentFit="contain"
      />
      <FontText style={styles.label}>Email</FontText>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="email@gmail.com"
        style={styles.input}
      />

      <FontText style={styles.label}>Mot de passe</FontText>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <FontText style={styles.label}>Confirmer le mot de passe</FontText>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      {error && <FontText style={{ color: "red" }}>{error}</FontText>}

      <Pressable
        style={[styles.button, { opacity: loading ? 0.5 : 1 }]}
        onPress={handlePress}
        disabled={loading}
      >
        {loading ? (
          <FontText style={{ fontWeight: 600, fontSize: 20, color: "white" }}>
            Chargement...
          </FontText>
        ) : (
          <>
            <FontText style={{ fontWeight: 600, fontSize: 20, color: "white" }}>
              S'inscrire
            </FontText>
            <FontAwesome5
              style={{ color: "white" }}
              name="user-plus"
              size={20}
            />
          </>
        )}
      </Pressable>
      <Link href="/log-in" style={styles.textButton}>
        Vous avez déjà un compte ? Connectez-vous !
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

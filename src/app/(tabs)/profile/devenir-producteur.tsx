import Button from "@/components/Button";
import { FontText } from "@/components/FontText";
import { FontTextInput } from "@/components/FontTextInput";
import ImagePickerComponent from "@/components/ImagePickerComponent";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Stack, router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

// const handleImageUpload = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (permissionResult.granted === false) {
//         alert('Permission to access camera roll is required!');
//         return;
//     }

//     const imageResult = await ImagePicker.launchImageLibraryAsync();
//     if (!imageResult.cancelled) {
//         handleChange('image', imageResult.uri);
//     }
// };

type Producteur = {
  nom: string;
  rue: string;
  numero: string;
  code_postal: string;
  ville: string;
  telephone: string;
  email: string;
};

export default function DevenirProducteurPage() {
  const { session, profile } = useAuth();
  if (!session) {
    return null;
  }
  const [producteur, setProducteur] = useState<Producteur>({
    nom: "",
    rue: "",
    numero: "",
    code_postal: "",
    ville: "",
    telephone: "",
    email: "",
  });
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const handleChange = (key: string, value: string) => {
    setProducteur((prev) => ({ ...prev, [key]: value }));
  };
  const handlePress = async () => {
    console.log(producteur);
    console.log(image);
    if (!image) {
      console.log("no image");
      return;
    }

    const base64Img = await FileSystem.readAsStringAsync(image.uri, {
      encoding: FileSystem?.EncodingType?.Base64,
    });
    // console.log(base64Img);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("files")
      .upload(`${session?.user?.id}/${image?.fileName}`, base64Img);
    console.log(uploadData, uploadError);

    // const { rue, numero, code_postal, ville, ...reste } = producteur;

    // const adresse = `${rue} ${numero}, ${code_postal} ${ville}`;

    const { data: insertData, error: insertError } = await supabase
      .from("producteurs")
      .insert({
        id: session?.user?.id,
        ...producteur,
        image: uploadData?.path,
      });
    console.log(insertData, insertError);

    const group = "PRODUCTEUR";

    const { data: updateData, error: updateError } = await supabase
      .from("profiles")
      .update({ group })
      .eq("id", session?.user?.id);
    console.log(updateData, updateError);

    // supabase.auth.reauthenticate();
    // router.navigate("(producteurs)/");
    supabase.auth.refreshSession();
    // supabase.auth.signOut();
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Devenir Producteur" }} />
      <FontText style={styles.label}>Email</FontText>
      <FontTextInput
        value={producteur.email}
        onChangeText={(text) => handleChange("email", text)}
        placeholder="email@gmail.com"
        style={styles.input}
        keyboardType="email-address"
      />
      <FontText style={styles.label}>Nom de l'exploitation</FontText>
      <FontTextInput
        value={producteur.nom}
        onChangeText={(text) => handleChange("nom", text)}
        placeholder="Nom du producteur"
        style={styles.input}
      />
      <FontText style={styles.label}>Adresse</FontText>
      <View style={styles.group}>
        <FontText style={styles.subLabel}>Rue :</FontText>
        <FontTextInput
          value={producteur.rue}
          onChangeText={(text) => handleChange("rue", text)}
          placeholder="Rue"
          style={[styles.input, { flexGrow: 1, marginRight: 10 }]}
        />

        <FontText style={styles.subLabel}>N°</FontText>
        <FontTextInput
          value={producteur.numero}
          onChangeText={(text) => handleChange("numero", text)}
          placeholder="Numéro"
          style={styles.input}
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.group}>
        <FontText style={styles.subLabel}>Ville :</FontText>
        <FontTextInput
          value={producteur.ville}
          onChangeText={(text) => handleChange("ville", text)}
          placeholder="Mons"
          style={[styles.input, { flexGrow: 1, marginRight: 10 }]}
        />
        <FontText style={styles.subLabel}>Code postal :</FontText>
        <FontTextInput
          value={producteur.code_postal}
          onChangeText={(text) => handleChange("code_postal", text)}
          placeholder="7000"
          style={styles.input}
          keyboardType="number-pad"
        />
      </View>
      <FontText style={styles.label}>Téléphone</FontText>
      <FontTextInput
        value={producteur.telephone}
        onChangeText={(text) => handleChange("telephone", text)}
        placeholder="Téléphone"
        style={styles.input}
        keyboardType="phone-pad"
      />
      <FontText style={styles.label}>Image de couverture</FontText>

      <ImagePickerComponent image={image} setImage={setImage} />
      <Button
        style={{ marginBottom: 35 }}
        title="Devenir producteur"
        onPress={handlePress}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  label: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subLabel: {
    fontSize: 20,
    color: "gray",
  },
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  group: { flexDirection: "row", alignItems: "center", gap: 5 },
});

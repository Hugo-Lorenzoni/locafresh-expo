import Button from "@/components/Button";
import { FontText } from "@/components/FontText";
import { FontTextInput } from "@/components/FontTextInput";
import ImagePickerComponent from "@/components/ImagePickerComponent";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

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
  codePostal: string;
  ville: string;
  telephone: string;
  email: string;
};

export default function DevenirProducteurPage() {
  const [producteur, setProducteur] = useState<Producteur>({
    nom: "",
    rue: "",
    numero: "",
    codePostal: "",
    ville: "",
    telephone: "",
    email: "",
  });
  const [image, setImage] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    setProducteur((prev) => ({ ...prev, [key]: value }));
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
          value={producteur.codePostal}
          onChangeText={(text) => handleChange("codePostal", text)}
          placeholder="7000"
          style={styles.input}
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
        onPress={() => console.log(producteur)}
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

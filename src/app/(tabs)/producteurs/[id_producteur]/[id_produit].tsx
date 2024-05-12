import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

import producteurs from "@/constants/Producteurs";

const ProduitPage = () => {
  const { id_producteur, id_produit } = useLocalSearchParams();
  const producteur = producteurs.find((p) => p.id.toString() === id_producteur);
  if (!producteur || !id_producteur || id_producteur instanceof Array)
    return <Text>Producteur introuvable</Text>;
  const produit = producteur.produits.find(
    (p) => p.id.toString() === id_produit
  );
  if (!produit || !id_produit || id_produit instanceof Array)
    return <Text>Producteur introuvable</Text>;
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: produit.nom }} />
      <View>
        <Image style={styles.image} source={produit.image} />
        <View style={styles.absoluteContainer}>
          <Text
            style={{
              fontWeight: 600,
              fontSize: 25,
              marginVertical: 5,
              color: "white",
              textShadowColor: "black",
              textShadowRadius: 20,
              textShadowOffset: { width: 0, height: 0 },
              padding: 10,
              paddingBottom: 0,
            }}
          >
            {produit.nom}
          </Text>
        </View>
      </View>
      <Text style={{ fontStyle: "italic", textAlign: "right", marginTop: 5 }}>
        {producteur.nom}
      </Text>
      <View style={styles.card}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>Prix :</Text>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>{produit.prix} €</Text>
      </View>
    </View>
  );
};

export default ProduitPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1 / 1,
    borderRadius: 10,
  },
  absoluteContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  card: {
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    paddingTop: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  info: { gap: 5, flexDirection: "row", alignItems: "center" },
});

import { Stack, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

import producteurs from "@/constants/Producteurs";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { useCart } from "@/providers/CartProvider";

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

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handlePress = async () => {
    if (quantity < 1 || produit.enStock === false) return;
    addToCart(produit, quantity);
  };

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
      {produit.enStock === false ? (
        <Pressable
          style={[styles.button, { opacity: 0.5, marginTop: "auto" }]}
          disabled
        >
          <Text
            style={{
              fontWeight: 600,
              fontSize: 20,
              color: "white",
              fontStyle: "italic",
            }}
          >
            Épuisé
          </Text>
        </Pressable>
      ) : (
        <>
          <View style={styles.quantity}>
            <Pressable
              style={[
                styles.quantityButton,
                { opacity: quantity <= 1 ? 0.5 : 1 },
              ]}
              onPress={() => setQuantity(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Text style={{ fontSize: 20, fontWeight: 600 }}>-</Text>
            </Pressable>
            <Text style={{ fontSize: 20, fontWeight: 600 }}>
              Quantité : {quantity}
            </Text>
            <Pressable
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={{ fontSize: 20, fontWeight: 600 }}>+</Text>
            </Pressable>
          </View>
          <Pressable style={styles.button} onPress={() => handlePress()}>
            <Text style={{ fontWeight: 600, fontSize: 20, color: "white" }}>
              Ajouter au panier
            </Text>
            <FontAwesome
              style={{ color: "white" }}
              name="shopping-basket"
              size={20}
            />
          </Pressable>
        </>
      )}
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
    borderRadius: 10,
    padding: 10,
    paddingTop: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: { gap: 5, flexDirection: "row", alignItems: "center" },
  button: {
    backgroundColor: Colors.light.tint,
    flexDirection: "row",
    gap: 10,
    padding: 10,
    paddingTop: 7.5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 10,
  },
  quantityButton: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

import { FlatList, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import ProduitsListItem from "@/components/ProduitsListItem";

import producteurs from "@/constants/Producteurs";
import { FontText } from "@/components/FontText";

const ProducteurPage = () => {
  const { id_producteur } = useLocalSearchParams();
  const producteur = producteurs.find((p) => p.id.toString() === id_producteur);
  if (!producteur || !id_producteur || id_producteur instanceof Array)
    return <FontText>Producteur introuvable</FontText>;
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: producteur.nom }} />
      <View>
        <Image style={styles.image} source={producteur.image} />
        <View style={styles.absoluteContainer}>
          <FontText
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
            {producteur.nom}
          </FontText>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.info}>
          <FontAwesome6 name="house" />
          <FontText>{producteur.adresse}</FontText>
        </View>
        <View style={styles.info}>
          <FontAwesome6 name="phone-volume" />
          <FontText>{producteur.telephone}</FontText>
        </View>
        <View style={styles.info}>
          <FontAwesome6 name="at" />
          <FontText>{producteur.email}</FontText>
        </View>
      </View>
      <FontText
        style={{
          fontWeight: 500,
          marginTop: 10,
          marginBottom: 5,
          fontSize: 20,
        }}
      >
        Produits
      </FontText>
      <FlatList
        data={producteur.produits}
        renderItem={({ item }) => (
          <ProduitsListItem id={id_producteur} produit={item} />
        )}
        contentContainerStyle={{
          rowGap: 5,
        }}
      ></FlatList>
    </View>
  );
};

export default ProducteurPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 1,
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
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },

  info: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

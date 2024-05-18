import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { FontText } from "./FontText";

type ProduitsListItemProps = {
  item: {
    produit: {
      id: number;
      nom: string;
      prix: number;
      image: any;
      enStock?: boolean;
    };
    quantity: number;
  };
};

const ProduitsListItem = ({ item }: ProduitsListItemProps) => {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={item.produit.image} />
      <View style={styles.text}>
        <View
          style={{
            flexShrink: 1,
          }}
        >
          <FontText
            style={{
              fontWeight: 600,
              fontSize: 20,
              marginVertical: 5,
            }}
          >
            {item.produit.nom}
          </FontText>
          {item.produit.enStock === false && (
            <FontText style={{ fontStyle: "italic" }}>Épuisé</FontText>
          )}
        </View>
        <FontText
          style={{ fontSize: 15, fontStyle: "italic", textAlign: "right" }}
        >
          {item.produit.prix} €
        </FontText>
        <FontText
          style={{ fontSize: 15, fontStyle: "italic", textAlign: "right" }}
        >
          Quantité : {item.quantity}
        </FontText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
  },
  image: {
    flex: 0.25,
    aspectRatio: 1 / 1,
    borderRadius: 10,
  },
  text: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    gap: 10,
  },
});

export default ProduitsListItem;

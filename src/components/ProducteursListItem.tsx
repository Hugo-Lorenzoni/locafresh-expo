import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { FontText } from "./FontText";

type ProducteursListItemProps = {
  producteur: {
    id: number;
    nom: string;
    adresse: string;
    telephone: string;
    email: string;
    image: any;
    produits: {
      id: number;
      nom: string;
      prix: number;
      image: any;
      enStock?: boolean;
    }[];
  };
};

const ProducteursListItem = ({ producteur }: ProducteursListItemProps) => {
  return (
    <Link href={`/producteurs/${producteur.id}`} asChild>
      <Pressable style={styles.card} key={producteur.id}>
        <Image style={styles.image} source={producteur.image} />
        <View style={styles.text}>
          <FontText
            style={{ fontWeight: 600, fontSize: 20, marginVertical: 5 }}
          >
            {producteur.nom}
          </FontText>
          <View>
            <FontText style={{ fontStyle: "italic", textAlign: "right" }}>
              {producteur.adresse.split(",")[0]}
            </FontText>
            <FontText style={{ fontStyle: "italic", textAlign: "right" }}>
              {producteur.adresse.split(",")[1]}
            </FontText>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 2 / 1,
    borderRadius: 10,
  },
  text: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default ProducteursListItem;

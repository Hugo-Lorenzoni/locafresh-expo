import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

type ProduitsListItemProps = {
  id: string;
  produit: {
    id: number;
    nom: string;
    prix: number;
    image: any;
    enStock?: boolean;
  };
};

const ProduitsListItem = ({ produit, id }: ProduitsListItemProps) => {
  return (
    <Link href={`/producteurs/${id}/${produit.id}`} asChild>
      <Pressable style={styles.card} key={produit.id}>
        <Image style={styles.image} source={produit.image} />
        <View style={styles.text}>
          <View style={{ gap: 5 }}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, marginVertical: 5 }}>
                {produit.nom}
              </Text>
              {produit.enStock === false && (
                <Text
                  style={{
                    fontStyle: "italic",
                    backgroundColor: "darkgrey",
                    color: "white",
                    padding: 5,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                  }}
                >
                  Épuisé
                </Text>
              )}
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: Colors.light.tint,
                fontStyle: "italic",
              }}
            >
              {produit.prix} €
            </Text>
          </View>
          <FontAwesome6 name="chevron-right" size={20} />
        </View>
      </Pressable>
    </Link>
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

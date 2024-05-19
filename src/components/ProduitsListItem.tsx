import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { FontText } from "./FontText";

type ProduitsListItemProps = {
  id: string;
  produit: {
    id: string;
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
              <FontText style={{ fontSize: 25, marginVertical: 5 }}>
                {produit.nom}
              </FontText>
              {produit.enStock === false && (
                <FontText
                  style={{
                    fontStyle: "italic",
                    backgroundColor: "darkgrey",
                    color: "white",
                    paddingBottom: 5,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                  }}
                >
                  Épuisé
                </FontText>
              )}
            </View>
            <FontText
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: Colors.light.tint,
                fontStyle: "italic",
              }}
            >
              {produit.prix} €
            </FontText>
          </View>
          <FontAwesome6
            style={{ color: Colors.light.tint, paddingEnd: 10 }}
            name="circle-plus"
            size={25}
          />
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

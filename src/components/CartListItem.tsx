import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { FontText } from "./FontText";
import { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { useCart } from "@/providers/CartProvider";

type ProduitsListItemProps = {
  item: {
    produit: {
      id: string;
      nom: string;
      prix: number;
      image: any;
      enStock?: boolean;
    };
    quantity: number;
  };
};

const CartListItem = ({ item }: ProduitsListItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <View style={styles.card}>
      <Image style={styles.image} source={item.produit.image} />
      <View style={styles.text}>
        <View>
          <FontText
            style={{
              fontWeight: 600,
              fontSize: 20,
              marginVertical: 5,
            }}
          >
            {item.produit.nom}
          </FontText>
          <FontText style={{ fontSize: 15, fontStyle: "italic" }}>
            {item.produit.prix} €
          </FontText>
        </View>

        <View style={styles.quantity}>
          {item.quantity <= 1 ? (
            <Pressable onPress={() => removeFromCart(item.produit.id)}>
              <FontAwesome6
                size={18}
                color="tomato"
                name="trash"
              ></FontAwesome6>
            </Pressable>
          ) : (
            <Pressable onPress={() => updateQuantity(item.produit.id, -1)}>
              <FontAwesome6 size={20} name="circle-minus"></FontAwesome6>
            </Pressable>
          )}

          <FontText style={{ fontSize: 20 }}>{item.quantity}</FontText>
          <Pressable onPress={() => updateQuantity(item.produit.id, 1)}>
            <FontAwesome6 size={20} name="circle-plus"></FontAwesome6>
          </Pressable>
        </View>
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
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default CartListItem;

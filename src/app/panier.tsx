import CartListItem from "@/components/CartListItem";
import { useCart } from "@/providers/CartProvider";
import { Stack } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

const Panier = () => {
  const { items, total } = useCart();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Panier" }} />
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem item={item} />}
        contentContainerStyle={{
          rowGap: 5,
        }}
      ></FlatList>
      <Text>{total} €</Text>
    </View>
  );
};

export default Panier;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

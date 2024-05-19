import CartListItem from "@/components/CartListItem";
import { FontText } from "@/components/FontText";
import Colors from "@/constants/Colors";
import { useCart } from "@/providers/CartProvider";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const Panier = () => {
  const { items, totalQuantity, total, clearCart } = useCart();
  async function handlePress() {
    // Do something
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Panier",
          headerTitleStyle: {
            fontFamily: "DegularSemibold",
            fontSize: 25,
          },
          // bouton pour vider le panier
          headerRight: () => (
            <Pressable
              disabled={totalQuantity <= 0}
              style={[
                styles.deleteButton,
                { opacity: totalQuantity <= 0 ? 0.5 : 1 },
              ]}
              onPress={clearCart}
            >
              <FontText
                style={{
                  color: "tomato",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                Vider le panier
              </FontText>
              <FontAwesome6
                name="trash-can"
                color="tomato"
                size={15}
              ></FontAwesome6>
            </Pressable>
          ),
        }}
      />
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem item={item} />}
        contentContainerStyle={{
          rowGap: 5,
        }}
        ListEmptyComponent={
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: "75%",
            }}
          >
            <FontAwesome5 size={20} name="shopping-basket"></FontAwesome5>
            <FontText style={{ fontSize: 20 }}>
              Votre panier est vide !
            </FontText>
          </View>
        }
      ></FlatList>
      <View
        style={{
          marginTop: "auto",
          gap: 10,
          opacity: totalQuantity <= 0 ? 0.5 : 1,
        }}
      >
        <View style={styles.total}>
          <FontText style={{ fontWeight: 700, fontSize: 20 }}>Total</FontText>
          <FontText style={{ fontWeight: 700, fontSize: 20 }}>
            {total} €
          </FontText>
        </View>
        <Pressable style={styles.button} onPress={handlePress}>
          <FontText style={{ fontWeight: 600, fontSize: 20, color: "white" }}>
            Commander
          </FontText>
          <FontAwesome6
            style={{ color: "white" }}
            name="truck-arrow-right"
            size={20}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Panier;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  deleteButton: {
    flexDirection: "row",
    gap: 5,
    alignItems: "flex-end",
    borderColor: "tomato",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    paddingBottom: 7.5,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
  },
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
});

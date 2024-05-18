import { StyleSheet, TextInput, FlatList } from "react-native";
import ProducteursListItem from "@/components/ProducteursListItem";

import Colors from "@/constants/Colors";
import producteurs from "@/constants/Producteurs";

import { useState } from "react";

export default function NosProducteursScreen() {
  const [search, setSearch] = useState("");
  const data = producteurs.filter((p) =>
    p.nom.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <TextInput
        style={styles.input}
        cursorColor={Colors["light"].tint}
        inputMode="text"
        placeholder={"Rechercher un producteur"}
        onChangeText={(text) => setSearch(text)}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => <ProducteursListItem producteur={item} />}
        numColumns={2}
        contentContainerStyle={{
          rowGap: 5,
          padding: 5,
        }}
        columnWrapperStyle={{ gap: 5 }}
      ></FlatList>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    height: 40,
    marginHorizontal: 5,
    marginTop: 10,
    padding: 10,
    backgroundColor: "white",
  },
});

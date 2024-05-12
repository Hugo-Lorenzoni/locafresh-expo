import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Panier = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Panier" }} />
      <Text>Panier</Text>
    </View>
  );
};

export default Panier;

const styles = StyleSheet.create({});

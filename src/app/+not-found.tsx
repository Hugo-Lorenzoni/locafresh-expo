import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { FontText } from "@/components/FontText";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Oops!",
          headerTitleStyle: {
            fontFamily: "DegularSemibold",
            fontSize: 25,
          },
        }}
      />
      <View style={styles.container}>
        <FontText style={styles.title}>This screen doesn't exist.</FontText>

        <Link href="/" style={styles.link}>
          <FontText style={styles.linkText}>Go to home screen!</FontText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});

import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "DegularSemibold",
          fontSize: 25,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Vos produits",
        }}
      />
    </Stack>
  );
};

export default _layout;

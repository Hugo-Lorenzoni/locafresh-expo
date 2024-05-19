import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={"/(auth)/log-in"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "DegularSemibold",
          fontSize: 25,
        },
      }}
    />
  );
}

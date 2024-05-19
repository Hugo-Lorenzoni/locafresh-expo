import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import CartProvider from "@/providers/CartProvider";
import AuthProvider from "@/providers/AuthProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    DegularBlack: require("../../assets/fonts/Degular-Black.otf"),
    DegularBlackItalic: require("../../assets/fonts/Degular-BlackItalic.otf"),
    DegularBold: require("../../assets/fonts/Degular-Bold.otf"),
    DegularBoldItalic: require("../../assets/fonts/Degular-BoldItalic.otf"),
    DegularRegular: require("../../assets/fonts/Degular-Regular.otf"),
    DegularRegularItalic: require("../../assets/fonts/Degular-RegularItalic.otf"),
    DegularLight: require("../../assets/fonts/Degular-Light.otf"),
    DegularLightItalic: require("../../assets/fonts/Degular-LightItalic.otf"),
    DegularThin: require("../../assets/fonts/Degular-Thin.otf"),
    DegularThinItalic: require("../../assets/fonts/Degular-ThinItalic.otf"),
    DegularSemibold: require("../../assets/fonts/Degular-Semibold.otf"),
    DegularSemiboldItalic: require("../../assets/fonts/Degular-SemiboldItalic.otf"),
    DegularMedium: require("../../assets/fonts/Degular-Medium.otf"),
    DegularMediumItalic: require("../../assets/fonts/Degular-MediumItalic.otf"),
    // ...FontAwesome6.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  // const colorScheme = useColorScheme();

  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        <CartProvider>
          <Stack
            screenOptions={{
              statusBarStyle: "dark",
              navigationBarColor: "white",
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(producteurs)"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="panier" options={{ presentation: "modal" }} />
          </Stack>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

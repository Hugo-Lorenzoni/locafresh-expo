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
    DegularDisplayBlack: require("../../assets/fonts/DegularDisplay-Black.otf"),
    DegularDisplayBlackItalic: require("../../assets/fonts/DegularDisplay-BlackItalic.otf"),
    DegularDisplayBold: require("../../assets/fonts/DegularDisplay-Bold.otf"),
    DegularDisplayBoldItalic: require("../../assets/fonts/DegularDisplay-BoldItalic.otf"),
    DegularDisplayRegular: require("../../assets/fonts/DegularDisplay-Regular.otf"),
    DegularDisplayRegularItalic: require("../../assets/fonts/DegularDisplay-RegularItalic.otf"),
    DegularDisplayLight: require("../../assets/fonts/DegularDisplay-Light.otf"),
    DegularDisplayLightItalic: require("../../assets/fonts/DegularDisplay-LightItalic.otf"),
    DegularDisplayThin: require("../../assets/fonts/DegularDisplay-Thin.otf"),
    DegularDisplayThinItalic: require("../../assets/fonts/DegularDisplay-ThinItalic.otf"),
    DegularDisplaySemibold: require("../../assets/fonts/DegularDisplay-Semibold.otf"),
    DegularDisplaySemiboldItalic: require("../../assets/fonts/DegularDisplay-SemiboldItalic.otf"),
    DegularDisplayMedium: require("../../assets/fonts/DegularDisplay-Medium.otf"),
    DegularDisplayMediumItalic: require("../../assets/fonts/DegularDisplay-MediumItalic.otf"),
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
            <Stack.Screen name="panier" options={{ presentation: "modal" }} />
          </Stack>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

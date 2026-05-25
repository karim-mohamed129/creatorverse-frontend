import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isWeb = Platform.OS === "web";

  const [fontsLoaded] = useFonts({
    Neotoxic: require("../assets/fonts/Neotoxic-Regular.ttf"),
    NeoSansArabicLight: require("../assets/fonts/NeoSansArabicLight.ttf"),
  });

  useEffect(() => {
    if (!isWeb || typeof document === "undefined") return;

    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    document.body.dir = "ltr";
  }, [isWeb]);

  // Do not block the first web paint while custom fonts are downloading.
  // Native platforms still wait for the fonts to avoid layout flicker.
  if (!isWeb && !fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />

        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
          }}
        />
        <Stack.Screen name="creator-comments-list" />
        <Stack.Screen name="creator-edit-content" />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

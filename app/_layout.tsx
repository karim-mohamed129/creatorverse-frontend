import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Neotoxic: require("../assets/fonts/Neotoxic-Regular.ttf"),

    NeoSansArabicLight: require("../assets/fonts/NeoSansArabicLight.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(tabs)"
          options={{
          }}
        />

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
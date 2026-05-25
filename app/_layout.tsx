import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useEffect, useLayoutEffect } from "react";
import { Platform } from "react-native";
import "react-native-reanimated";
import "bootstrap/dist/css/bootstrap.min.css";

import { useColorScheme } from "@/hooks/use-color-scheme";

function forceEnglishBeforePaint() {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.lang = "en";
  root.dir = "ltr";
  root.classList.remove("rtl");
  root.classList.add("ltr");

  if (typeof window !== "undefined") {
    try {
      ["site_lang", "siteLang", "appLang", "language", "locale", "lang", "i18nextLng"].forEach((key) => {
        window.localStorage.setItem(key, "en");
      });
      window.localStorage.removeItem("site_lang_manual");
    } catch {
      // Ignore storage errors in private mode or restricted browsers.
    }
  }
}


function markLanguageReadyForPaint() {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-app-lang-ready", "true");
}

if (Platform.OS === "web") {
  forceEnglishBeforePaint();
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Neotoxic: require("../assets/fonts/Neotoxic-Regular.ttf"),
  });

  useLayoutEffect(() => {
    if (Platform.OS === "web") {
      forceEnglishBeforePaint();
      markLanguageReadyForPaint();
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === "web") {
      forceEnglishBeforePaint();
      markLanguageReadyForPaint();
    }
  }, []);

  // Do not block the first web paint waiting for fonts. This removes the slow blank/flash on Vercel.
  if (!fontsLoaded && Platform.OS !== "web") return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{}} />

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

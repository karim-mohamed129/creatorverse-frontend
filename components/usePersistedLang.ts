import { useCallback, useEffect, useState } from "react";
import type { Lang } from "./Header";

const STORAGE_KEY = "site_lang";
const MANUAL_STORAGE_KEY = "site_lang_manual";
const LEGACY_STORAGE_KEYS = ["siteLang", "appLang", "language", "locale", "lang", "i18nextLng"];
const LANG_CHANGE_EVENT = "error505-language-change";
const DEFAULT_LANG: Lang = "en";

function isLang(value: unknown): value is Lang {
  return value === "ar" || value === "en";
}

function hasManualLanguageChoice(): boolean {
  if (typeof window === "undefined") return false;

  try {
    return window.localStorage.getItem(MANUAL_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function readSavedLang(defaultLang: Lang = DEFAULT_LANG): Lang {
  if (typeof window === "undefined") return defaultLang;

  try {
    const urlLang = new URL(window.location.href).searchParams.get("lang");
    if (isLang(urlLang)) return urlLang;

    const saved = window.localStorage.getItem(STORAGE_KEY);

    // Old deployments saved Arabic in localStorage for many users. Do not let that
    // legacy value control the first paint, otherwise the page flashes Arabic for a
    // split second before the default English UI takes over.
    if (!hasManualLanguageChoice()) {
      return saved === "en" ? "en" : defaultLang;
    }

    if (isLang(saved)) return saved;

    for (const key of LEGACY_STORAGE_KEYS) {
      const legacySaved = window.localStorage.getItem(key);
      if (isLang(legacySaved)) return legacySaved;
    }

    return defaultLang;
  } catch {
    return defaultLang;
  }
}

function applyDocumentLang(lang: Lang) {
  if (typeof document === "undefined") return;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.dir = lang === "ar" ? "rtl" : "ltr";
}

function writeSavedLang(lang: Lang, manual = false) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
    LEGACY_STORAGE_KEYS.forEach((key) => window.localStorage.setItem(key, lang));

    if (manual) {
      window.localStorage.setItem(MANUAL_STORAGE_KEY, "1");
    }
  } catch {
    // ignore storage errors
  }
}

export function usePersistedLang(defaultLang: Lang = DEFAULT_LANG) {
  const [lang, setLangState] = useState<Lang>(() => readSavedLang(defaultLang));

  useEffect(() => {
    const saved = readSavedLang(defaultLang);
    setLangState(saved);
    applyDocumentLang(saved);
    writeSavedLang(saved);
  }, [defaultLang]);

  const setLang = useCallback((nextLang: Lang) => {
    setLangState(nextLang);
    applyDocumentLang(nextLang);
    writeSavedLang(nextLang, true);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(LANG_CHANGE_EVENT, { detail: nextLang }));
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncLang = (event?: Event) => {
      const eventLang =
        event instanceof CustomEvent && isLang(event.detail) ? event.detail : readSavedLang(defaultLang);

      setLangState(eventLang);
      applyDocumentLang(eventLang);
      writeSavedLang(eventLang);
    };

    window.addEventListener("storage", syncLang);
    window.addEventListener("focus", syncLang);
    window.addEventListener(LANG_CHANGE_EVENT, syncLang);

    return () => {
      window.removeEventListener("storage", syncLang);
      window.removeEventListener("focus", syncLang);
      window.removeEventListener(LANG_CHANGE_EVENT, syncLang);
    };
  }, [defaultLang]);

  return [lang, setLang] as const;
}

import API from "./api";
import { resolveApiAsset } from "./apiHelpers";

export interface SiteSettings {
  logo?: string;
  logo_ar?: string;
  site_name?: string;
  favicon?: string;
  [key: string]: any;
}

const SETTINGS_CACHE_KEY = "site_settings_cache_v1";
const SETTINGS_CACHE_TTL = 1000 * 60 * 60 * 6; // 6 hours

let memorySettings: SiteSettings | null = null;
let inflightSettings: Promise<SiteSettings> | null = null;

const normalizeSettings = (data: any): SiteSettings => ({
  ...data,
  logo: data?.logo ? resolveApiAsset(data.logo) : undefined,
  logo_ar: data?.logo_ar ? resolveApiAsset(data.logo_ar) : undefined,
  favicon: data?.favicon ? resolveApiAsset(data.favicon) : undefined,
});

const readCachedSettings = (): SiteSettings | null => {
  if (memorySettings) return memorySettings;
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(SETTINGS_CACHE_KEY);
    if (!raw) return null;

    const cached = JSON.parse(raw) as { data?: SiteSettings; savedAt?: number };
    if (!cached?.data || !cached?.savedAt) return null;
    if (Date.now() - cached.savedAt > SETTINGS_CACHE_TTL) return null;

    memorySettings = cached.data;
    return memorySettings;
  } catch {
    return null;
  }
};

const writeCachedSettings = (settings: SiteSettings) => {
  memorySettings = settings;

  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      SETTINGS_CACHE_KEY,
      JSON.stringify({ data: settings, savedAt: Date.now() })
    );
  } catch {
    // Ignore storage errors in private mode or restricted browsers.
  }
};

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const cached = readCachedSettings();
  if (cached) return cached;

  if (inflightSettings) return inflightSettings;

  inflightSettings = API.get("settings", { timeout: 5000 })
    .then((res) => {
      const data = res.data?.data ?? res.data ?? {};
      const settings = normalizeSettings(data);
      writeCachedSettings(settings);
      return settings;
    })
    .catch((error) => {
      console.error("Failed to fetch site settings:", error);
      return readCachedSettings() ?? {};
    })
    .finally(() => {
      inflightSettings = null;
    });

  return inflightSettings;
};

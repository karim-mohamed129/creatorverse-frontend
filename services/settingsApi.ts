import API from "./api";
import { resolveApiAsset } from "./apiHelpers";

export interface SiteSettings {
  logo?: string;
  logo_ar?: string;
  site_name?: string;
  favicon?: string;
  [key: string]: any;
}

export const getSiteSettings = async (): Promise<SiteSettings> => {
  try {
    const res = await API.get("settings");
    const data = res.data?.data ?? res.data;
    
    return {
      ...data,
      logo: data.logo ? resolveApiAsset(data.logo) : undefined,
      logo_ar: data.logo_ar ? resolveApiAsset(data.logo_ar) : undefined,
      favicon: data.favicon ? resolveApiAsset(data.favicon) : undefined,
    };
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return {};
  }
};

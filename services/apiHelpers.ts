export const BASE_ASSET_URL = "https://dreamhrms.com/error_505";

export const resolveApiAsset = (path: string | null | undefined): string => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${BASE_ASSET_URL}/${path.replace(/^\//, "")}`;
};

export const unwrapApiList = (payload: any): any[] => {
  const data = payload?.data?.data ?? payload?.data ?? payload;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data)) return data;

  if (data && typeof data === "object") {
    const arrayKey = Object.keys(data).find((key) => Array.isArray(data[key]));
    if (arrayKey) return data[arrayKey];
  }

  return [];
};

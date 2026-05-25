import API from "./api";

export interface SearchData {
  contents: {
    id: number;
    title: string;
    cover_image: string;
    creator_name: string;
    content_type: string;
  }[];
  chapters: {
    id: number;
    title: string;
    cover_image: string;
    series_name: string;
    chapter_no: string | number;
  }[];
  creators: {
    id: number;
    name: string;
    profile_image: string;
    content_count: number;
  }[];
}

export const emptySearchData = (): SearchData => ({
  contents: [],
  chapters: [],
  creators: [],
});

export const hasSearchResults = (data: SearchData): boolean => {
  return (
    (data.contents?.length || 0) > 0 ||
    (data.chapters?.length || 0) > 0 ||
    (data.creators?.length || 0) > 0
  );
};

export const globalSearch = async ({
  keyword,
  per_page = 10,
  token,
}: {
  keyword: string;
  per_page?: number;
  token?: string;
}): Promise<SearchData> => {
  const headers: any = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await API.get("content/global-search", {
    params: { keyword, per_page },
    headers,
  });

  // Handle potential nested data structure
  const rawData = res.data?.data || res.data;
  
  return {
    contents: rawData?.contents || [],
    chapters: rawData?.chapters || [],
    creators: rawData?.creators || [],
  };
};

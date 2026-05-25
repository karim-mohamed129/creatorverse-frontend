import API from "./api";
import { unwrapApiList } from "./apiHelpers";

export type HomeContentApiItem = {
  id: number | string;
  title?: string;
  views?: string | number;
  cover_image?: string;
  image?: string;
  chapter_type?: string;
  favourites_count?: string | number;
  share_count?: string | number;
  creator_name?: string;
  content_type?: string;
  visibility_date?: string | null;
  is_favourite?: boolean;
  latest_chapter_number?: string | number | null;
  chapter?: string;
  is_exclusive?: boolean;
  next_chapter?: string;
  latest_chapter?: { id?: string | number; chapter_number?: string | number };
  last_chapter?: { id?: string | number; chapter_number?: string | number };
  latest_chapter_id?: string | number;
  last_chapter_id?: string | number;
  chapter_id?: string | number;
  created_at?: string;
  updated_at?: string;
};

export type HomeBlogApiItem = {
  id: number | string;
  title?: string;
  image?: string;
  content?: string;
  created_at?: string;
  category_name?: string;
};

export type HomeApiData = {
  trending: HomeContentApiItem[];
  exclusive: HomeContentApiItem[];
  just_dropped: HomeContentApiItem[];
  top_picks: HomeContentApiItem[];
  blogs: HomeBlogApiItem[];
  unread_nitification_count?: number;
};

const normalizeHomeData = (payload: any): HomeApiData => {
  const data = payload?.data?.data ?? payload?.data ?? payload ?? {};

  return {
    trending: Array.isArray(data.trending) ? data.trending : [],
    exclusive: Array.isArray(data.exclusive) ? data.exclusive : [],
    just_dropped: Array.isArray(data.just_dropped) ? data.just_dropped : [],
    top_picks: Array.isArray(data.top_picks) ? data.top_picks : [],
    blogs: Array.isArray(data.blogs) ? data.blogs : [],
    unread_nitification_count: data.unread_nitification_count ?? 0,
  };
};

export const getHomeData = async (): Promise<HomeApiData> => {
  const res = await API.get("home");
  return normalizeHomeData(res);
};

// Kept for compatibility with any old imports.
export const getHomeSeedData = getHomeData;

export const getCreatorContentItems = async (creatorId: string | number) => {
  const res = await API.get(`creator/${creatorId}/content`);
  return unwrapApiList(res);
};

export const getContentByCategoryId = async (
  categoryId: string | number,
  perPage = 20
) => {
  const res = await API.get("content", {
    params: { category_id: categoryId, per_page: perPage },
  });
  return unwrapApiList(res);
};

export const getContentItems = async (perPage = 100) => {
  const res = await API.get("content", { params: { per_page: perPage } });
  return unwrapApiList(res);
};

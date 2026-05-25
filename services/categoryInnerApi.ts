import type { CardItem } from "../components/MangaCard";
import API from "./api";
import { unwrapApiList } from "./apiHelpers";

const MEDIA_BASE_URL = "https://dreamhrms.com/Error_505";
export const RELATED_LIMIT = 5;

export type CreatorSocialLinks = {
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  share_link?: string | null;
};

export type CategoryInnerContent = {
  id?: string | number;
  title?: string;
  description?: string;
  bio?: string;
  banner_image?: string;
  header_image?: string;
  cover_image?: string;
  image?: string;
  views?: string | number;
  favourites_count?: string | number;
  followers_count?: string | number;
  rate?: string | number | null;
  rate_out_of?: string | number | null;
  share_link?: string | null;
  chapters?: unknown;
  creator?: {
    id?: string | number;
    name?: string;
    facebook?: string | null;
    twitter?: string | null;
    instagram?: string | null;
    tiktok?: string | null;
    creator_badges?: { id?: string | number; image?: string }[];
  };
};

export type EpisodeCardData = {
  id: string;
  image: string;
  title: string;
  chapter: string;
  date: string;
  views: string;
  likes: string;
  comments: string;
};

export type ApiComment = {
  id: string | number;
  name: string;
  meta: string;
  date: string;
  body: string;
  avatar?: string;
  actions: {
    id: string;
    label: string;
    count?: number;
  }[];
  replies?: ApiComment[];
};

export const resolveUrl = (path: string | null | undefined): string => {
  if (!path) return "";
  return path.startsWith("http") ? path : `${MEDIA_BASE_URL}/${path.replace(/^\//, "")}`;
};

const unwrapData = (payload: any) => payload?.data ?? payload;

const unwrapItems = (payload: any): any[] => {
  const raw = unwrapData(payload);
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.items)) return raw.items;
  if (Array.isArray(raw?.data)) return raw.data;
  return [];
};

const mapChapterToEpisode = (chapter: any, index: number): EpisodeCardData => ({
  id: String(chapter.id),
  image: resolveUrl(chapter.cover_image || chapter.image),
  title: chapter.title || chapter.name || "Episode",
  chapter: `CHAPTER ${chapter.chapter_number ?? index + 1}`,
  date: chapter.created_at || "",
  views: String(chapter.views_count ?? chapter.views ?? "0"),
  likes: String(chapter.likes_count ?? chapter.favourites_count ?? "0"),
  comments: String(chapter.comments_count ?? "0"),
});

const mapContentToCard = (item: any): CardItem => ({
  id: String(item.id),
  image: resolveUrl(item.cover_image || item.image),
  title: item.title || "",
  creator: item.creator?.name || item.creator_name || item.creator_user_name || "",
  type: item.category_name || item.content_type?.name || item.chapter_type || "MANGA",
  views: String(item.views_count ?? item.views ?? "0"),
  likes: String(item.likes_count ?? item.favourites_count ?? "0"),
  comments: String(item.comments_count ?? "0"),
  href: `/category-inner?id=${item.id}&view=grid`,
});

const mapComment = (comment: any): ApiComment => {
  console.log("DEBUG: Mapping comment:", comment);
  return {
    id: comment.id,
    name: comment.user?.name || comment.name || "Guest Reader",
    meta: comment.created_at || "",
    date: comment.created_at || "",
    body: comment.comment || comment.body || "",
    avatar: resolveUrl(comment.user?.profile_image || comment.user?.image || comment.avatar),
    actions: [
      { id: "like", label: "Like", count: Number(comment.likes_count || 0) },
      { id: "report", label: "Report" },
      { id: "reply", label: "Reply" },
    ],
    replies: (comment.replies || []).map(mapComment),
  };
};

export const getCategoryInnerData = async (contentId: string) => {
  const [contentRes, chaptersRes] = await Promise.all([
    API.get(`content/${contentId}`),
    API.get(`content/${contentId}/chapters`).catch(() => ({ data: [] })),
  ]);

  const content = unwrapData(contentRes.data) as CategoryInnerContent;
  const chaptersFromEndpoint = unwrapItems(chaptersRes.data);
  const chaptersFromContent = Array.isArray((content as any)?.chapters)
    ? ((content as any).chapters as any[])
    : unwrapItems((content as any)?.chapters);

  return {
    content,
    episodes: (chaptersFromEndpoint.length > 0 ? chaptersFromEndpoint : chaptersFromContent).map(mapChapterToEpisode),
  };
};

export const getRelatedContentCards = async (content: CategoryInnerContent | null) => {
  const creatorRes = await API.get("creator", {
    params: { type: "rising", per_page: 20, sort_by: "most_badges" },
  });

  const allCreators = unwrapItems(creatorRes.data);
  const currentCreatorId = content?.creator?.id;
  const currentBadgeIds = (content?.creator?.creator_badges ?? []).map((badge) => badge.id);

  let creators = allCreators.filter((creator: any) => {
    if (creator.id === currentCreatorId) return false;
    if (currentBadgeIds.length === 0) return true;

    const badgeIds = (creator.creator_badges ?? []).map((badge: any) => badge.id);
    return badgeIds.some((id: string | number) => currentBadgeIds.includes(id));
  });

  if (creators.length === 0) {
    creators = allCreators.filter((creator: any) => creator.id !== currentCreatorId);
  }

  const results = await Promise.all(
    creators.slice(0, RELATED_LIMIT).map((creator: any) =>
      API.get(`creator/${creator.id}/content`)
        .then((response) => unwrapItems(response.data))
        .catch(() => [] as any[])
    )
  );

  return results.flat().slice(0, RELATED_LIMIT).map(mapContentToCard);
};

export const getContentComments = async (contentId: string | number) => {
  const res = await API.get(`content/${contentId}/comments`, {
    params: { sort_by: "newest" },
  });
  return unwrapApiList(res).map(mapComment);
};

export const submitContentComment = async ({
  contentId,
  comment,
  parentId,
}: {
  contentId: string | number;
  comment: string;
  parentId?: string | number;
}) => {
  const form = new FormData();
  form.append("comment", comment);
  form.append("content_chapter_id", String(contentId));
  if (parentId) form.append("parent_id", String(parentId));
  
  return API.post("chapter/comments", form);
};

export const rateContent = async (contentId: string | number, rate: number) => {
  return API.post(`content/${contentId}/rate`, { rating: rate });
};

export const favoriteContent = async (contentId: string | number) => {
  return API.post(`content/${contentId}/favorite`);
};

export const favoriteChapter = async (chapterId: string | number) => {
  return API.post(`chapter/${chapterId}/favourite`);
};



export const giftBadge = async ({
  creatorId,
  badgeId,
  quantity,
}: {
  creatorId?: string | number;
  badgeId: string | number;
  quantity: number;
}) => {
  if (!creatorId) throw new Error("Creator ID is required to send a gift.");

  const form = new FormData();
  form.append("creator_id", String(creatorId));
  form.append("items[0][product_id]", String(badgeId));
  form.append("items[0][quantity]", String(quantity));

  return API.post("gift-badge", form, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};
export const followContent = async (contentId: string | number) => {
  return API.post(`content/${contentId}/follow`);
};

export const subscribeContent = async (planId: string | number) => {
  const form = new FormData();
  form.append("plan_id", String(planId));
  console.log("DEBUG: Subscribing to:", "subscribe", "payload:", { plan_id: planId });
  try {
    const res = await API.post("subscribe", form, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    console.log("DEBUG: Subscription success:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("DEBUG: Subscription error:", err.response?.data || err);
    throw err;
  }
};

export const unsubscribeContent = async () => {
  console.log("DEBUG: Unsubscribing from:", "cancel-renew");
  try {
    const res = await API.post("cancel-renew");
    console.log("DEBUG: Unsubscribe success:", res.data);
    return res.data;
  } catch (err: any) {
    console.error("DEBUG: Unsubscribe error:", err.response?.data || err);
    throw err;
  }
};

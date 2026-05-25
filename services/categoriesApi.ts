import type { CardItem } from "../components/MangaCard";
import API from "./api";
import { resolveApiAsset, unwrapApiList } from "./apiHelpers";

type CategoryTab = "EXCLUSIVE" | "MANGA" | "WEBTOON";
type SortTab = "POPULAR" | "RECENT" | "OLDEST" | "ONGOING" | "COMPLETED";

const sortParamByTab: Record<SortTab, string> = {
  POPULAR: "popular",
  RECENT: "newest",
  OLDEST: "oldest",
  ONGOING: "ongoing",
  COMPLETED: "completed",
};

const normalize = (value: unknown) => String(value || "").trim().toLowerCase();

const findCategoryId = (categories: any[], tab: CategoryTab) => {
  const target = normalize(tab);
  const match = categories.find((category) => {
    const name = normalize(category.name || category.title || category.slug);
    return name === target || name.includes(target);
  });

  return match?.id;
};

export const getContentCategories = async () => {
  const res = await API.get("content/categories");
  return unwrapApiList(res);
};

export const getCategoryContent = async ({
  activeCategory,
  activeSort,
  page,
  perPage,
}: {
  activeCategory: CategoryTab;
  activeSort: SortTab;
  page: number;
  perPage: number;
}) => {
  const categories = await getContentCategories().catch(() => []);
  const categoryId = activeCategory === "EXCLUSIVE" ? null : findCategoryId(categories, activeCategory);
  const params: Record<string, any> = {
    page,
    per_page: perPage,
    sort_by: sortParamByTab[activeSort],
  };

  if (activeCategory === "EXCLUSIVE") {
    params.exclusive = 1;
  } else if (categoryId) {
    params.category_id = categoryId;
  } else {
    params.category = activeCategory.toLowerCase();
  }

  let res = await API.get("content", { params });
  let items = unwrapApiList(res);

  if (items.length === 0 && activeCategory === "EXCLUSIVE") {
    const fallbackParams = { page, per_page: perPage, sort_by: sortParamByTab[activeSort] };
    res = await API.get("content", { params: fallbackParams });
    items = unwrapApiList(res);
  }

  return items;
};

export const mapContentToCard = (item: any): CardItem => {
  const creatorName =
    item.creator?.name ||
    item.user?.name ||
    item.creator_name ||
    item.author ||
    "";

  return {
    id: String(item.id),
    title: item.title || item.name || "",
    creator: creatorName,
    image: resolveApiAsset(item.cover_image || item.image || item.profile_image),
    type: item.content_type || item.chapter_type || item.category_name || item.type || "",
    views: String(item.views_count ?? item.views ?? item.content_count ?? 0),
    likes: String(item.likes_count ?? item.favourites_count ?? 0),
    comments: String(item.comments_count ?? item.share_count ?? 0),
    href: `/category-inner?id=${item.id}&view=grid`,
  };
};

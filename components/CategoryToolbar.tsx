import React from "react";
import "./CategoryToolbar.css";
import shapeBg from "../assets/images/shape.png";
import type { Lang } from "./Header";
import { tUi } from "./i18n";

type CategoryName = "EXCLUSIVE" | "MANGA" | "WEBTOON";
type SortName = "POPULAR" | "RECENT" | "OLDEST";
type FilterName = "ALL" | "ONGOING" | "COMPLETED";

type Props = {
  categoryTabs: CategoryName[];
  sortTabs: SortName[];
  filterTabs?: FilterName[];
  activeCategory: CategoryName;
  activeSort: SortName;
  activeFilter?: FilterName;
  onCategoryChange: (value: CategoryName) => void;
  onSortChange: (value: SortName) => void;
  onFilterChange?: (value: FilterName) => void;
  lang?: Lang;
};

const assetUri = (asset: any): string =>
  typeof asset === "string" ? asset : asset?.uri ?? "";

export default function CategoryToolbar({
  categoryTabs,
  sortTabs,
  filterTabs = [],
  activeCategory,
  activeSort,
  activeFilter,
  onCategoryChange,
  onSortChange,
  onFilterChange,
  lang = "en",
}: Props) {
  const shapeBgUri = assetUri(shapeBg);
  const isArabic = lang === "ar";

  const labelCategory = (value: CategoryName): string => {
    if (!isArabic) return value;
    if (value === "EXCLUSIVE") return "حصري";
    if (value === "MANGA") return tUi(lang, "manga");
    if (value === "WEBTOON") return "ويب تون";
    return value;
  };

  const labelSort = (value: SortName | FilterName): string => {
    if (!isArabic) return value;
    if (value === "POPULAR") return tUi(lang, "popular");
    if (value === "RECENT") return tUi(lang, "recent");
    if (value === "OLDEST") return tUi(lang, "oldest");
    if (value === "ONGOING") return tUi(lang, "ongoing");
    if (value === "COMPLETED") return tUi(lang, "completed");
    if (value === "ALL") return "الكل";
    return value;
  };

  return (
    <div className={`categories-toolbar ${isArabic ? "categories-toolbar-rtl" : ""}`}>
      <div className="categories-topbar">
        <div className="categories-topbar-left" />

        <div className="categories-topbar-center">
          <div className="category-tabs-shape">
            <img src={shapeBgUri} className="category-shape-bg" alt="" />

            <div className="category-tabs">
              {categoryTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`category-tab ${activeCategory === tab ? "active" : ""}`}
                  onClick={() => onCategoryChange(tab)}
                >
                  {labelCategory(tab)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="categories-topbar-right">
          <div className="sort-groups">
            <div className="sort-tabs">
              {sortTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`sort-tab ${activeSort === tab ? "active" : ""}`}
                  onClick={() => onSortChange(tab)}
                >
                  {labelSort(tab)}
                </button>
              ))}

              {filterTabs.length > 0 && filterTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`sort-tab ${activeFilter === tab ? "active" : ""}`}
                  onClick={() => onFilterChange?.(tab)}
                >
                  {labelSort(tab)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

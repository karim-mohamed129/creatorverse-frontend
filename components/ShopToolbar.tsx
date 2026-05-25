import React from "react";
import "./ShopToolbar.css";
import shapeBg from "../assets/images/shape.png";
import type { Lang } from "./Header";
import { tUi } from "./i18n";

export type ShopCategoryName = "ALL" | "BADGES" | "BUNDLES";

export type ShopSortName =
  | "PRICE: HIGH TO LOW"
  | "PRICE: LOW TO HIGH"
  | "RECENT"
  | "OLDEST";

type Props = {
  categoryTabs: ShopCategoryName[];
  sortTabs: ShopSortName[];
  activeCategory: ShopCategoryName;
  activeSort: ShopSortName;
  onCategoryChange: (value: ShopCategoryName) => void;
  onSortChange: (value: ShopSortName) => void;
  lang?: Lang;
};

const assetUri = (asset: any): string =>
  typeof asset === "string" ? asset : asset?.src ?? asset?.uri ?? "";

const shopCategoryArabic: Record<ShopCategoryName, string> = {
  ALL: "الكل",
  BADGES: "شارات",
  BUNDLES: "حزم",
};

const shopSortArabic: Record<ShopSortName, string> = {
  "PRICE: HIGH TO LOW": "السعر: من الأعلى",
  "PRICE: LOW TO HIGH": "السعر: من الأقل",
  RECENT: "الأحدث",
  OLDEST: "الأقدم",
};

export default function ShopToolbar({
  categoryTabs,
  sortTabs,
  activeCategory,
  activeSort,
  onCategoryChange,
  onSortChange,
  lang = "en",
}: Props) {
  const shapeBgUri = assetUri(shapeBg);
  const isRtl = lang === "ar";

  const label = (value: ShopCategoryName | ShopSortName) => {
    if (!isRtl) return value;

    if (value in shopCategoryArabic) return shopCategoryArabic[value as ShopCategoryName];
    if (value in shopSortArabic) return shopSortArabic[value as ShopSortName];
    
    return value;
  };

  return (
    <div
      className={`shop-toolbar-v2 ${isRtl ? "shop-toolbar-rtl" : "shop-toolbar-ltr"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="shop-topbar">
        <div className="shop-topbar-left" />

        <div className="shop-topbar-center">
          <div className="shop-tabs-shape">
            <img src={shapeBgUri} className="shop-shape-bg" alt="" />

            <div className="shop-tabs">
              {categoryTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`shop-tab ${activeCategory === tab ? "active" : ""}`}
                  onClick={() => onCategoryChange(tab)}
                >
                  {label(tab)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="shop-topbar-right">
          <div className="shop-sort-groups">
            <div className="shop-sort-tabs">
              {sortTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`shop-sort-tab ${activeSort === tab ? "active" : ""}`}
                  onClick={() => onSortChange(tab)}
                >
                  {label(tab)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

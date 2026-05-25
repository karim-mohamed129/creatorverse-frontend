import React, { useState } from "react";
import "./SectionHeader.css";
import type { Lang } from "./Header";
import { localizeLiteral, tUi } from "./i18n";

import lineMobile from "../assets/icons/line-mobile.svg";
import seeMoreIcon from "../assets/images/dashbaord/icons/Group 398.png";

const assetUri = (asset: any): string => {
  if (typeof asset === "string") return asset;
  if (typeof asset === "number") return String(asset);
  return asset?.src ?? asset?.uri ?? asset?.default?.src ?? asset?.default?.uri ?? asset?.default ?? "";
};

const lineMobileUri = assetUri(lineMobile);
const seeMoreIconUri = assetUri(seeMoreIcon);


type Props = {
  title: string;
  chipImage: string;
  lineMobile?: string;
  showButton?: boolean;
  onSeeMore?: () => void;
  lang?: Lang;
};

export default function SectionHeader({
  title,
  chipImage,
  lineMobile = lineMobileUri,
  showButton = true,
  onSeeMore,
  lang = "en",
}: Props) {
  const isArabic = lang === "ar";

  return (
    <div
      className={`section-chip-svg ${isArabic ? "section-chip-rtl" : "section-chip-ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={lang}
    >
      <span>{localizeLiteral(lang, title)}</span>

      <img src={chipImage} alt="" className="chip-desktop" />
      <img src={lineMobile} alt="" className="chip-mobile" />


      {showButton && (
        <button
          className="see-more-btn"
          type="button"
          onClick={onSeeMore}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <span className="see-more-title">{tUi(lang, "seeMore")}</span>
          <img src={seeMoreIconUri} alt="" className="see-more-arrow-mobile" />
        </button>
      )}
    </div>
  );
}

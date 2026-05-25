import React, { useState } from "react";
import "./PageTitleBar.css";
import shapeBg from "../assets/images/shape.png";
import type { Lang } from "./Header";
import { localizeLiteral } from "./i18n";

type Props = {
  title: string;
  className?: string;
  lang?: Lang;
};

const assetUri = (asset: any): string =>
  typeof asset === "string" ? asset : asset?.uri ?? "";

export default function PageTitleBar({ title, className = "", lang = "en" }: Props) {
  const shapeBgUri = assetUri(shapeBg);

  return (
    <div className={`page-titlebar ${className}`.trim()}>
      <div className="page-titlebar-inner">
        <div className="page-titlebar-spacer" />

        <div className="page-titlebar-center">
          <div className="page-titlebar-shape">
            <img src={shapeBgUri} className="page-titlebar-shape-bg" alt="" />
            <div className="page-titlebar-label">{localizeLiteral(lang, title)}</div>
          </div>
        </div>

        <div className="page-titlebar-spacer" />
      </div>
    </div>
  );
}

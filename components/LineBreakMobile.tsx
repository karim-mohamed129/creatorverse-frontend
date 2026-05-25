import React, { useState } from "react";
import lineIconMobile from "../assets/images/line-mobile.png";

const assetUri = (asset: any): string =>
  typeof asset === "string" ? asset : asset?.uri ?? "";

const lineMobileUri = assetUri(lineIconMobile);

type Props = {
  width?: string;
  className?: string;
};

export default function LineBreakMobile({
  width = "100%",
  className = "",
}: Props) {
  return (
    <div
      className={`line-break-mobile ${className}`.trim()}
      style={{ width }}
    >
      <img
        src={lineMobileUri}
        alt=""
        className="line-break-mobile-img"
        draggable={false}
      />
    </div>
  );
}

import React, { useState } from "react";
import lineIcon from "../assets/icons/line.svg"; // ← your SVG file

const assetUri = (asset: any): string =>
  typeof asset === "string" ? asset : asset?.uri ?? "";

const lineUri = assetUri(lineIcon);

type Props = {
  width?: string;
  className?: string;
};

export default function LineBreak({
  width = "100%",
  className = "",
}: Props) {
  return (
    <div
      className={`line-break ${className}`.trim()}
      style={{ width }}
    >
      <img
        src={lineUri}
        alt=""
        className="line-break-img"
        draggable={false}
      />
    </div>
  );
}
import React, { memo } from "react";
import "./BlogCard.css";
import readMoreIcon from "../assets/images/dashbaord/icons/More2.png";
import type { Lang } from "./Header";
import { tUi } from "./i18n";

// --- Types ---

export type BlogItem = {
  id: string;
  image: string;
  title: string;
  date: string;
  excerpt: string;
  category?: string;
};

interface BlogCardProps {
  blog: BlogItem;
  onReadMore?: (blog: BlogItem) => void;
  lang?: Lang;
}


const assetUri = (asset: any): string => {
  if (typeof asset === "string") return asset;
  if (typeof asset === "number") return String(asset);
  return asset?.src ?? asset?.uri ?? asset?.default?.src ?? asset?.default?.uri ?? asset?.default ?? "";
};

const readMoreIconUri = assetUri(readMoreIcon);

// --- Component ---

const BlogCard = ({ blog, onReadMore, lang = "en" }: BlogCardProps) => {
  const isArabic = lang === "ar";

  return (
    <article 
      className={`blog-card ${isArabic ? 'font-ar' : ''}`} 
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="blog-image-wrap">
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-image"
          loading="lazy"
          draggable={false}
        />
      </div>

      <div className="blog-overlay">
        <div className="blog-topline">
          <h3 className="blog-title">{blog.title}</h3>
          <span className="blog-date">{blog.date}</span>
        </div>

        <p className="blog-excerpt">{blog.excerpt}</p>

        <button
          type="button"
          className="blog-read-more"
          onClick={() => onReadMore?.(blog)}
          aria-label={`${tUi(lang, "readMore")}: ${blog.title}`}
        >
          <span className="see-more-title">{isArabic ? tUi(lang, "readMore") : "Read More"}</span>
          <span className="blog-read-more-icons" aria-hidden="true">
            <img src={readMoreIconUri} alt="" className="blog-read-more-icon" draggable={false} />
            <img src={readMoreIconUri} alt="" className="blog-read-more-icon" draggable={false} />
          </span>
        </button>
      </div>
    </article>
  );
};

// Memoizing to optimize performance in long lists
export default memo(BlogCard);
import React, { useState, useEffect } from "react";
import "./MangaCard.css";
// import { getStoredUser } from "../services/dashboardApi";

import heartIcon from "../assets/icons/heart.svg";
import heartFilledIcon from "../assets/icons/heart-filled.svg";
import readMoreIcon from "../assets/images/dashbaord/icons/More1.png";

const assetUri = (asset: any): string => {
  if (typeof asset === "string") return asset;
  if (typeof asset === "number") return String(asset);
  return asset?.src ?? asset?.uri ?? asset?.default?.src ?? asset?.default?.uri ?? asset?.default ?? "";
};

const truncate = (text: string, length: number) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};

const heartUri = assetUri(heartIcon);
const heartFilledUri = assetUri(heartFilledIcon);
const readMoreIconUri = assetUri(readMoreIcon);

export type CardVariant =
  | "featured"
  | "standard"
  | "chapter"
  | "episode"
  | "episodeRow"
  | "favouritesChapter"
  | "compactOverlay"
  | "category";

export type CardItem = {
  id: string;
  image: string;
  title: string;
  views?: string;
  likes?: string;
  comments?: string;
  chapter?: string;
  type?: string;
  creator?: string;
  dropped?: boolean;
  topLabel?: string;
  ctaLabel?: string;
  metaDate?: string;
  metaIcon?: string;
  author?: string;
  episodeTitle?: string;
  href?: string;
  isFavorite?: boolean;
};

type MangaCardProps = {
  item: CardItem;
  variant: CardVariant;
  isMobile: boolean;
  viewsImage: string;
  likesImage: string;
  sharesImage: string;
  isFavorite?: boolean;
  onCardClick?: (item: CardItem) => void;
  onToggleFavorite?: (item: CardItem) => void;
  style?: React.CSSProperties;
  lang?: string;
};

function StatsOverlay({
  views,
  likes,
  comments,
  viewsImage,
  likesImage,
  sharesImage,
  shaped = false,
}: {
  views?: string;
  likes?: string;
  comments?: string;
  viewsImage: string;
  likesImage: string;
  sharesImage: string;
  shaped?: boolean;
}) {
  return (
    <div className={`stats-overlay ${shaped ? "stats-overlay-shaped" : ""}`}>
      <span className="stat-item">
        <img src={viewsImage} alt="" />
        {views}
      </span>

      <span className="stat-item">
        <img src={likesImage} alt="" />
        {likes}
      </span>

      <span className="stat-item">
        <img src={sharesImage} alt="" />
        {comments}
      </span>
    </div>
  );
}

export default function MangaCard({
  item,
  variant,
  isMobile,
  viewsImage,
  likesImage,
  sharesImage,
  isFavorite: initialIsFavorite = false,
  onCardClick,
  onToggleFavorite,
  style,
  lang = "en",
}: MangaCardProps) {
  // Initialize from localStorage if available, otherwise use initialIsFavorite prop
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window !== "undefined") {
       const user = null;
       const userId ="guest";
      const saved = localStorage.getItem(`fav_${userId}_${item.id}`);
      return saved === "true";
    }
    return initialIsFavorite;
  });

  // Sync state if props change, but prioritize local storage if set
  useEffect(() => {
    if (typeof window !== "undefined") {
       const user = null;
      const userId ="guest";
      const saved = localStorage.getItem(`fav_${userId}_${item.id}`);
      if (saved !== null) {
        setIsFavorite(saved === "true");
      } else {
        setIsFavorite(initialIsFavorite);
      }
    }
  }, [initialIsFavorite, item.id]);

  const isFeatured = variant === "featured";
  const isStandard = variant === "standard";
  const isChapter = variant === "chapter";
  const isEpisode = variant === "episode";
  const isEpisodeRow = variant === "episodeRow";
  const isFavouritesChapter = variant === "favouritesChapter";
  const isCompactOverlay = variant === "compactOverlay";
  const isCategory = variant === "category";
  const isActionable = Boolean(onCardClick || item.href);

  const useOverlayStats =
    variant === "standard" || isCompactOverlay || isCategory;

  const activateCard = () => {
    if (onCardClick) {
      onCardClick(item);
      return;
    }

    if (item.href && typeof window !== "undefined") {
      window.location.href = item.href;
    }
  };

  return (
    <article
      className={[
        "manga-card",
        `variant-${variant}`,
        item.dropped ? "manga-card-dropped" : "",
        useOverlayStats ? "manga-card-overlay-meta" : "",
        isFeatured && isMobile ? "manga-card-row-1-mobile" : "",
        isActionable ? "is-clickable" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role={isActionable ? "button" : undefined}
      tabIndex={isActionable ? 0 : undefined}
      style={style}
      onClick={isActionable ? activateCard : undefined}
      onKeyDown={
        isActionable
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                activateCard();
              }
            }
          : undefined
      }
    >
      <div className="manga-cover-wrap">
        {!isFavouritesChapter && (
          <img
            src={item.image}
            alt={item.title}
            className="manga-cover"
            loading="lazy"
            draggable={false}
          />
        )}

        <button
          className={`manga-fav ${isFavorite ? "is-favorite" : ""}`}
          type="button"
          aria-label={`${isFavorite ? "Remove" : "Add"} ${item.title} ${isFavorite ? "from" : "to"} favorites`}
          aria-pressed={isFavorite}
          onClick={async (event) => {
            event.stopPropagation();
            const wasFavorite = isFavorite;
            const nextFavorite = !wasFavorite;
            
            setIsFavorite(nextFavorite);
            if (typeof window !== "undefined") {
               const user = null;
              const userId ="guest";
              localStorage.setItem(`fav_${userId}_${item.id}`, String(nextFavorite));
            }
            
            if (onToggleFavorite) {
              try {
                await onToggleFavorite(item);
              } catch (err) {
                console.error("Failed to toggle favorite:", err);
                setIsFavorite(wasFavorite);
                if (typeof window !== "undefined") {
                   const user = null;
                  const userId ="guest";
                  localStorage.setItem(`fav_${userId}_${item.id}`, String(wasFavorite));
                }
              }
            }
          }}
        >
          <img
            src={isFavorite ? heartFilledUri : heartUri}
            alt={isFavorite ? "Filled Heart" : "Heart"}
            draggable={false}
          />
        </button>

        {isFeatured && (
          <div className="row-1-bottom-ui">
            <button
              type="button"
              className="row-1-next-btn"
              onClick={(event) => {
                event.stopPropagation();
                activateCard();
              }}
            >
              {item.ctaLabel || (lang === "ar" ? "الفصل التالي" : "NEXT CHAPTER")}
            </button>

            <div className="row-1-meta-bar">
              <div className="row-1-meta-right">
                {item.metaIcon && (
                  <img src={item.metaIcon} alt="" className="row-1-meta-icon" />
                )}

                <span className="row-1-meta-date">
                  {item.metaDate === "Sat 15th . Oct" ? (
                    <>
                      Sat 15<span className="date-suffix">th</span> . Oct
                    </>
                  ) : (
                    item.metaDate
                  )}
                </span>
              </div>
            </div>
            </div>
            )}

        {isStandard && (
          <>
            <StatsOverlay
              views={item.views}
              likes={item.likes}
              comments={item.comments}
              viewsImage={viewsImage}
              likesImage={likesImage}
              sharesImage={sharesImage}
              shaped
            />
            <div className="manga-meta manga-meta-overlay" />
          </>
        )}

        {isCompactOverlay && (
          <>
            <StatsOverlay
              views={item.views}
              likes={item.likes}
              comments={item.comments}
              viewsImage={viewsImage}
              likesImage={likesImage}
              sharesImage={sharesImage}
              shaped
            />
            <div className="manga-meta manga-meta-overlay" />
          </>
        )}


        {isFavouritesChapter && (
          <div className="favourites-chapter-image-shell">
            <img
              src={item.image}
              alt={item.episodeTitle || item.title}
              className="manga-cover favourites-chapter-image"
              loading="lazy"
              draggable={false}
            />
          </div>
        )}

        {!isFeatured && isChapter && (
          <div className="chapter-overlay">
            <div className="dropped-bottom-row">
              <span className="chapter-tag2">{item.chapter}</span>
              <span className="chapter-tag3">
                <button
                  type="button"
                  className="read-more-btn"
                  onClick={(event) => {
                    event.stopPropagation();
                    activateCard();
                  }}
                >
                  {item.ctaLabel || (lang === "ar" ? "اقرأ المزيد" : "Read More")}
                  <span className="read-more-icons" aria-hidden="true">
                    <img src={readMoreIconUri} alt="" className="read-more-icon" draggable={false} />
                    <img src={readMoreIconUri} alt="" className="read-more-icon" draggable={false} />
                  </span>
                </button>
              </span>
            </div>
          </div>
        )}

        {isFavouritesChapter && (
          <div className="favourites-chapter-caption">
            <h3 className="favourites-chapter-title">
              {truncate(item.episodeTitle || item.title, 20)}
            </h3>

            <div className="favourites-chapter-meta">
              <span className="favourites-chapter-date">
                {item.metaDate || item.chapter || "Sat 15 . Oct"}
              </span>

              <div className="favourites-chapter-stats">
                <span className="stat-item">
                  <img src={likesImage} alt="" />
                  {item.likes}
                </span>
                <span className="stat-item">
                  <img src={sharesImage} alt="" />
                  {item.comments}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {isEpisode && (
        <div className="episode-variant-caption">
          <h3 className="episode-variant-title">
            {truncate(item.episodeTitle || item.title, 20)}
          </h3>

          <div className="episode-variant-meta">
            <span className="episode-variant-date">
              {item.metaDate || "Sat 15 . Oct"}
            </span>

            <div className="episode-variant-stats">
              <span className="stat-item">
                <img src={likesImage} alt="" />
                {item.likes}
              </span>
              <span className="stat-item">
                <img src={sharesImage} alt="" />
                {item.comments}
              </span>
            </div>
          </div>
        </div>
      )}

      {isEpisodeRow && (
        <>
          <div className="episode-row-variant-copy">
            <div className="episode-row-variant-head">
              <h3 className="episode-row-variant-title">
                {truncate(item.episodeTitle || item.title, 20)}
              </h3>
              <span className="episode-row-variant-date">
                {item.metaDate || "Sat 15 . Oct 2025"}
              </span>
            </div>

            <div className="episode-row-variant-chapter">{item.chapter}</div>
          </div>

          <div className="episode-row-variant-stats">
            <span className="stat-item">
              <img src={likesImage} alt="" />
              {item.likes}
            </span>
            <span className="stat-item">
              <img src={sharesImage} alt="" />
              {item.comments}
            </span>
          </div>
        </>
      )}

      {!isFeatured &&
        !isCompactOverlay &&
        !isCategory &&
        !isFavouritesChapter &&
        !isEpisode &&
        !isEpisodeRow && (
          <div className="manga-meta">
            <h3 className="manga-title">{truncate(item.title, 20)}</h3>
            <span className="manga-type">{item.type}</span>
          </div>
        )}

      {isCategory && (
        <div className="manga-meta manga-meta-category">
          <h3 className="manga-title">{truncate(item.title, 20)}</h3>
          <div className="manga-creator">{item.creator}</div>
          <span className="manga-type">{item.type}</span>
        </div>
      )}
    </article>
  );
}
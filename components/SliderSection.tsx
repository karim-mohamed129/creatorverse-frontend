import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import MangaCard, { CardItem, CardVariant } from "./MangaCard";
import type { Lang } from "./Header";
import "./SliderSection.css";

type DragState = {
  isDown: boolean;
  startX: number;
  scrollLeft: number;
};

type SliderSectionProps = {
  index: number;
  title: string;
  rowClass: string;
  items: CardItem[];
  variant: CardVariant;
  isMobile: boolean;
  chipImage: string;
  arrowImage: string;
  heartImage?: string;
  viewsImage: string;
  likesImage: string;
  sharesImage: string;
  onSeeMore?: () => void;
  scrollRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  dragStates: Record<number, DragState>;
  handleMouseDown: (index: number, e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: (index: number) => void;
  handleMouseUp: (index: number) => void;
  handleMouseMove: (index: number, e: React.MouseEvent<HTMLDivElement>) => void;
  scrollLeftFn: (index: number) => void;
  scrollRightFn: (index: number) => void;
  onToggleFavorite?: (item: CardItem) => void;
  lang?: Lang;
};

export default function SliderSection({
  index,
  title,
  rowClass,
  items,
  variant,
  isMobile,
  chipImage,
  arrowImage,
  heartImage,
  viewsImage,
  likesImage,
  sharesImage,
  onSeeMore,
  onToggleFavorite,
  scrollRefs,
  dragStates,
  handleMouseDown,
  handleMouseLeave,
  handleMouseUp,
  handleMouseMove,
  scrollLeftFn,
  scrollRightFn,
  lang = "en",
}: SliderSectionProps) {
  const isCategoryVariant = variant === "category";

  return (
    <section
      className={`content-section ${rowClass} ${
        isCategoryVariant ? "content-section-category" : ""
      }`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <SectionHeader
        title={title}
        chipImage={chipImage}
        onSeeMore={onSeeMore}
        lang={lang}
      />

      <div
        className={`slider-shell slider-${rowClass} ${
          isCategoryVariant ? "slider-shell-category" : ""
        }`}
      >
        {!isMobile && (
          <button
            className="nav-arrow nav-arrow-left"
            onClick={() => scrollLeftFn(index)}
            onMouseDown={(e) => e.preventDefault()}
            aria-label={lang === "ar" ? `التمرير إلى اليسار: ${title}` : `Scroll ${title} left`}
            type="button"
          >
            <img
              src={arrowImage}
              alt=""
              className="arrow-icon left"
              draggable={false}
            />
          </button>
        )}

        <div className="slider-viewport">
          <div
            className={`scroll-container ${
              dragStates[index]?.isDown ? "dragging" : ""
            } ${isCategoryVariant ? "scroll-container-category" : ""}`}
            ref={(el) => {
              scrollRefs.current[index] = el;
            }}
            onMouseDown={(e) => handleMouseDown(index, e)}
            onMouseLeave={() => handleMouseLeave(index)}
            onMouseUp={() => handleMouseUp(index)}
            onMouseMove={(e) => handleMouseMove(index, e)}
          >
            <div
              className={`cards-track ${
                isCategoryVariant ? "cards-track-category" : ""
              }`}
            >
              {items.map((item, itemIndex) => (
                <div
                  className={`manga-col ${
                    isCategoryVariant ? "manga-col-category" : ""
                  }`}
                  key={`${title}-${item.id}-${itemIndex}`}
                >
                  <MangaCard
                    item={item}
                    isFavorite={!!item.isFavorite}
                    variant={variant}
                    isMobile={isMobile}
                    viewsImage={viewsImage}
                    likesImage={likesImage}
                    sharesImage={sharesImage}
                    onToggleFavorite={onToggleFavorite}
                    lang={lang}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {!isMobile && (
          <button
            className="nav-arrow nav-arrow-right"
            onClick={() => scrollRightFn(index)}
            onMouseDown={(e) => e.preventDefault()}
            aria-label={lang === "ar" ? `التمرير إلى اليمين: ${title}` : `Scroll ${title} right`}
            type="button"
          >
            <img
              src={arrowImage}
              alt=""
              className="arrow-icon right"
              draggable={false}
            />
          </button>
        )}
      </div>
    </section>
  );
}
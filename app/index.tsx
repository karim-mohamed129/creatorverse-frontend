import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import SectionHeader from "../components/SectionHeader";
import SliderSection from "../components/SliderSection";
import BlogCard, { BlogItem } from "../components/BlogCard";
import { CardItem, CardVariant } from "../components/MangaCard";
import { usePersistedLang } from "../components/usePersistedLang";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Globals.css";

import arrowImg from "../assets/images/arrow.png";
import crownImg from "../assets/images/crown.png";

import homeExclusive1 from "../assets/images/home/1.png";
import homeExclusive2 from "../assets/images/home/2.png";
import homeExclusive3 from "../assets/images/home/3.png";
import homeExclusive4 from "../assets/images/home/4.png";

import homeTrending1 from "../assets/images/home/5.png";
import homeTrending2 from "../assets/images/home/6.png";
import homeTrending3 from "../assets/images/home/7.png";
import homeTrending4 from "../assets/images/home/8.png";
import homeTrending5 from "../assets/images/home/9.png";

import homeJustDropped1 from "../assets/images/home/10.png";
import homeJustDropped2 from "../assets/images/home/11.png";
import homeJustDropped3 from "../assets/images/home/12.png";
import homeJustDropped4 from "../assets/images/home/13.png";
import homeJustDropped5 from "../assets/images/home/14.png";

import homeTopPick1 from "../assets/images/home/15.png";
import homeTopPick2 from "../assets/images/home/16.png";
import homeTopPick3 from "../assets/images/home/17.png";
import homeTopPick4 from "../assets/images/home/18.png";
import homeTopPick5 from "../assets/images/home/19.png";

import homeBlog1 from "../assets/images/home/20.png";
import homeBlog2 from "../assets/images/home/21.png";
import homeBlog3 from "../assets/images/home/22.png";

import viewsIcon from "../assets/images/dashbaord/icons/views.png";
import likesIcon from "../assets/images/dashbaord/icons/likes.png";
import sharesIcon from "../assets/images/dashbaord/icons/share.png";
import chipShape from "../assets/icons/chip-shape.svg";
import heart from "../assets/icons/heart.svg";

type SectionData = {
  name: string;
  variant: CardVariant;
  rowClass: string;
  items: CardItem[];
};

type DragState = {
  isDown: boolean;
  startX: number;
  scrollLeft: number;
};

const assetUri = (asset: any): string => {
  if (typeof asset === "string") return asset;
  if (typeof asset === "number") return String(asset);
  return asset?.src ?? asset?.uri ?? asset?.default?.src ?? asset?.default?.uri ?? asset?.default ?? "";
};

const arrowUri = assetUri(arrowImg);
const crownUri = assetUri(crownImg);
const viewsUri = assetUri(viewsIcon);
const likesUri = assetUri(likesIcon);
const sharesUri = assetUri(sharesIcon);
const chipShapeUri = assetUri(chipShape);
const heartUri = assetUri(heart);

const homeExclusiveImages = [
  assetUri(homeExclusive1),
  assetUri(homeExclusive2),
  assetUri(homeExclusive3),
  assetUri(homeExclusive4),
];

const homeTrendingImages = [
  assetUri(homeTrending1),
  assetUri(homeTrending2),
  assetUri(homeTrending3),
  assetUri(homeTrending4),
  assetUri(homeTrending5),
];

const homeJustDroppedImages = [
  assetUri(homeJustDropped1),
  assetUri(homeJustDropped2),
  assetUri(homeJustDropped3),
  assetUri(homeJustDropped4),
  assetUri(homeJustDropped5),
];

const homeTopPickImages = [
  assetUri(homeTopPick1),
  assetUri(homeTopPick2),
  assetUri(homeTopPick3),
  assetUri(homeTopPick4),
  assetUri(homeTopPick5),
];

const homeBlogImages = [
  assetUri(homeBlog1),
  assetUri(homeBlog2),
  assetUri(homeBlog3),
];

const buildStaticSections = (): SectionData[] => {
  const exclusiveItems: CardItem[] = homeExclusiveImages.map((image, index) => ({
    id: `exclusive-${index + 1}`,
    href: "/categories",
    image,
    title: `Exclusive Content ${index + 1}`,
    views: "33K",
    likes: "10K",
    comments: "800",
    chapter: "CH.12",
    type: "ONESHOT MANGA",
    creator: "",
    dropped: false,
    topLabel: "ONESHOT MANGA",
    ctaLabel: "NEXT CHAPTER",
    metaDate: "Sat 15th . Oct",
    metaIcon: crownUri,
    author: "",
    isFavorite: false,
  }));

  const trendingItems: CardItem[] = homeTrendingImages.map((image, index) => ({
    id: `trending-${index + 1}`,
    href: "/categories",
    image,
    title: "THE TITTLE",
    views: "33K",
    likes: "10K",
    comments: "800",
    chapter: "",
    type: "MANGA",
    creator: "",
    dropped: false,
    topLabel: "MANGA",
    ctaLabel: "Read More",
    metaDate: "",
    metaIcon: "",
    author: "",
    isFavorite: false,
  }));

  const justDroppedItems: CardItem[] = homeJustDroppedImages.map((image, index) => ({
    id: `just-dropped-${index + 1}`,
    href: "/categories",
    image,
    title: "THE TITTLE",
    views: "33K",
    likes: "10K",
    comments: "800",
    chapter: "CH.12",
    type: "",
    creator: "",
    dropped: false,
    topLabel: "MANGA",
    ctaLabel: "Read More",
    metaDate: "",
    metaIcon: "",
    author: "",
    isFavorite: false,
  }));

  const topPickItems: CardItem[] = homeTopPickImages.map((image, index) => ({
    id: `top-picks-${index + 1}`,
    href: "/categories",
    image,
    title: "",
    views: "33K",
    likes: "10K",
    comments: "800",
    chapter: "",
    type: "",
    creator: "",
    dropped: false,
    topLabel: "MANGA",
    ctaLabel: "Read More",
    metaDate: "",
    metaIcon: "",
    author: "",
    isFavorite: false,
  }));

  return [
    {
      name: "EXCLUSIVE CONTENT",
      variant: "featured",
      rowClass: "row-1",
      items: exclusiveItems,
    },
    {
      name: "TRENDING",
      variant: "standard",
      rowClass: "row-2",
      items: trendingItems,
    },
    {
      name: "JUST DROPPED",
      variant: "chapter",
      rowClass: "row-3",
      items: justDroppedItems,
    },
    {
      name: "TOP PICKS",
      variant: "compactOverlay",
      rowClass: "row-4",
      items: topPickItems,
    },
  ];
};

const staticBlogs: BlogItem[] = homeBlogImages.map((image, index) => ({
  id: `blog-${index + 1}`,
  image,
  title: "BLOG NAME",
  date: "26 SEP 2026",
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquam purus ex, eget rutrum massa feugiat et. Praesent interdum justo a magna ultrices mattis. Curabitur pharetra",
  category: "",
}));

export default function App() {
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dragStates, setDragStates] = useState<Record<number, DragState>>({});
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  const [lang, setLang] = usePersistedLang("ar");

  const isMobile = windowWidth <= 991;
  const isArabic = lang === "ar";
  const pageDir = isArabic ? "rtl" : "ltr";
  const sections = buildStaticSections();
  const blogs = staticBlogs;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.dir = pageDir;
    document.documentElement.lang = lang;
    document.body.dir = pageDir;

    document.documentElement.classList.toggle("is-rtl", isArabic);
    document.documentElement.classList.toggle("is-ltr", !isArabic);
    document.body.classList.toggle("is-rtl", isArabic);
    document.body.classList.toggle("is-ltr", !isArabic);
  }, [pageDir, lang, isArabic]);

  useEffect(() => {
    setDragStates({});

    requestAnimationFrame(() => {
      scrollRefs.current.forEach((container) => {
        if (!container) return;
        container.scrollLeft = 0;
      });
    });
  }, [lang]);

  const getCardStep = (index: number) => {
    const container = scrollRefs.current[index];
    if (!container) return 0;

    const firstCard = container.querySelector(
      ".manga-col, .blog-col"
    ) as HTMLElement | null;

    if (!firstCard) return 0;

    const track = container.querySelector(
      ".cards-track, .blogs-grid"
    ) as HTMLElement | null;

    const styles = track ? window.getComputedStyle(track) : null;
    const gap = styles ? parseFloat(styles.gap || "0") : 0;
    const cardWidth = firstCard.offsetWidth;

    return cardWidth + gap;
  };

  const getVisibleCards = (index: number) => {
    const row = document.querySelector(
      `.row-${index + 1}`
    ) as HTMLElement | null;

    if (!row) return 1;

    const variableName = index === 4 ? "--blog-cols" : "--cols";
    const rawCols = window
      .getComputedStyle(row)
      .getPropertyValue(variableName)
      .trim();

    const cols = parseFloat(rawCols);

    if (!Number.isFinite(cols) || cols <= 0) return 1;

    return cols;
  };

  const getScrollAmount = (index: number) => {
    const step = getCardStep(index);
    return step * getVisibleCards(index);
  };

  const snapToNearestCard = (index: number) => {
    const container = scrollRefs.current[index];
    if (!container) return;

    const step = getCardStep(index);
    if (!step) return;

    const snappedLeft = Math.round(container.scrollLeft / step) * step;

    container.scrollTo({
      left: snappedLeft,
      behavior: "smooth",
    });
  };

  const scrollLeftFn = (index: number) => {
    const amount = getScrollAmount(index);

    scrollRefs.current[index]?.scrollBy({
      left: isArabic ? amount : -amount,
      behavior: "smooth",
    });
  };

  const scrollRightFn = (index: number) => {
    const amount = getScrollAmount(index);

    scrollRefs.current[index]?.scrollBy({
      left: isArabic ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (isMobile) return;

    const slider = scrollRefs.current[index];
    if (!slider) return;

    setDragStates((prev) => ({
      ...prev,
      [index]: {
        isDown: true,
        startX: e.pageX - slider.offsetLeft,
        scrollLeft: slider.scrollLeft,
      },
    }));
  };

  const handleMouseLeave = (index: number) => {
    const wasDragging = dragStates[index]?.isDown;

    setDragStates((prev) => ({
      ...prev,
      [index]: {
        ...(prev[index] || {
          startX: 0,
          scrollLeft: 0,
          isDown: false,
        }),
        isDown: false,
      },
    }));

    if (wasDragging) {
      snapToNearestCard(index);
    }
  };

  const handleMouseUp = (index: number) => {
    setDragStates((prev) => ({
      ...prev,
      [index]: {
        ...(prev[index] || {
          startX: 0,
          scrollLeft: 0,
          isDown: false,
        }),
        isDown: false,
      },
    }));

    snapToNearestCard(index);
  };

  const handleMouseMove = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (isMobile) return;

    const slider = scrollRefs.current[index];
    const state = dragStates[index];

    if (!slider || !state?.isDown) return;

    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - state.startX) * 1.5;

    slider.scrollLeft = state.scrollLeft - walk * (isArabic ? -1 : 1);
  };

  return (
    <div
      className={`home-page ${isArabic ? "lang-ar-page" : "lang-en-page"}`}
      dir={pageDir}
      lang={lang}
    >
      <div className="home-noise" />

      <Header
        lang={lang}
        onLanguageChange={setLang}
        currentPage="home"
      />

      <main
        key={`main-${lang}`}
        className="page-content py-4 py-md-5"
        dir={pageDir}
      >
        {sections.map((section, index) => (
          <SliderSection
            key={`${lang}-${section.name}`}
            index={index}
            title={section.name}
            rowClass={section.rowClass}
            items={section.items}
            variant={section.variant}
            isMobile={isMobile}
            chipImage={chipShapeUri}
            arrowImage={arrowUri}
            heartImage={heartUri}
            viewsImage={viewsUri}
            likesImage={likesUri}
            sharesImage={sharesUri}
            scrollRefs={scrollRefs}
            dragStates={dragStates}
            handleMouseDown={handleMouseDown}
            handleMouseLeave={handleMouseLeave}
            handleMouseUp={handleMouseUp}
            handleMouseMove={handleMouseMove}
            scrollLeftFn={scrollLeftFn}
            scrollRightFn={scrollRightFn}
            lang="en"
            onSeeMore={() => {
              window.location.href = "/categories";
            }}
          />
        ))}

        <section className="content-section row-5" dir={pageDir}>
          <SectionHeader
            title="BLOGS"
            chipImage={chipShapeUri}
            onSeeMore={() => {
              window.location.href = "/blogs";
            }}
            lang="en"
          />

          <div className="slider-shell slider-row-5">
            {!isMobile && (
              <button
                className="nav-arrow nav-arrow-left"
                onClick={() => scrollLeftFn(4)}
                onMouseDown={(e) => e.preventDefault()}
                aria-label={isArabic ? "التمرير يسارًا" : "Scroll blogs left"}
                type="button"
              >
                <img
                  src={arrowUri}
                  alt=""
                  className="arrow-icon left"
                  draggable={false}
                />
              </button>
            )}

            <div className="slider-viewport">
              <div
                className={`scroll-container ${
                  dragStates[4]?.isDown ? "dragging" : ""
                }`}
                ref={(el) => {
                  scrollRefs.current[4] = el;
                }}
                onMouseDown={(e) => handleMouseDown(4, e)}
                onMouseLeave={() => handleMouseLeave(4)}
                onMouseUp={() => handleMouseUp(4)}
                onMouseMove={(e) => handleMouseMove(4, e)}
              >
                <div className="blogs-grid">
                  {blogs.map((blog) => (
                    <div className="blog-col" key={blog.id}>
                      <BlogCard
                        blog={blog}
                        lang="en"
                        onReadMore={() => {
                          window.location.href = `/blog-inner?id=${encodeURIComponent(blog.id)}`;
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!isMobile && (
              <button
                className="nav-arrow nav-arrow-right"
                onClick={() => scrollRightFn(4)}
                onMouseDown={(e) => e.preventDefault()}
                aria-label={isArabic ? "التمرير يمينًا" : "Scroll blogs right"}
                type="button"
              >
                <img
                  src={arrowUri}
                  alt=""
                  className="arrow-icon right"
                  draggable={false}
                />
              </button>
            )}
          </div>
        </section>
      </main>

      <BackToTop />

      <div className="footer-direction-shell" dir={pageDir}>
        <Footer lang={lang} />
      </div>
    </div>
  );
}

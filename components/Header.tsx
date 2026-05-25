import React, { useEffect, useMemo, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import "../app/Globals.css";

import headerBg from "../assets/images/header.png";
import shapeBg from "../assets/images/shape.png";
import logoMain from "../assets/images/logo-main.png";
import androidIcon from "../assets/images/android-icon-foreground.png";
import closeX from "../assets/images/x.png";
import closeCircle from "../assets/images/circle.png";
import loop from "../assets/icons/loop.svg";
import {
  getStoredTestUserId,
  getTestUserById,
  TEST_AUTH_EVENT,
} from "../app/testAuth.helper";
import { tUi, useArabicDomTranslator } from "./i18n";
import {
  globalSearch,
  type SearchData,
  emptySearchData,
  hasSearchResults,
} from "../services/searchService";
import { resolveApiAsset } from "../services/apiHelpers";
// import { CART_CHANGE_EVENT, readLocalCart } from "../services/cartApi";
// import { getProfile } from "../services/dashboardApi";
import { getSiteSettings, SiteSettings } from "../services/settingsApi";

const assetUri = (asset: any): string =>
  typeof asset === "string"
    ? asset
    : asset?.src ??
      asset?.uri ??
      asset?.default?.src ??
      asset?.default?.uri ??
      asset?.default ??
      "";

export type Lang = "en" | "ar";

export type HeaderPage =
  | "none"
  | "home"
  | "categories"
  | "creators"
  | "shop"
  | "subscription";

type HeaderProps = {
  lang?: Lang;
  onLanguageChange?: (lang: Lang) => void;
  currentPage?: HeaderPage;
};

const MOBILE_HEADER_MAX_WIDTH = 1025;

function HeaderNotificationIcon() {
  return (
    <svg
      width="15"
      height="18"
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14.6847 12.7372C14.6199 12.6613 14.5563 12.5854 14.4938 12.5122C13.6352 11.5024 13.1157 10.893 13.1157 8.03451C13.1157 6.5546 12.7515 5.34031 12.0338 4.4296C11.5045 3.75681 10.7891 3.24643 9.84616 2.86924C9.83403 2.86268 9.82319 2.85407 9.81416 2.84382C9.47499 1.73958 8.54687 1 7.5001 1C6.45332 1 5.52559 1.73958 5.18642 2.84268C5.17739 2.85257 5.1667 2.86091 5.15481 2.86734C2.95432 3.74808 1.88491 5.43784 1.88491 8.03337C1.88491 10.893 1.36621 11.5024 0.506777 12.511C0.44433 12.5843 0.380711 12.6587 0.315922 12.7361C0.148564 12.9323 0.0425285 13.171 0.0103651 13.424C-0.0217982 13.677 0.0212568 13.9337 0.134435 14.1636C0.375247 14.6569 0.888486 14.9631 1.47432 14.9631H13.5302C14.1133 14.9631 14.623 14.6573 14.8646 14.1663C14.9783 13.9363 15.0217 13.6794 14.9898 13.4261C14.9579 13.1728 14.852 12.9338 14.6847 12.7372ZM7.5001 18C8.06409 17.9996 8.61744 17.8507 9.10147 17.5693C9.58549 17.2878 9.98214 16.8842 10.2493 16.4013C10.2619 16.3782 10.2681 16.3523 10.2674 16.3261C10.2666 16.2999 10.2589 16.2744 10.245 16.252C10.2311 16.2296 10.2115 16.211 10.188 16.1982C10.1646 16.1853 10.1381 16.1785 10.1112 16.1786H4.8898C4.86284 16.1785 4.83631 16.1852 4.81281 16.198C4.7893 16.2108 4.76961 16.2294 4.75566 16.2518C4.74171 16.2742 4.73397 16.2998 4.7332 16.326C4.73242 16.3522 4.73864 16.3781 4.75124 16.4013C5.01841 16.8842 5.415 17.2877 5.89895 17.5692C6.3829 17.8506 6.93617 17.9995 7.5001 18Z"
        fill="white"
      />
    </svg>
  );
}

function HeaderCartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14.4 14.4C14.8774 14.4 15.3352 14.5896 15.6728 14.9272C16.0104 15.2648 16.2 15.7226 16.2 16.2C16.2 16.6774 16.0104 17.1352 15.6728 17.4728C15.3352 17.8104 14.8774 18 14.4 18C13.9226 18 13.4648 17.8104 13.1272 17.4728C12.7896 17.1352 12.6 16.6774 12.6 16.2C12.6 15.201 13.401 14.4 14.4 14.4ZM0 0H2.943L3.789 1.8H17.1C17.3387 1.8 17.5676 1.89482 17.7364 2.0636C17.9052 2.23239 18 2.4613 18 2.7C18 2.853 17.955 3.006 17.892 3.15L14.67 8.973C14.364 9.522 13.77 9.9 13.095 9.9H6.39L5.58 11.367L5.553 11.475C5.553 11.5347 5.57671 11.5919 5.61893 11.6341C5.66115 11.6763 5.71833 11.7 5.778 11.7H16.2V13.5H5.4C4.92261 13.5 4.46477 13.3104 4.12721 12.9728C3.78964 12.6352 3.6 12.1774 3.6 11.7C3.6 11.385 3.681 11.088 3.816 10.836L5.04 8.631L1.8 1.8H0V0ZM5.4 14.4C5.87739 14.4 6.33523 14.5896 6.67279 14.9272C7.01036 15.2648 7.2 15.7226 7.2 16.2C7.2 16.6774 7.01036 17.1352 6.67279 17.4728C6.33523 17.8104 5.87739 18 5.4 18C4.92261 18 4.46477 17.8104 4.12721 17.4728C3.78964 17.1352 3.6 16.6774 3.6 16.2C3.6 15.201 4.401 14.4 5.4 14.4Z"
        fill="white"
      />
    </svg>
  );
}

const translations = {
  en: {
    becomeCreator: "BECOME A CREATOR",
    joinReader: "JOIN AS READER",
    alreadyAccount: "Already have an account?",
    login: "LOGIN",
    home: "HOME",
    categories: "CATEGORIES",
    creators: "CREATORS",
    shop: "SHOP",
    subscription: "SUBSCRIPTION",
    search: "SEARCH",
    arabicLabel: "ع",
    englishLabel: "EN",
    contents: "Contents",
    chapters: "Chapters",
    creators_label: "Creators",
    noResults: "No results found",
  },
  ar: {
    becomeCreator: "كن منشئًا",
    joinReader: "انضم كقارئ",
    alreadyAccount: "هل لديك حساب بالفعل؟",
    login: "تسجيل الدخول",
    home: "الرئيسية",
    categories: "التصنيفات",
    creators: "المنشئون",
    shop: "المتجر",
    subscription: "الاشتراك",
    search: "بحث",
    arabicLabel: "ع",
    englishLabel: "EN",
    contents: "المحتويات",
    chapters: "الفصول",
    creators_label: "المنشئون",
    noResults: "لا توجد نتائج",
  },
};

export default function Header({
  lang = "ar",
  onLanguageChange,
  currentPage = "home",
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileHeader, setIsMobileHeader] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= MOBILE_HEADER_MAX_WIDTH;
  });
  const [loggedInUser, setLoggedInUser] = useState<any | null>(() => {
    if (typeof window === "undefined") return null;
    const testUser = getTestUserById(getStoredTestUserId());
    if (testUser) return testUser;
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [authReady, setAuthReady] = useState(typeof window !== "undefined");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchData>(
    emptySearchData()
  );
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [cartCount, setCartCount] = useState(0);

  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_HEADER_MAX_WIDTH}px)`
    );
    let resizeFrame = 0;

    const syncHeaderMode = () => {
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);

      resizeFrame = window.requestAnimationFrame(() => {
        const nextIsMobile = window.innerWidth <= MOBILE_HEADER_MAX_WIDTH;
        setIsMobileHeader(nextIsMobile);

        if (!nextIsMobile) {
          setMenuOpen(false);
        }
      });
    };

    syncHeaderMode();

    window.addEventListener("resize", syncHeaderMode);
    window.addEventListener("orientationchange", syncHeaderMode);
    window.visualViewport?.addEventListener("resize", syncHeaderMode);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncHeaderMode);
    } else {
      mediaQuery.addListener(syncHeaderMode);
    }

    return () => {
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", syncHeaderMode);
      window.removeEventListener("orientationchange", syncHeaderMode);
      window.visualViewport?.removeEventListener("resize", syncHeaderMode);

      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", syncHeaderMode);
      } else {
        mediaQuery.removeListener(syncHeaderMode);
      }
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const mobileMenuOpen = menuOpen && isMobileHeader;

  const safeLang: Lang = lang === "ar" ? "ar" : "en";
  const t = translations[safeLang];
  const isArabic = safeLang === "ar";

  useArabicDomTranslator(safeLang);

  const headerBgUri = assetUri(headerBg);
  const shapeBgUri = assetUri(shapeBg);
  const loopUri = assetUri(loop);
  const logoMainUri = assetUri(logoMain);
  const androidIconUri = assetUri(androidIcon);
  const closeXUri = assetUri(closeX);
  const closeCircleUri = assetUri(closeCircle);

  const resolvedLogo = isArabic 
    ? (settings?.logo_ar || settings?.logo || logoMainUri)
    : logoMainUri;

  const isLoggedIn = Boolean(loggedInUser);
  const isCreator =
    loggedInUser?.role === "creator" || loggedInUser?.type === "creator";
  const resolvedUserName =
    loggedInUser?.name || loggedInUser?.first_name || tUi(safeLang, "userName");
  const userAvatarImg =
    resolveApiAsset(
      loggedInUser?.image ||
        loggedInUser?.avatar ||
        loggedInUser?.profile_image ||
        loggedInUser?.profile_img
    );

  const profileHref = useMemo(() => {
    if (!loggedInUser) return "/login";
    return isCreator ? "/creator-dashboard" : "/dashboard";
  }, [loggedInUser, isCreator]);

  const handleLanguageChange = (nextLang: Lang) => {
    onLanguageChange?.(nextLang);
  };

  const LanguageSwitch = () => (
    <div className="lang-switch">
      <button
        type="button"
        className={`lang-ar ${safeLang === "ar" ? "active" : ""}`}
        aria-pressed={safeLang === "ar"}
        onClick={() => handleLanguageChange("ar")}
      >
        <span className="arabic-lang-letter">{t.arabicLabel}</span>
      </button>

      <button
        type="button"
        className={`lang-en ${safeLang === "en" ? "active" : ""}`}
        aria-pressed={safeLang === "en"}
        onClick={() => handleLanguageChange("en")}
      >
        {t.englishLabel}
      </button>
    </div>
  );

  useEffect(() => {
    const syncUser = async () => {
      const testUser = getTestUserById(getStoredTestUserId());
      if (testUser) {
        setLoggedInUser(testUser);
      } else {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            setLoggedInUser(null);
            setAuthReady(true);
            return;
          }

          // Try to fetch fresh profile first
          // try {
          //   const freshUser = await getProfile();
          //   if (freshUser) {
          //     setLoggedInUser(freshUser);
          //     localStorage.setItem("user", JSON.stringify(freshUser));
          //   }
          // } catch (e) {
          //   // Fallback to local storage if API fails
          //   const raw = localStorage.getItem("user");
          //   setLoggedInUser(raw ? JSON.parse(raw) : null);
          // }
        } catch {
          setLoggedInUser(null);
        }
      }
      setAuthReady(true);
    };

    void syncUser();

    const syncCart = () => {
      // Cart API file is not included in the current frontend recovery ZIP.
      // Keep this as a safe no-op until services/cartApi.ts is restored.
      setCartCount(0);
    };
    // syncCart();

    window.addEventListener("storage", syncUser);
    window.addEventListener("focus", syncUser);
    window.addEventListener(TEST_AUTH_EVENT, syncUser);
    window.addEventListener("auth-change", syncUser);
    // window.addEventListener(CART_CHANGE_EVENT, syncCart);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("focus", syncUser);
      window.removeEventListener(TEST_AUTH_EVENT, syncUser);
      window.removeEventListener("auth-change", syncUser);
      // window.removeEventListener(CART_CHANGE_EVENT, syncCart);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults(emptySearchData());
      setShowSearchResults(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const token = localStorage.getItem("token") || undefined;
        const results = await globalSearch({ keyword: searchQuery, token });
        setSearchResults(results);
        setShowSearchResults(true);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <header
      className={`site-header ${
        isArabic ? "header-lang-ar" : "header-lang-en"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="top-header">
        <img src={headerBgUri} alt="" className="top-header-bg" />

        <div className="container-fluid header-inner">
          <a className="brand-wrap" href="/" onClick={closeMenu}>
            {resolvedLogo && (
              <>
                <img
                  src={resolvedLogo}
                  alt="505 Error"
                  className="header-logo header-logo-main"
                />
                <img
                  src={androidIconUri || resolvedLogo}
                  alt="505 Error"
                  className="header-logo-small-screen"
                />
              </>
            )}
          </a>

          <button
            className={`custom-toggler ${mobileMenuOpen ? "is-open" : ""}`}
            type="button"
            aria-controls="navbarMain"
            aria-expanded={mobileMenuOpen}
            aria-label={tUi(safeLang, "toggleNavigation")}
            onClick={toggleMenu}
          >
            <span className="custom-toggler-line" />
            <span className="custom-toggler-line" />
            <span className="custom-toggler-line" />
          </button>

          <div
            className={`custom-collapse ${mobileMenuOpen ? "is-open" : ""}`}
            id="navbarMain"
          >
            <div className="top-links">
              <div className="shape-container">
                <img src={shapeBgUri} className="shape-bg" alt="" />

                <div
                  className={`shape-content${isLoggedIn ? " is-logged-in" : ""}`}
                  style={{ visibility: authReady ? "visible" : "hidden" }}
                >
                  {authReady && isLoggedIn ? (
                    <>
                      <div className="header-user-menu-wrapper">
                        <a
                          className="header-user-chip"
                          href={profileHref}
                          onClick={closeMenu}
                        >
                          {userAvatarImg && (
                            <img
                              src={userAvatarImg}
                              alt={resolvedUserName}
                              className="header-user-avatar"
                            />
                          )}
                          <span className="header-user-name">
                            {resolvedUserName}
                          </span>
                        </a>
                      </div>

                      <a
                        className="header-user-action"
                        href={
                          isCreator
                            ? "/creator-notifications"
                            : "/notifications"
                        }
                        onClick={closeMenu}
                        aria-label={tUi(safeLang, "notifications")}
                      >
                        <HeaderNotificationIcon />
                      </a>

                      <a
                        className="header-user-action"
                        href="/cart"
                        onClick={closeMenu}
                        aria-label={tUi(safeLang, "cart")}
                      >
                        <HeaderCartIcon />
                        {cartCount > 0 && (
                          <span className="header-cart-count">{cartCount}</span>
                        )}
                      </a>
                    </>
                  ) : authReady ? (
                    <>
                      <a
                        className="top-pill-link"
                        href="/signup?user_type=creator"
                        onClick={closeMenu}
                      >
                        <span>{t.becomeCreator}</span>
                      </a>

                      <a
                        className="top-pill-link"
                        href="/signup?user_type=reader"
                        onClick={closeMenu}
                      >
                        <span>{t.joinReader}</span>
                      </a>

                      <a
                        className="account-link"
                        href="/login"
                        onClick={closeMenu}
                      >
                        {t.alreadyAccount} <span>{t.login}</span>
                      </a>
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            {!mobileMenuOpen ? <LanguageSwitch /> : null}
          </div>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="figma-mobile-menu" role="dialog" aria-modal="true">
          <div className="figma-mobile-menu-head">
            <img src={headerBgUri} alt="" className="figma-mobile-menu-bg" />
            <a className="figma-mobile-menu-logo-link" href="/" onClick={closeMenu}>
              {resolvedLogo && (
                <img src={resolvedLogo} alt="505 Error" className="figma-mobile-menu-logo" />
              )}
            </a>
            <button
              type="button"
              className="figma-mobile-menu-close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <img src={closeCircleUri} alt="" className="figma-mobile-menu-close-circle" />
              <img src={closeXUri} alt="" className="figma-mobile-menu-close-x" />
            </button>
          </div>

          <div className="figma-mobile-menu-body">
            <form
              className="figma-mobile-search"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="figma-mobile-search-input"
                type="search"
                placeholder={t.search}
                style={{ backgroundImage: `url(${loopUri})` }}
                aria-label={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {!isLoggedIn ? (
              <div className="figma-mobile-actions">
                <a className="figma-mobile-action-btn" href="/signup?user_type=creator" onClick={closeMenu}>
                  {t.becomeCreator}
                </a>
                <a className="figma-mobile-action-btn" href="/signup?user_type=reader" onClick={closeMenu}>
                  {t.joinReader}
                </a>
              </div>
            ) : null}

            {!isLoggedIn ? (
              <a className="figma-mobile-login" href="/login" onClick={closeMenu}>
                <span>{t.alreadyAccount}</span>
                <strong>{t.login}</strong>
              </a>
            ) : null}

            <nav className="figma-mobile-nav" aria-label="Mobile navigation">
              <a className="figma-mobile-nav-link" href="/" onClick={closeMenu}>{t.home}</a>
              <a className="figma-mobile-nav-link" href="/categories" onClick={closeMenu}>{t.categories}</a>
              <a className="figma-mobile-nav-link" href="/creators" onClick={closeMenu}>{t.creators}</a>
              <a className="figma-mobile-nav-link" href="/subscriptions" onClick={closeMenu}>{t.subscription}</a>
              <a className="figma-mobile-nav-link" href="/shop" onClick={closeMenu}>{t.shop}</a>
            </nav>

            <div className="figma-mobile-lang">
              <button
                type="button"
                className={`figma-mobile-lang-btn ${safeLang === "en" ? "active" : ""}`}
                onClick={() => handleLanguageChange("en")}
              >
                ENGLISH
              </button>
              <button
                type="button"
                className={`figma-mobile-lang-btn figma-mobile-lang-ar ${safeLang === "ar" ? "active" : ""}`}
                onClick={() => handleLanguageChange("ar")}
              >
                العربية
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="bottom-header">
        <div className="container-fluid bottom-header-inner">
          <div className="bottom-spacer" />

          <nav className={`main-menu ${mobileMenuOpen ? "is-open" : ""}`}>
            <a
              className={`main-menu-link ${
                currentPage === "home" ? "active" : ""
              }`}
              href="/"
              onClick={closeMenu}
            >
              {t.home}
            </a>

            <a
              className={`main-menu-link ${
                currentPage === "categories" ? "active" : ""
              }`}
              href="/categories"
              onClick={closeMenu}
            >
              {t.categories}
            </a>

            <a
              className={`main-menu-link ${
                currentPage === "creators" ? "active" : ""
              }`}
              href="/creators"
              onClick={closeMenu}
            >
              {t.creators}
            </a>

            <a
              className={`main-menu-link ${
                currentPage === "shop" ? "active" : ""
              }`}
              href="/shop"
              onClick={closeMenu}
            >
              {t.shop}
            </a>

            <a
              className={`main-menu-link ${
                currentPage === "subscription" ? "active" : ""
              }`}
              href="/subscriptions"
              onClick={closeMenu}
            >
              {t.subscription}
            </a>
          </nav>

          <div
            className={`search-wrap ${mobileMenuOpen ? "is-open" : ""}`}
            ref={searchRef}
          >
            <form
              className="search-form"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="search-input"
                type="search"
                placeholder={t.search}
                style={{ backgroundImage: `url(${loopUri})` }}
                aria-label={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (hasSearchResults(searchResults)) setShowSearchResults(true);
                }}
              />
            </form>

            {showSearchResults && (
              <div className="search-results-dropdown">
                {isSearching ? (
                  <div className="search-status">{tUi(safeLang, "loading")}</div>
                ) : !hasSearchResults(searchResults) ? (
                  <div className="search-status">{t.noResults}</div>
                ) : (
                  <>
                    {searchResults.contents.length > 0 && (
                      <div className="search-section">
                        <h4 className="search-section-title">{t.contents}</h4>
                        {searchResults.contents.map((item) => (
                          <a
                            key={item.id}
                            href={`/category-inner?id=${item.id}&view=grid`}
                            className="search-item"
                          >
                            <img
                              src={resolveApiAsset(item.cover_image)}
                              alt=""
                              className="search-item-img"
                            />
                            <div className="search-item-info">
                              <span className="search-item-title">
                                {item.title}
                              </span>
                              <span className="search-item-meta">
                                {item.creator_name}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}

                    {searchResults.chapters.length > 0 && (
                      <div className="search-section">
                        <h4 className="search-section-title">{t.chapters}</h4>
                        {searchResults.chapters.map((item) => (
                          <a
                            key={item.id}
                            href={`/view-chapter?id=${item.id}&content_id=${item.id}`}
                            className="search-item"
                          >
                            <img
                              src={resolveApiAsset(item.cover_image)}
                              alt=""
                              className="search-item-img"
                            />
                            <div className="search-item-info">
                              <span className="search-item-title">
                                {item.title}
                              </span>
                              <span className="search-item-meta">
                                {item.series_name} - CH.{item.chapter_no}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}

                    {searchResults.creators.length > 0 && (
                      <div className="search-section">
                        <h4 className="search-section-title">
                          {t.creators_label}
                        </h4>
                        {searchResults.creators.map((item) => (
                          <a
                            key={item.id}
                            href={`/creator-profile?id=${item.id}`}
                            className="search-item"
                          >
                            <img
                              src={resolveApiAsset(item.profile_image)}
                              alt=""
                              className="search-item-img search-item-img-circle"
                            />
                            <div className="search-item-info">
                              <span className="search-item-title">
                                {item.name}
                              </span>
                              <span className="search-item-meta">
                                {item.content_count}{" "}
                                {isArabic ? "محتوى" : "Contents"}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {mobileMenuOpen ? <LanguageSwitch /> : null}
        </div>
      </div>
    </header>
  );
}

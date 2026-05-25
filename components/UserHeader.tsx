import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserHeader.css";

import headerBg from "../assets/images/header.png";
import shapeBg from "../assets/images/shape.png";
import loop from "../assets/icons/loop.svg";

import { FiBell, FiShoppingCart, FiUser } from "react-icons/fi";
import { tUi, useArabicDomTranslator } from "./i18n";
import { getSiteSettings, SiteSettings } from "../services/settingsApi";
import { getProfile } from "../services/dashboardApi";
import { resolveApiAsset } from "../services/apiHelpers";
import { readLocalCart, CART_CHANGE_EVENT } from "../services/cartApi";

export type UserHeaderLang = "en" | "ar";
export type UserHeaderPage =
  | "none"
  | "home"
  | "categories"
  | "creators"
  | "shop"
  | "subscription";

type UserHeaderProps = {
  lang?: UserHeaderLang;
  onLanguageChange?: (lang: UserHeaderLang) => void;
  currentPage?: UserHeaderPage;
  userName?: string;
};

const assetUri = (asset: any): string =>
  typeof asset === "string" ? asset : asset?.uri ?? asset?.default?.src ?? asset?.default ?? "";

const translations = {
  en: {
    home: "HOME",
    categories: "CATEGORIES",
    creators: "CREATORS",
    shop: "SHOP",
    subscription: "SUBSCRIPTION",
    search: "SEARCH",
    arabicLabel: "ع",
    englishLabel: "EN",
  },
  ar: {
    home: "الرئيسية",
    categories: "التصنيفات",
    creators: "المنشئون",
    shop: "المتجر",
    subscription: "الاشتراك",
    search: "بحث",
    arabicLabel: "ع",
    englishLabel: "EN",
  },
};

export default function UserHeader({
  lang = "ar",
  onLanguageChange,
  currentPage = "none",
  userName,
}: UserHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const t = translations[lang];
  const isArabic = lang === "ar";
  useArabicDomTranslator(lang);

  const headerBgUri = assetUri(headerBg);
  const shapeBgUri = assetUri(shapeBg);
  const loopUri = assetUri(loop);

  useEffect(() => {
    getSiteSettings().then(setSettings);
    getProfile().then(setUser).catch(() => {
      // Fallback to localStorage if API fails
      try {
        const raw = localStorage.getItem("user");
        if (raw) setUser(JSON.parse(raw));
      } catch {}
    });

    const syncCart = () => {
      const cart = readLocalCart();
      setCartCount(cart.reduce((s, i) => s + i.quantity, 0));
    };
    syncCart();
    window.addEventListener(CART_CHANGE_EVENT, syncCart);
    return () => window.removeEventListener(CART_CHANGE_EVENT, syncCart);
  }, []);

  const resolvedLogo = isArabic 
    ? (settings?.logo_ar || settings?.logo)
    : (settings?.logo);

  const finalAvatarUri = resolveApiAsset(
    user?.image || user?.avatar || user?.profile_image || user?.profile_img
  );

  const resolvedUserName = user?.name || user?.first_name || userName || tUi(lang, "userName");

  return (
    <header
      className={`user-site-header ${isArabic ? "user-header-lang-ar" : "user-header-lang-en"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="user-top-header">
        <img src={headerBgUri} alt="" className="user-top-header-bg" />

        <div className="container-fluid user-header-inner">
          <a className="user-brand-wrap" href="/">
            {resolvedLogo && (
              <img src={resolvedLogo} alt="505 Error" className="user-header-logo" />
            )}
          </a>

          <button
            className={`user-custom-toggler ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-controls="userNavbar"
            aria-expanded={menuOpen}
            aria-label={tUi(lang, "toggleNavigation")}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="user-custom-toggler-line" />
            <span className="user-custom-toggler-line" />
            <span className="user-custom-toggler-line" />
          </button>

          <div className={`user-custom-collapse ${menuOpen ? "is-open" : ""}`} id="userNavbar">
            <div className="user-top-links">
              <div className="user-shape-container">
                <img src={shapeBgUri} className="user-shape-bg" alt="" />

                <div className="user-shape-content">
                  <a className="user-profile-chip" href="/dashboard">
                    <span className="user-profile-chip-icon">
                      {finalAvatarUri && (
                        <img 
                          src={finalAvatarUri} 
                          alt="" 
                          style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} 
                        />
                      )}
                    </span>
                    <span className="user-profile-chip-name">{resolvedUserName}</span>
                  </a>

                  <a className="user-header-action-icon" href="/notifications" aria-label="Notifications">
                    <FiBell />
                  </a>

                  <a className="user-header-action-icon" href="/cart" aria-label="Cart">
                    <FiShoppingCart />
                    {cartCount > 0 && (
                      <span 
                        style={{ 
                          position: 'absolute', 
                          top: '-5px', 
                          right: '-5px', 
                          background: '#cf4aa4', 
                          color: '#fff', 
                          borderRadius: '50%', 
                          width: '16px', 
                          height: '16px', 
                          fontSize: '10px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </a>
                </div>
              </div>
            </div>

            <div className="user-lang-switch">
              <button
                type="button"
                className={`user-lang-ar ${isArabic ? "active" : ""}`}
                onClick={() => onLanguageChange?.("ar")}
              >
                {t.arabicLabel}
              </button>

              <button
                type="button"
                className={`user-lang-en ${!isArabic ? "active" : ""}`}
                onClick={() => onLanguageChange?.("en")}
              >
                {t.englishLabel}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="user-bottom-header">
        <div className="container-fluid user-bottom-header-inner">
          <div className="user-bottom-spacer" />

          <nav className={`user-main-menu ${menuOpen ? "is-open" : ""}`}>
            <a
              className={`user-main-menu-link ${currentPage === "home" ? "active" : ""}`}
              href="/"
            >
              {t.home}
            </a>

            <a
              className={`user-main-menu-link ${currentPage === "categories" ? "active" : ""}`}
              href="/categories"
            >
              {t.categories}
            </a>

            <a
              className={`user-main-menu-link ${currentPage === "creators" ? "active" : ""}`}
              href="/creators"
            >
              {t.creators}
            </a>

            <a
              className={`user-main-menu-link ${currentPage === "shop" ? "active" : ""}`}
              href="/shop"
            >
              {t.shop}
            </a>

            <a
              className={`user-main-menu-link ${currentPage === "subscription" ? "active" : ""}`}
              href="/subscriptions"
            >
              {t.subscription}
            </a>
          </nav>

          <div className={`user-search-wrap ${menuOpen ? "is-open" : ""}`}>
            <form className="user-search-form" role="search">
              <input
                className="user-search-input"
                type="search"
                placeholder={t.search}
                style={{ backgroundImage: `url(${loopUri})` }}
                aria-label={t.search}
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}

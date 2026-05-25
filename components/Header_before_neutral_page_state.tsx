import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import "../app/Globals.css";

import headerBg from "../assets/images/header.png";
import logoMain from "../assets/images/logo-main.png";
import shapeBg from "../assets/images/shape.png";
import loop from "../assets/icons/loop.svg";

const assetUri = (asset: any): string =>
  typeof asset === "string" ? asset : asset?.uri ?? "";

export type Lang = "en" | "ar";
export type HeaderPage =
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
  },
};

export default function Header({
  lang = "en",
  onLanguageChange,
  currentPage = "home",
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const t = translations[lang];
  const isArabic = lang === "ar";

  const headerBgUri = assetUri(headerBg);
  const logoMainUri = assetUri(logoMain);
  const shapeBgUri = assetUri(shapeBg);
  const loopUri = assetUri(loop);

  return (
    <header
      className={`site-header ${isArabic ? "header-lang-ar" : "header-lang-en"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="top-header">
        <img src={headerBgUri} alt="" className="top-header-bg" />

        <div className="container-fluid header-inner">
          <a className="brand-wrap" href="/" onClick={closeMenu}>
            <img src={logoMainUri} alt="505 Error" className="header-logo" />
          </a>

          <button
            className={`custom-toggler ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-controls="navbarMain"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="custom-toggler-line" />
            <span className="custom-toggler-line" />
            <span className="custom-toggler-line" />
          </button>

          <div
            className={`custom-collapse ${menuOpen ? "is-open" : ""}`}
            id="navbarMain"
          >
            <div className="top-links">
              <div className="shape-container">
                <img src={shapeBgUri} className="shape-bg" alt="" />

                <div className="shape-content">
                  <a className="top-pill-link" href="#" onClick={closeMenu}>
                    <span>{t.becomeCreator}</span>
                  </a>

                  <a className="top-pill-link" href="#" onClick={closeMenu}>
                    <span>{t.joinReader}</span>
                  </a>

                  <a className="account-link" href="login" onClick={closeMenu}>
                    {t.alreadyAccount} <span>{t.login}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="lang-switch">
              <button
                type="button"
                className={`lang-ar ${isArabic ? "active" : ""}`}
                onClick={() => onLanguageChange?.("ar")}
              >
                {t.arabicLabel}
              </button>

              <button
                type="button"
                className={`lang-en ${!isArabic ? "active" : ""}`}
                onClick={() => onLanguageChange?.("en")}
              >
                {t.englishLabel}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-header">
        <div className="container-fluid bottom-header-inner">
          <div className="bottom-spacer" />

          <nav className={`main-menu ${menuOpen ? "is-open" : ""}`}>
            <a
              className={`main-menu-link ${currentPage === "home" ? "active" : ""}`}
              href="/"
              onClick={closeMenu}
            >
              {t.home}
            </a>

            <a
              className={`main-menu-link ${currentPage === "categories" ? "active" : ""}`}
              href="/categories"
              onClick={closeMenu}
            >
              {t.categories}
            </a>

            <a
              className={`main-menu-link ${currentPage === "creators" ? "active" : ""}`}
              href="/creators"
              onClick={closeMenu}
            >
              {t.creators}
            </a>

            <a
              className={`main-menu-link ${currentPage === "shop" ? "active" : ""}`}
              href="/shop"
              onClick={closeMenu}
            >
              {t.shop}
            </a>

            <a
              className={`main-menu-link ${currentPage === "subscription" ? "active" : ""}`}
              href="/subscription"
              onClick={closeMenu}
            >
              {t.subscription}
            </a>
          </nav>

          <div className={`search-wrap ${menuOpen ? "is-open" : ""}`}>
            <form className="search-form" role="search">
              <input
                className="search-input"
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

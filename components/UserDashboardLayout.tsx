import React, { useCallback, useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import Header, { type Lang } from "./Header";
import UserMenu, { type UserMenuItemKey } from "./UserMenu";
import SectionHeader from "./SectionHeader";
import { localizeLiteral, useArabicDomTranslator } from "./i18n";
import { logout } from "../services/authApi";
import pageBg from "../assets/images/background.png";
import mobileDashboardBg from "../assets/images/dashbaord/mobile.png";
import chipShape from "../assets/icons/chip-shape.svg";
import panelBorder from "../assets/images/dashboard-borders/panel.png";

const assetUri = (asset: any): string =>
  typeof asset === "string" ? asset : asset?.uri ?? "";

const pageBgUri = assetUri(pageBg);
const mobileDashboardBgUri = assetUri(mobileDashboardBg);
const chipShapeUri = assetUri(chipShape);
const panelBorderUri = assetUri(panelBorder);

const mobilePaneStorageKey = "dashboardMobilePane";

const isDashboardPaneViewport = () =>
  typeof window !== "undefined" && window.innerWidth <= 1025;

const dashboardInlineCss = `
  html,
  body,
  #root {
    min-height: 100%;
  }

  .dashboard-page {
    position: relative;
    min-height: 100vh;
    min-height: 100dvh;
    overflow-x: hidden;
  }

  .dashboard-page-content {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  @media only screen and (max-width: 1025px) {
    .dashboard-page {
      min-height: 100vh;
      min-height: 100dvh;
      background-image: var(--dashboard-mobile-bg);
      background-size: cover;
      background-position: center right;
      background-repeat: no-repeat;
      background-attachment: scroll;
    }

    .dashboard-page-content {
      min-height: 100vh;
      min-height: 100dvh;
      background-image: none !important;
      background-color: transparent !important;
    }

    .dashboard-shell,
    .dashboard-grid,
    .dashboard-menu-pane,
    .dashboard-panel,
    .user-menu {
      background-color: transparent !important;
    }
  }

  @media only screen and (min-width: 1026px) {
    .dashboard-page {
      background-image: none;
    }

    .dashboard-page-content {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
`;

type Props = {
  lang: Lang;
  onLanguageChange: (lang: Lang) => void;
  activeItem: UserMenuItemKey;
  title: string;
  children: React.ReactNode;
  panelClassName?: string;
  isCreator?: boolean;
};

export default function UserDashboardLayout({
  lang,
  onLanguageChange,
  activeItem,
  title,
  children,
  panelClassName = "",
  isCreator = false,
}: Props) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const menuPaneRef = useRef<HTMLDivElement | null>(null);
  const panelPaneRef = useRef<HTMLElement | null>(null);
  const [activePane, setActivePane] = useState<"menu" | "panel">("menu");
  useArabicDomTranslator(lang);

  const scrollPaneIntoView = useCallback((pane: "menu" | "panel") => {
    const target = pane === "menu" ? menuPaneRef.current : panelPaneRef.current;
    const grid = gridRef.current;

    setActivePane(pane);

    if (!target || !grid) return;

    requestAnimationFrame(() => {
      grid.scrollTo({
        left: pane === "menu" ? 0 : target.offsetLeft,
        behavior: "smooth",
      });

      target.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    });
  }, []);

const handleMenuNavigate = useCallback(
  async (itemKey: UserMenuItemKey) => {
    // Handle logout here
    if (itemKey === "logout") {
      await logout();
      window.location.href = "/login";
      return;
    }

    if (!isDashboardPaneViewport()) return;

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(mobilePaneStorageKey, "panel");
    }

    scrollPaneIntoView("panel");
  },
  [scrollPaneIntoView]
);

  const handleBackToMenu = useCallback(() => {
    if (!isDashboardPaneViewport()) return;

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(mobilePaneStorageKey, "menu");
    }

    scrollPaneIntoView("menu");
  }, [scrollPaneIntoView]);

  useEffect(() => {
    if (typeof window === "undefined" || !isDashboardPaneViewport()) return;

    const requestedPane = window.sessionStorage.getItem(mobilePaneStorageKey);

    if (requestedPane === "panel") {
      window.sessionStorage.removeItem(mobilePaneStorageKey);
      scrollPaneIntoView("panel");
    }
  }, [isCreator, scrollPaneIntoView]);

  return (
    <div
      className="dashboard-page"
      dir={lang === "ar" ? "rtl" : "ltr"}
      style={
        {
          "--dashboard-mobile-bg": `url(${mobileDashboardBgUri})`,
        } as React.CSSProperties
      }
    >
      <style>{dashboardInlineCss}</style>

      <div className="dashboard-noise" />

      <Header
        lang={lang}
        onLanguageChange={onLanguageChange}
        currentPage="none"
      />

      <main
        className="dashboard-page-content"
        style={{ backgroundImage: `url(${pageBgUri})` }}
      >
        <section className="dashboard-shell">
          <div
            ref={gridRef}
            className={`dashboard-grid dashboard-grid-reader ${
              isCreator ? "dashboard-grid-creator" : "dashboard-grid-normal"
            } is-${activePane}-pane`.trim()}
          >
            <div ref={menuPaneRef} className="dashboard-menu-pane">
              <UserMenu
                activeItem={activeItem}
                isCreator={isCreator}
                lang={lang}
                onLanguageChange={onLanguageChange}
                onMenuNavigate={handleMenuNavigate}
              />
            </div>

            <section
              ref={panelPaneRef}
              className={`dashboard-panel ${panelClassName}`.trim()}
              style={
                {
                  "--dashboard-panel-image": `url(${panelBorderUri})`,
                } as React.CSSProperties
              }
            >
              <button
                type="button"
                className="dashboard-mobile-back-menu"
                aria-label={lang === "ar" ? "العودة إلى القائمة" : "Back to menu"}
                onClick={handleBackToMenu}
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle
                    cx="12.5"
                    cy="12.5"
                    r="12"
                    transform="matrix(-1 0 0 1 25 0)"
                    fill="#1D1D1D"
                  />
                  <circle
                    cx="12.5"
                    cy="12.5"
                    r="12"
                    transform="matrix(-1 0 0 1 25 0)"
                    stroke="#F5F5F5"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.17793 13.3332L11.7645 20L12.5116 18.3336L10.432 12.5L12.5116 6.6664L11.7645 5L9.17793 11.6668C9.07887 11.8878 9.02322 12.1875 9.02322 12.5C9.02322 12.8125 9.07887 13.1122 9.17793 13.3332Z"
                    fill="#CC4699"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.6663 13.3332L15.2529 20L16 18.3336L13.9204 12.5L16 6.6664L15.2529 5L12.6663 11.6668C12.5673 11.8878 12.5116 12.1875 12.5116 12.5C12.5116 12.8125 12.5673 13.1122 12.6663 13.3332Z"
                    fill="#CC4699"
                  />
                </svg>
              </button>

              {title ? (
                <SectionHeader
                  title={localizeLiteral(lang, title)}
                  chipImage={chipShapeUri}
                  showButton={false}
                  lang={lang}
                />
              ) : null}

              <div className="dashboard-panel-body">{children}</div>
            </section>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
      <BackToTop />
    </div>
  );
}

import React from "react";
import "./Footer.css";
import footerTextureImg from "../assets/images/footer-1.png";
import footerColorImg from "../assets/images/Rectangle 36.png";
import logoImg from "../assets/images/logo.png";
import googlePlayImg from "../assets/images/google.png";
import appleStoreImg from "../assets/images/apple.png";
import contactIconImg from "../assets/images/dashbaord/icons/contact.png";
import gmailIconImg from "../assets/images/dashbaord/icons/gmail.png";
import facebookIconImg from "../assets/images/dashbaord/icons/facebook.png";
import instagramIconImg from "../assets/images/dashbaord/icons/instagram.png";
import xIconImg from "../assets/images/dashbaord/icons/x.png";
import tiktokIconImg from "../assets/images/dashbaord/icons/tiktok.png";
import linkedinIconImg from "../assets/images/dashbaord/icons/linkedin.png";
import youtubeIconImg from "../assets/images/dashbaord/icons/youtube.png";
import "../app/Globals.css";
import type { Lang } from "./Header";

type FooterProps = {
  lang?: Lang;
};

const translations = {
  en: {
    downloadApp: "Download App",
    menuPages: "Menu Pages",
    morePages: "More Pages",
    contactUs: "Contact Us",
    about: "About",
    faq: "FAQ",
    blog: "BLOG",
    subscription: "Subscription",
    privacyPolicy: "Privacy Policy",
    terms: "Terms & Conditions",
    refund: "Refund Policy",
  },
  ar: {
    downloadApp: "حمّل التطبيق",
    menuPages: "صفحات الموقع",
    morePages: "صفحات إضافية",
    contactUs: "تواصل معنا",
    about: "من نحن",
    faq: "الأسئلة الشائعة",
    blog: "المدونة",
    subscription: "الاشتراك",
    privacyPolicy: "سياسة الخصوصية",
    terms: "الشروط والأحكام",
    refund: "سياسة الاسترداد",
  },
};

const assetSrc = (asset: any): string => {
  if (!asset) return "";
  if (typeof asset === "string") return asset;
  if (asset?.src) return asset.src;
  if (asset?.uri) return asset.uri;
  if (asset?.default) return assetSrc(asset.default);
  return "";
};

export default function Footer({ lang = "ar" }: FooterProps) {
  const logoUri = assetSrc(logoImg);
  const googlePlayUri = assetSrc(googlePlayImg);
  const appleStoreUri = assetSrc(appleStoreImg);
  const contactIconUri = assetSrc(contactIconImg);
  const gmailIconUri = assetSrc(gmailIconImg);
  const facebookIconUri = assetSrc(facebookIconImg);
  const instagramIconUri = assetSrc(instagramIconImg);
  const xIconUri = assetSrc(xIconImg);
  const tiktokIconUri = assetSrc(tiktokIconImg);
  const linkedinIconUri = assetSrc(linkedinIconImg);
  const youtubeIconUri = assetSrc(youtubeIconImg);
  const footerTextureUri = assetSrc(footerTextureImg);
  const footerColorUri = assetSrc(footerColorImg);

  const socialLinks = [
    { label: "Facebook", icon: facebookIconUri },
    { label: "Instagram", icon: instagramIconUri },
    { label: "X", icon: xIconUri },
    { label: "TikTok", icon: tiktokIconUri },
    { label: "LinkedIn", icon: linkedinIconUri },
    { label: "YouTube", icon: youtubeIconUri },
  ];

  const t = translations[lang];
  const isArabic = lang === "ar";

  return (
    <footer
      className={`footer ${isArabic ? "footer-lang-ar" : "footer-lang-en"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="footer-bg-stack" aria-hidden="true">
        <img src={footerColorUri} alt="" className="footer-bg-image footer-bg-color" />
        <img src={footerTextureUri} alt="" className="footer-bg-image footer-bg-texture" />
      </div>

      <div className="footer-container">
        <div className="footer-col footer-brand-col">
          <div className="footer-logo-col">
            <img src={logoUri} alt="505 Error logo" className="footer-logo" />
          </div>

          <div className="footer-download-col">
            <h4 className="footer-title">{t.downloadApp}</h4>

            <a href="#" className="store-link">
              <img src={googlePlayUri} alt="Google Play" className="store-badge" />
            </a>

            <a href="#" className="store-link">
              <img src={appleStoreUri} alt="App Store" className="store-badge" />
            </a>
          </div>
        </div>

        <div className="footer-col footer-menu-col">
          <h4 className="footer-title">{t.menuPages}</h4>
          <a href="/about" className="footer-link">{t.about}</a>
          <a href="/faq" className="footer-link">{t.faq}</a>
          <a href="/blogs" className="footer-link">{t.blog}</a>
        </div>

        <div className="footer-col footer-more-col">
          <h4 className="footer-title">{t.morePages}</h4>
          <a href="/subscriptions" className="footer-link">{t.subscription}</a>
          <a href="/privacy-policy" className="footer-link">{t.privacyPolicy}</a>
          <a href="/terms-and-conditions" className="footer-link">{t.terms}</a>
          <a href="/refund-policy" className="footer-link">{t.refund}</a>
        </div>

        <div className="footer-col footer-contact-col">
          <h4 className="footer-title">{t.contactUs}</h4>

          <a href="tel:+97450570808" className="footer-contact-link">
            <span className="contact-icon"><img src={contactIconUri} alt="" /></span>
            <span>+974 50570808</span>
          </a>

          <a href="mailto:info@505error.com" className="footer-contact-link">
            <span className="contact-icon"><img src={gmailIconUri} alt="" /></span>
            <span>info@505error.com</span>
          </a>

          <div className="socials">
            {socialLinks.map((social) => (
              <a href="#" className="social-box" aria-label={social.label} key={social.label}>
                <img src={social.icon} alt="" className="social-icon-img" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

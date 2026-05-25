import React, { useEffect, useState } from "react";
import "./Login.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LineBreak from "../components/LineBreak";
import LineBreakMobile from "../components/LineBreakMobile";

import pageBg from "../assets/images/background-signin.png";
import pageBgRtl from "../assets/images/background-signin-rtl.png";
import mobileBg from "../assets/images/mobile-background.png";
import logoImg from "../assets/images/logo-main.png";
import signupPoster from "../assets/images/signup.png";
import inputBorderImg from "../assets/images/input-border.png";
import { usePersistedLang } from "../components/usePersistedLang";
import { clearAuthStorage, login } from "../services/authApi";

type LoginFormState = {
  email: string;
  password: string;
};

type FieldErrors = Partial<Record<keyof LoginFormState, string>>;

// ── Validation rules ──────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const assetUri = (asset: any): string =>
  typeof asset === "string"
    ? asset
    : asset?.src ?? asset?.uri ?? asset?.default?.src ?? asset?.default?.uri ?? "";

const pageBgUri     = assetUri(pageBg);
const pageBgRtlUri  = assetUri(pageBgRtl);
const mobileBgUri   = assetUri(mobileBg);
const logoImgUri    = assetUri(logoImg);
const signupPosterUri = assetUri(signupPoster);
const inputBorderUri  = assetUri(inputBorderImg);

const copy = {
  en: {
    pageTitle: "LOGIN",
    emailLabel: "Email Address*",
    emailPlaceholder: "Enter Your Email Address [e.g. Someone.one@gmail.com]",
    passwordLabel: "Password*",
    passwordPlaceholder: "Enter Your Password",
    forgotPassword: "Forget Password?",
    submit: "LOGIN",
    submitting: "LOGGING IN...",
    noAccount: "No Account Yet?",
    signupNow: "SIGN UP NOW",
    continueCreator: "CONTINUE AS A CREATOR",
    loginFailed: "Login failed. Please check your email and password.",
    posterAlt: "Become a member promo",
    // validation
    invalidEmail: "Please enter a valid email address.",
    passwordRequired: "Please enter your password.",
  },
  ar: {
    pageTitle: "تسجيل الدخول",
    emailLabel: "البريد الإلكتروني*",
    emailPlaceholder: "أدخل بريدك الإلكتروني [مثال: Someone.one@gmail.com]",
    passwordLabel: "كلمة المرور*",
    passwordPlaceholder: "أدخل كلمة المرور",
    forgotPassword: "هل نسيت كلمة المرور؟",
    submit: "تسجيل الدخول",
    submitting: "جارٍ الدخول...",
    noAccount: "ليس لديك حساب؟",
    signupNow: "سجّل الآن",
    continueCreator: "المتابعة كمنشئ",
    loginFailed: "فشل تسجيل الدخول. يرجى التحقق من البريد وكلمة المرور.",
    posterAlt: "عرض الانضمام كعضو",
    // validation
    invalidEmail: "يرجى إدخال بريد إلكتروني صحيح.",
    passwordRequired: "يرجى إدخال كلمة المرور.",
  },
};

export default function LoginPage() {
  const [lang, setLang] = usePersistedLang("ar");
  const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [isMobile, setIsMobile]   = useState(false);
  const [mounted, setMounted]     = useState(false);
  const [langReady, setLangReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isArabic = lang === "ar";
  const t = copy[lang];

  useEffect(() => { setLangReady(true); }, []);

  useEffect(() => {
    clearAuthStorage();
  }, []);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth <= 991);
    checkViewport();
    setMounted(true);
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.body.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, lang]);

  const handleChange =
    (field: keyof LoginFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
      setServerError("");
    };

  const validate = (): boolean => {
    const errors: FieldErrors = {};
    if (!EMAIL_REGEX.test(form.email.trim())) errors.email = t.invalidEmail;
    if (!form.password.trim()) errors.password = t.passwordRequired;
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

try {
  setSubmitting(true);
  await login({ email: form.email.trim(), password: form.password });
  window.location.href = "/"; // success → home, no status check
} catch (error: any) {
  const responseData = error?.response?.data;
  const msg = String(responseData?.message || "").toLowerCase();

  if (
    msg.includes("inactive") ||
    msg.includes("verify") ||
    error?.isInactive
  ) {
    window.location.href = `/verify-code?email=${encodeURIComponent(form.email.trim())}`;
    return;
  }

  setServerError(responseData?.message || t.loginFailed);
} finally {
  setSubmitting(false);
}
  };

  if (!langReady) {
    return (
      <div
        className="login-page login-lang-loading"
        style={{ backgroundImage: `url(${pageBgUri})` }}
      />
    );
  }

  return (
    <div
      className={`login-page ${isArabic ? "login-lang-ar" : "login-lang-en"}`}
      dir={isArabic ? "rtl" : "ltr"}
      style={{
        backgroundImage: !mounted
          ? undefined
          : isMobile
          ? `url(${mobileBgUri})`
          : isArabic
          ? `url(${pageBgRtlUri})`
          : `url(${pageBgUri})`,
      }}
    >
      <div className="login-noise" />

      <Header lang={lang} onLanguageChange={setLang} currentPage="none" />

      <main className="login-shell">
        <section className="login-left">
          <div className="login-poster">
            <img src={signupPosterUri} alt={t.posterAlt} className="login-poster-image" />
          </div>
        </section>

        <section className="login-right">
          <div className="login-brand">
            <a href="/" className="login-logo-link">
              <img src={logoImgUri} alt="505 Error" className="login-logo" />
            </a>
          </div>

          {serverError && (
            <div className="login-alert login-alert-error">
              <span>{serverError}</span>
            </div>
          )}

          <p className="login-alert-subtext">{t.pageTitle}</p>

          <form className="login-form" onSubmit={handleSubmit}>

            {/* Email */}
            <div className="login-field">
              <label htmlFor="email">{t.emailLabel}</label>
              <div className={`login-input-frame${fieldErrors.email ? " login-input-error" : ""}`}>
                <input
                  id="email"
                  type="text"
                  placeholder={t.emailPlaceholder}
                  value={form.email}
                  onChange={handleChange("email")}
                />
                <img src={inputBorderUri} alt="" aria-hidden="true" className="login-input-border-image" />
              </div>
              {fieldErrors.email && <span className="login-field-error">{fieldErrors.email}</span>}
            </div>

            {/* Password */}
            <div className="login-field">
              <label htmlFor="password">{t.passwordLabel}</label>
              <div className={`login-input-frame${fieldErrors.password ? " login-input-error" : ""}`}>
                <input
                  id="password"
                  type="password"
                  placeholder={t.passwordPlaceholder}
                  value={form.password}
                  onChange={handleChange("password")}
                />
                <img src={inputBorderUri} alt="" aria-hidden="true" className="login-input-border-image" />
              </div>
              {fieldErrors.password && <span className="login-field-error">{fieldErrors.password}</span>}
            </div>

            <div className="login-forgot-wrap">
              <a href="/ForgotPassword" className="login-forgot-link">
                {t.forgotPassword}
              </a>
            </div>

            <div className="login-submit-wrap">
              <button type="submit" className="login-submit" disabled={submitting}>
                {submitting ? t.submitting : t.submit}
              </button>
            </div>

            <div className="login-bottom">
              <LineBreak />
              <div className="login-footer-links">
                <a href="/signup?user_type=reader" className="login-signup-link">
                  {t.noAccount}{" "}
                  <span className="login-signup-link-2">{t.signupNow}</span>
                </a>
                <LineBreakMobile />
                <a href="/signup?user_type=creator" className="signup-creator-link">
                  {t.continueCreator}
                </a>
              </div>
            </div>
          </form>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}

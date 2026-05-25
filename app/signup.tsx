import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
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
import { clearAuthStorage, normalizeSignupUserType, register, type SignupUserType } from "../services/authApi";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

// ── Validation rules ──────────────────────────────────────────
const EMAIL_REGEX    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
const NAME_REGEX     = /^.{2,}$/; // at least 2 chars

const assetUri = (asset: any): string =>
  typeof asset === "string"
    ? asset
    : asset?.src ?? asset?.uri ?? asset?.default?.src ?? asset?.default?.uri ?? "";

const pageBgUri      = assetUri(pageBg);
const pageBgRtlUri   = assetUri(pageBgRtl);
const mobileBgUri    = assetUri(mobileBg);
const logoImgUri     = assetUri(logoImg);
const signupPosterUri = assetUri(signupPoster);
const inputBorderUri  = assetUri(inputBorderImg);

const copy = {
  en: {
    pageTitle: "SIGN UP NOW",
    firstNameLabel: "First Name*",
    firstNamePlaceholder: "Enter Your First Name Here [eg. Ahmed]",
    lastNameLabel: "Last Name*",
    lastNamePlaceholder: "Enter Your Last Name Here [eg. Ahmed]",
    emailLabel: "Email Address*",
    emailPlaceholder: "Enter Your Email Address [e.g. Someone.one@gmail.com]",
    passwordLabel: "Password*",
    passwordPlaceholder: "Enter Your Password",
    confirmPasswordLabel: "Confirm Password*",
    confirmPasswordPlaceholder: "Confirm Your Password",
    submit: "REGISTER",
    alreadyAccount: "Already have an account?",
    login: "LOGIN",
    becomeCreator: "BECOME A CREATOR",
    joinReader: "JOIN AS A READER",
    posterAlt: "Become a member promo",
    // validation messages
    firstNameRequired: "First name must be at least 2 characters.",
    lastNameRequired: "Last name must be at least 2 characters.",
    invalidEmail: "Please enter a valid email address.",
    weakPassword: "Password must be at least 8 characters with letters, numbers, and symbols.",
    passwordMismatch: "Passwords do not match.",
    signupFailed: "Registration failed. Please check the form and try again.",
  },
  ar: {
    pageTitle: "سجّل الآن",
    firstNameLabel: "الاسم الأول*",
    firstNamePlaceholder: "أدخل اسمك الأول [مثال: أحمد]",
    lastNameLabel: "اسم العائلة*",
    lastNamePlaceholder: "أدخل اسم العائلة [مثال: أحمد]",
    emailLabel: "البريد الإلكتروني*",
    emailPlaceholder: "أدخل بريدك الإلكتروني [مثال: Someone.one@gmail.com]",
    passwordLabel: "كلمة المرور*",
    passwordPlaceholder: "أدخل كلمة المرور",
    confirmPasswordLabel: "تأكيد كلمة المرور*",
    confirmPasswordPlaceholder: "أعد إدخال كلمة المرور",
    submit: "تسجيل",
    alreadyAccount: "لديك حساب بالفعل؟",
    login: "تسجيل الدخول",
    becomeCreator: "المتابعة كمنشئ",
    joinReader: "الانضمام كقارئ",
    posterAlt: "عرض الانضمام كعضو",
    // validation messages
    firstNameRequired: "يجب أن يكون الاسم الأول حرفين على الأقل.",
    lastNameRequired: "يجب أن يكون اسم العائلة حرفين على الأقل.",
    invalidEmail: "يرجى إدخال بريد إلكتروني صحيح.",
    weakPassword: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل وتحتوي على حروف وأرقام ورموز.",
    passwordMismatch: "كلمتا المرور غير متطابقتين.",
    signupFailed: "فشل التسجيل. يرجى مراجعة البيانات والمحاولة مرة أخرى.",
  },
};

export default function SignUpPage() {
  const [lang, setLang] = usePersistedLang("ar");

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [isMobile, setIsMobile]     = useState(false);
  const [mounted, setMounted]       = useState(false);
  const [langReady, setLangReady]   = useState(false);
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
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
      setServerError("");
    };

  // ── Client-side validation ────────────────────────────────
  const validate = (): boolean => {
    const errors: FieldErrors = {};

    if (!NAME_REGEX.test(form.firstName.trim()))
      errors.firstName = t.firstNameRequired;

    if (!NAME_REGEX.test(form.lastName.trim()))
      errors.lastName = t.lastNameRequired;

    if (!EMAIL_REGEX.test(form.email.trim()))
      errors.email = t.invalidEmail;

    if (!PASSWORD_REGEX.test(form.password))
      errors.password = t.weakPassword;

    if (form.password !== form.confirmPassword)
      errors.confirmPassword = t.passwordMismatch;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getUserType = (): SignupUserType => {
    const params = new URLSearchParams(window.location.search);
    return normalizeSignupUserType(params.get("user_type"));
  };
  const userType = getUserType();
  const alternateSignupHref = userType === "creator" ? "/signup?user_type=reader" : "/signup?user_type=creator";
  const alternateSignupLabel = userType === "creator" ? t.joinReader : t.becomeCreator;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

  try {
    setSubmitting(true);
    await register({ ...form, type: userType });
    window.location.href = "/login";
  } catch (error: any) {
    const responseData = error?.response?.data;
    if (responseData?.errors) {
    const mapped: FieldErrors = {};
    const e = responseData.errors;
    if (e.first_name?.[0])            mapped.firstName       = e.first_name[0];
    if (e.last_name?.[0])             mapped.lastName        = e.last_name[0];
    if (e.email?.[0])                 mapped.email           = e.email[0];
    if (e.password?.[0])              mapped.password        = e.password[0];
    if (e.password_confirmation?.[0]) mapped.confirmPassword = e.password_confirmation[0];
    setFieldErrors(mapped);
  } else {
    setServerError(responseData?.message || t.signupFailed);
  }
} finally {
  setSubmitting(false);
}
  };

  if (!langReady) {
    return <div className="signup-page signup-lang-loading" />;
  }

  return (
    <div
      className={`signup-page ${isArabic ? "signup-lang-ar" : "signup-lang-en"}`}
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
      <div className="signup-noise" />

      <Header lang={lang} onLanguageChange={setLang} currentPage="none" />

      <main className="signup-shell">
        <section className="signup-left">
          <div className="signup-poster">
            <img src={signupPosterUri} alt={t.posterAlt} className="signup-poster-image" />
          </div>
        </section>

        <section className="signup-right">
          <div className="signup-brand">
            <a href="/" className="signup-logo-link">
              <img src={logoImgUri} alt="505 Error" className="signup-logo" />
            </a>
          </div>

          {serverError && (
            <div className="signup-alert signup-alert-error">
              <span>{serverError}</span>
            </div>
          )}

          <p className="signup-title">{t.pageTitle}</p>

          <form className="signup-form" onSubmit={handleSubmit}>

            {/* First + Last name row */}
            <div className="signup-row signup-row-two">
              <div className="signup-field">
                <label htmlFor="firstName">{t.firstNameLabel}</label>
                <div className={`signup-input-frame${fieldErrors.firstName ? " signup-input-error" : ""}`}>
                  <input
                    id="firstName"
                    type="text"
                    placeholder={t.firstNamePlaceholder}
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                  />
                  <img src={inputBorderUri} alt="" aria-hidden="true" className="signup-input-border-image" />
                </div>
                {fieldErrors.firstName && <span className="signup-field-error">{fieldErrors.firstName}</span>}
              </div>

              <div className="signup-field">
                <label htmlFor="lastName">{t.lastNameLabel}</label>
                <div className={`signup-input-frame${fieldErrors.lastName ? " signup-input-error" : ""}`}>
                  <input
                    id="lastName"
                    type="text"
                    placeholder={t.lastNamePlaceholder}
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                  />
                  <img src={inputBorderUri} alt="" aria-hidden="true" className="signup-input-border-image" />
                </div>
                {fieldErrors.lastName && <span className="signup-field-error">{fieldErrors.lastName}</span>}
              </div>
            </div>

            {/* Email */}
            <div className="signup-field">
              <label htmlFor="email">{t.emailLabel}</label>
              <div className={`signup-input-frame${fieldErrors.email ? " signup-input-error" : ""}`}>
                <input
                  id="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={form.email}
                  onChange={handleChange("email")}
                />
                <img src={inputBorderUri} alt="" aria-hidden="true" className="signup-input-border-image" />
              </div>
              {fieldErrors.email && <span className="signup-field-error">{fieldErrors.email}</span>}
            </div>

            {/* Password */}
            <div className="signup-field">
              <label htmlFor="password">{t.passwordLabel}</label>
              <div className={`signup-input-frame${fieldErrors.password ? " signup-input-error" : ""}`}>
                <input
                  id="password"
                  type="password"
                  placeholder={t.passwordPlaceholder}
                  value={form.password}
                  onChange={handleChange("password")}
                />
                <img src={inputBorderUri} alt="" aria-hidden="true" className="signup-input-border-image" />
              </div>
              {fieldErrors.password
                ? <span className="signup-field-error">{fieldErrors.password}</span>
                : <p className="signup-hint">{t.weakPassword}</p>
              }
            </div>

            {/* Confirm Password */}
            <div className="signup-field">
              <label htmlFor="confirmPassword">{t.confirmPasswordLabel}</label>
              <div className={`signup-input-frame${fieldErrors.confirmPassword ? " signup-input-error" : ""}`}>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder={t.confirmPasswordPlaceholder}
                  value={form.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                />
                <img src={inputBorderUri} alt="" aria-hidden="true" className="signup-input-border-image" />
              </div>
              {fieldErrors.confirmPassword && (
                <span className="signup-field-error">{fieldErrors.confirmPassword}</span>
              )}
            </div>

            <div className="signup-bottom">
              <div className="signup-actions">
                <button type="submit" className="signup-submit" disabled={submitting}>
                  {t.submit}
                </button>
              </div>

              <LineBreak />

              <div className="signup-footer-links">
                <a href="/login" className="signup-login-link">
                  {t.alreadyAccount}{" "}
                  <span className="signup-login-link-2">{t.login}</span>
                </a>
                <LineBreakMobile />
                <a href={alternateSignupHref} className="signup-creator-link">
                  {alternateSignupLabel}
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

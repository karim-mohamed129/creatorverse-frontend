import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Globals.css";
import "./BlogInner.css";

import Header, { type Lang } from "../components/Header";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import SectionHeader from "../components/SectionHeader";
import CommentSystem from "../components/CommentSystem";
import type { BlogItem } from "../components/BlogCard";
import { usePersistedLang } from "../components/usePersistedLang";
import chipShape from "../assets/icons/chip-shape.svg";
import arrowMobile from "../assets/icons/arrow-mobile.svg";
import articleBorder from "../assets/images/dashboard-borders/blog.png";
import sidebarBorder from "../assets/images/dashboard-borders/sidebar.png";

import avatar1 from "../assets/images/avatars/1.png";

import blogImage1 from "../assets/images/home/21.png";
import blogImage2 from "../assets/images/home/21.png";
import blogImage3 from "../assets/images/home/21.png";
import blogImage4 from "../assets/images/home/21.png";
import blogImage5 from "../assets/images/home/21.png";

import mainImage from "../assets/images/home/20.png";
import relatedImage2 from "../assets/images/home/22.png";


const assetUri = (asset: any): string =>
  typeof asset === "string" ? asset : asset?.uri ?? "";

const chipShapeUri = assetUri(chipShape);
const arrowMobileUri = assetUri(arrowMobile);
const articleBorderUri = assetUri(articleBorder);
const sidebarBorderUri = assetUri(sidebarBorder);
const avatarUri = assetUri(avatar1);

const blog1Uri = assetUri(blogImage1);
const blog2Uri = assetUri(blogImage2);
const blog3Uri = assetUri(blogImage3);
const blog4Uri = assetUri(blogImage4);
const blog5Uri = assetUri(blogImage5);

const mainImageUri = assetUri(mainImage);
const relatedImage2Uri = assetUri(relatedImage2);


const latestBlogs = [
  blog1Uri,
  blog2Uri,
  blog3Uri,
  blog4Uri,
  blog5Uri,
  blog1Uri,
  blog2Uri,
  blog3Uri,
  blog4Uri,
  blog5Uri,
].map((image, index) => ({
  id: `latest-blog-${index + 1}`,
  image,
  title: "BLOG NAME",
  date: "26 SEP 2026",
}));

const relatedBlogs: BlogItem[] = [
  {
    id: "related-1",
    image: mainImageUri,
    title: "BLOG NAME",
    date: "26 SEP 2026",
    excerpt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard.",
  },
  {
    id: "related-2",
    image: blog2Uri,
    title: "BLOG NAME",
    date: "26 SEP 2026",
    excerpt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard.",
  },
  {
    id: "related-3",
    image: relatedImage2Uri,
    title: "BLOG NAME",
    date: "26 SEP 2026",
    excerpt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard.",
  },
];

const comments = [
  {
    id: "review-1",
    name: "Name",
    meta: "Arab Creation Fan 24-10-2024",
    date: "15 . Oct 2025",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    avatar: avatarUri,
    actions: [
      { id: "like", label: "Like", count: 40 },
      { id: "report", label: "Report" },
    ],
  },
  {
    id: "review-2",
    name: "Name",
    meta: "Arab Creation Fan 24-10-2024",
    date: "15 . Oct 2025",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    avatar: avatarUri,
    actions: [
      { id: "like", label: "Like", count: 40 },
      { id: "report", label: "Report" },
    ],
  },
  {
    id: "review-3",
    name: "Name",
    meta: "Arab Creation Fan 24-10-2024",
    date: "15 . Oct 2025",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    avatar: avatarUri,
    actions: [
      { id: "like", label: "Like", count: 40 },
      { id: "report", label: "Report" },
    ],
  },
  {
    id: "review-4",
    name: "Name",
    meta: "Arab Creation Fan 24-10-2024",
    date: "15 . Oct 2025",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    avatar: avatarUri,
    actions: [
      { id: "like", label: "Like", count: 40 },
      { id: "report", label: "Report" },
    ],
  },
  {
    id: "review-5",
    name: "Name",
    meta: "Arab Creation Fan 24-10-2024",
    date: "15 . Oct 2025",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    avatar: avatarUri,
    actions: [
      { id: "like", label: "Like", count: 40 },
      { id: "report", label: "Report" },
    ],
  },
];

const articleCopy = {
  en:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industrys standard dummy text ever Lorem Ipsum is simply dummy text of the printing and",
  ar:
    "هذا نص تجريبي لمقال المدونة ويمكن استبداله بالمحتوى الحقيقي لاحقًا. يستخدم هذا النص لاختبار اتجاه القراءة العربي ومحاذاة الفقرة داخل صفحة تفاصيل المقال. هذا نص تجريبي لمقال المدونة ويمكن استبداله بالمحتوى الحقيقي لاحقًا. يستخدم هذا النص لاختبار اتجاه القراءة العربي ومحاذاة الفقرة داخل صفحة تفاصيل المقال. هذا نص تجريبي لمقال المدونة ويمكن استبداله بالمحتوى الحقيقي لاحقًا. يستخدم هذا النص لاختبار اتجاه القراءة العربي ومحاذاة الفقرة داخل صفحة تفاصيل المقال.",
};

const blogInnerCopy = {
  en: {
    blogs: "BLOGS",
    blogName: "Blog Name",
    blogTitle: "BLOG NAME",
    latestBlogs: "LATEST BLOGS",
    readMore: "Read More",
    date: "26 SEP 2026",
    reviews: "REVIEWS",
    leaveReview: "LEAVE A REVIEW!",
    submit: "SUBMIT",
    placeholder: "Write Here.........",
    youMayAlsoLike: "YOU MAY ALSO LIKE",
  },
  ar: {
    blogs: "المدونة",
    blogName: "اسم المقال",
    blogTitle: "اسم المقال",
    latestBlogs: "أحدث المقالات",
    readMore: "اقرأ المزيد",
    date: "٢٦ سبتمبر ٢٠٢٦",
    reviews: "المراجعات",
    leaveReview: "اترك مراجعة",
    submit: "إرسال",
    placeholder: "اكتب هنا.........",
    youMayAlsoLike: "قد يعجبك أيضًا",
  },
};

function BreadcrumbArrow() {
  return (
    <svg width="11" height="23" viewBox="0 0 11 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M10.3923 10.1559L6.45209 9.53674e-05L5.31396 2.53858L8.4819 11.4251L5.31396 20.3116L6.45209 22.8501L10.3923 12.6943C10.5432 12.3577 10.6279 11.9011 10.6279 11.4251C10.6279 10.9491 10.5432 10.4925 10.3923 10.1559Z" fill="#1BC6BD"/>
<path fillRule="evenodd" clipRule="evenodd" d="M5.07829 10.1559L1.13813 9.53674e-05L0 2.53858L3.16793 11.4251L0 20.3116L1.13813 22.8501L5.07829 12.6943C5.22919 12.3577 5.31395 11.9011 5.31395 11.4251C5.31395 10.9491 5.22919 10.4925 5.07829 10.1559Z" fill="#1BC6BD"/>
</svg>

  );
}

function SidebarBlogCard({
  image,
  title,
  date,
  lang,
}: {
  image: string;
  title: string;
  date: string;
  lang: Lang;
}) {
  const isArabic = lang === "ar";
  const t = blogInnerCopy[lang];

  return (
    <a
      href="/blog-inner"
      className="blog-inner-sidebar-card"
      dir={isArabic ? "rtl" : "ltr"}
      style={{ backgroundImage: `url(${sidebarBorderUri})` }}
    >
      <div className="blog-inner-sidebar-thumb-wrap">
        <img src={image} alt={title} className="blog-inner-sidebar-image" />
      </div>

      <div className="blog-inner-sidebar-panel">
        <h3>{title}</h3>
        <p>{date}</p>

        <div className="blog-inner-read-row">
          <span className="blog-inner-read-more">{t.readMore}</span>
          <span className="blog-inner-read-arrow" aria-hidden="true">»</span>
        </div>
      </div>
    </a>
  );
}

function LatestBlogsSidebar({ lang }: { lang: Lang }) {
  const t = blogInnerCopy[lang];
  const isArabic = lang === "ar";

  return (
    <aside className="blog-inner-sidebar" dir={isArabic ? "rtl" : "ltr"}>
      <div className="blog-inner-sidebar-heading">
        <span className="blog-inner-sidebar-heading-label">{t.latestBlogs}</span>
       <svg width="408" height="92" viewBox="0 0 408 92" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="373" y1="43.8921" x2="408" y2="43.8921" stroke="url(#paint0_linear_0_1)" stroke-width="4"/>
<line y1="-2" x2="35" y2="-2" transform="matrix(-1 0 0 1 35 48.8921)" stroke="url(#paint1_linear_0_1)" stroke-width="4"/>
<path d="M138.762 39.1812L135.844 52.9155C135.828 53.0093 135.844 53.0874 135.891 53.1499C135.938 53.2124 136.004 53.2437 136.09 53.2437H140.602L140.039 55.8921H134.941C134.535 55.8921 134.172 55.8179 133.852 55.6694C133.531 55.5132 133.262 55.3022 133.043 55.0366C132.832 54.7632 132.688 54.4507 132.609 54.0991C132.531 53.7397 132.535 53.3569 132.621 52.9507L135.551 39.1812H138.762ZM157.629 39.1812L154.066 55.8921H150.867L151.43 53.2437H145.664L144.387 55.8921H141.188L147.82 42.0757C148.102 41.4976 148.469 40.9937 148.922 40.564C149.383 40.1265 149.895 39.7866 150.457 39.5444C151.02 39.3022 151.598 39.1812 152.191 39.1812H157.629ZM146.941 50.5952H151.992L153.855 41.8413H152.906C152.555 41.8413 152.211 41.9116 151.875 42.0522C151.547 42.1929 151.25 42.3921 150.984 42.6499C150.719 42.8999 150.5 43.1929 150.328 43.5288L146.941 50.5952ZM159.035 39.1812C162.723 39.1812 166.406 39.1812 170.086 39.1812L169.512 41.8413H165.598L162.621 55.8921H159.41L162.398 41.8413H158.473L159.035 39.1812ZM173.988 39.1812H181.57L181.008 41.8413H174.012C173.918 41.8413 173.832 41.8726 173.754 41.9351C173.676 41.9976 173.629 42.0718 173.613 42.1577L172.746 46.2124H178.172L177.609 48.8608H172.184L171.328 52.9155C171.305 53.0093 171.316 53.0874 171.363 53.1499C171.418 53.2124 171.492 53.2437 171.586 53.2437H178.582L178.02 55.8921H170.438C170.031 55.8921 169.664 55.8179 169.336 55.6694C169.008 55.5132 168.738 55.3022 168.527 55.0366C168.316 54.7632 168.172 54.4507 168.094 54.0991C168.016 53.7397 168.02 53.3569 168.105 52.9507L170.402 42.146C170.488 41.7397 170.645 41.3569 170.871 40.9976C171.105 40.6382 171.387 40.3257 171.715 40.0601C172.043 39.7866 172.402 39.5718 172.793 39.4155C173.184 39.2593 173.582 39.1812 173.988 39.1812ZM188.238 51.8257C188.434 50.9351 187.379 49.5874 185.074 47.7827C182.777 45.978 181.75 44.5054 181.992 43.3647L182.262 42.146C182.348 41.7397 182.504 41.3569 182.73 40.9976C182.957 40.6382 183.234 40.3257 183.562 40.0601C183.891 39.7866 184.25 39.5718 184.641 39.4155C185.031 39.2593 185.43 39.1812 185.836 39.1812H191.191C191.598 39.1812 191.961 39.2593 192.281 39.4155C192.609 39.5718 192.879 39.7866 193.09 40.0601C193.301 40.3257 193.445 40.6382 193.523 40.9976C193.602 41.3569 193.598 41.7397 193.512 42.146L193.16 43.7866H189.949L190.301 42.1577C190.316 42.0718 190.297 41.9976 190.242 41.9351C190.195 41.8726 190.129 41.8413 190.043 41.8413H185.859C185.766 41.8413 185.68 41.8726 185.602 41.9351C185.523 41.9976 185.477 42.0718 185.461 42.1577L185.391 42.4858C185.211 43.353 186.266 44.7046 188.555 46.5405C190.844 48.3687 191.871 49.8335 191.637 50.9351L191.215 52.9507C191.129 53.3569 190.969 53.7397 190.734 54.0991C190.508 54.4507 190.23 54.7632 189.902 55.0366C189.574 55.3022 189.215 55.5132 188.824 55.6694C188.441 55.8179 188.047 55.8921 187.641 55.8921H182.285C181.879 55.8921 181.512 55.8179 181.184 55.6694C180.863 55.5132 180.594 55.3022 180.375 55.0366C180.164 54.7632 180.02 54.4507 179.941 54.0991C179.871 53.7397 179.879 53.3569 179.965 52.9507L180.457 50.5952H183.668L183.176 52.9155C183.152 53.0093 183.164 53.0874 183.211 53.1499C183.266 53.2124 183.34 53.2437 183.434 53.2437H187.617C187.703 53.2437 187.785 53.2124 187.863 53.1499C187.941 53.0874 187.992 53.0093 188.016 52.9155L188.238 51.8257ZM195.082 39.1812C198.77 39.1812 202.453 39.1812 206.133 39.1812L205.559 41.8413H201.645L198.668 55.8921H195.457L198.445 41.8413H194.52L195.082 39.1812ZM210.141 55.8921L213.691 39.1812H216.902V39.1929H222.914C224.367 39.1694 225.219 39.6577 225.469 40.6577C225.719 41.6577 225.348 42.6421 224.355 43.6108L220.359 47.5483L222.68 51.4741C223.266 52.4429 223.219 53.4272 222.539 54.4272C221.859 55.4272 220.801 55.9155 219.363 55.8921H210.141ZM216.34 41.853L213.914 53.2319H218.449C219.309 53.2319 219.512 52.8804 219.059 52.1772L216.891 48.7202C216.609 48.2749 216.5 47.8843 216.562 47.5483L216.574 47.5366C216.645 47.2085 216.918 46.8218 217.395 46.3765L221.039 42.9077C221.789 42.2046 221.734 41.853 220.875 41.853H216.34ZM230.543 39.1812L227.625 52.9155C227.609 53.0093 227.625 53.0874 227.672 53.1499C227.719 53.2124 227.785 53.2437 227.871 53.2437H232.383L231.82 55.8921H226.723C226.316 55.8921 225.953 55.8179 225.633 55.6694C225.312 55.5132 225.043 55.3022 224.824 55.0366C224.613 54.7632 224.469 54.4507 224.391 54.0991C224.312 53.7397 224.316 53.3569 224.402 52.9507L227.332 39.1812H230.543ZM239.391 39.1812H244.746C245.152 39.1812 245.516 39.2593 245.836 39.4155C246.164 39.5718 246.434 39.7866 246.645 40.0601C246.855 40.3257 247 40.6382 247.078 40.9976C247.156 41.3569 247.152 41.7397 247.066 42.146L244.77 52.9507C244.684 53.3569 244.523 53.7397 244.289 54.0991C244.062 54.4507 243.785 54.7632 243.457 55.0366C243.137 55.3022 242.781 55.5132 242.391 55.6694C242 55.8179 241.602 55.8921 241.195 55.8921H235.84C235.434 55.8921 235.066 55.8179 234.738 55.6694C234.418 55.5132 234.152 55.3022 233.941 55.0366C233.73 54.7632 233.586 54.4507 233.508 54.0991C233.43 53.7397 233.434 53.3569 233.52 52.9507L235.816 42.146C235.902 41.7397 236.059 41.3569 236.285 40.9976C236.52 40.6382 236.801 40.3257 237.129 40.0601C237.457 39.7866 237.812 39.5718 238.195 39.4155C238.586 39.2593 238.984 39.1812 239.391 39.1812ZM243.844 42.1577C243.867 42.0718 243.852 41.9976 243.797 41.9351C243.75 41.8726 243.684 41.8413 243.598 41.8413H239.414C239.328 41.8413 239.246 41.8726 239.168 41.9351C239.09 41.9976 239.039 42.0718 239.016 42.1577L236.73 52.9155C236.715 53.0093 236.73 53.0874 236.777 53.1499C236.832 53.2124 236.902 53.2437 236.988 53.2437H241.172C241.258 53.2437 241.34 53.2124 241.418 53.1499C241.496 53.0874 241.543 53.0093 241.559 52.9155L243.844 42.1577ZM257.531 39.1812C257.93 39.1812 258.289 39.2593 258.609 39.4155C258.938 39.5718 259.207 39.7866 259.418 40.0601C259.637 40.3257 259.781 40.6382 259.852 40.9976C259.93 41.3569 259.926 41.7397 259.84 42.146L259.5 43.7866H256.289L256.629 42.1577C256.645 42.0718 256.629 41.9976 256.582 41.9351C256.535 41.8726 256.465 41.8413 256.371 41.8413H252.188C252.102 41.8413 252.02 41.8726 251.941 41.9351C251.863 41.9976 251.816 42.0718 251.801 42.1577L249.516 52.9155C249.492 53.0093 249.504 53.0874 249.551 53.1499C249.605 53.2124 249.676 53.2437 249.762 53.2437H254.273L255.199 48.8843H253.008L253.57 46.2358H258.973L256.922 55.8921H248.613C248.215 55.8921 247.852 55.8179 247.523 55.6694C247.195 55.5132 246.926 55.3022 246.715 55.0366C246.504 54.7632 246.359 54.4507 246.281 54.0991C246.203 53.7397 246.207 53.3569 246.293 52.9507L248.59 42.146C248.676 41.7397 248.832 41.3569 249.059 40.9976C249.293 40.6382 249.574 40.3257 249.902 40.0601C250.23 39.7866 250.59 39.5718 250.98 39.4155C251.371 39.2593 251.766 39.1812 252.164 39.1812H257.531ZM267.316 51.8257C267.512 50.9351 266.457 49.5874 264.152 47.7827C261.855 45.978 260.828 44.5054 261.07 43.3647L261.34 42.146C261.426 41.7397 261.582 41.3569 261.809 40.9976C262.035 40.6382 262.312 40.3257 262.641 40.0601C262.969 39.7866 263.328 39.5718 263.719 39.4155C264.109 39.2593 264.508 39.1812 264.914 39.1812H270.27C270.676 39.1812 271.039 39.2593 271.359 39.4155C271.688 39.5718 271.957 39.7866 272.168 40.0601C272.379 40.3257 272.523 40.6382 272.602 40.9976C272.68 41.3569 272.676 41.7397 272.59 42.146L272.238 43.7866H269.027L269.379 42.1577C269.395 42.0718 269.375 41.9976 269.32 41.9351C269.273 41.8726 269.207 41.8413 269.121 41.8413H264.938C264.844 41.8413 264.758 41.8726 264.68 41.9351C264.602 41.9976 264.555 42.0718 264.539 42.1577L264.469 42.4858C264.289 43.353 265.344 44.7046 267.633 46.5405C269.922 48.3687 270.949 49.8335 270.715 50.9351L270.293 52.9507C270.207 53.3569 270.047 53.7397 269.812 54.0991C269.586 54.4507 269.309 54.7632 268.98 55.0366C268.652 55.3022 268.293 55.5132 267.902 55.6694C267.52 55.8179 267.125 55.8921 266.719 55.8921H261.363C260.957 55.8921 260.59 55.8179 260.262 55.6694C259.941 55.5132 259.672 55.3022 259.453 55.0366C259.242 54.7632 259.098 54.4507 259.02 54.0991C258.949 53.7397 258.957 53.3569 259.043 52.9507L259.535 50.5952H262.746L262.254 52.9155C262.23 53.0093 262.242 53.0874 262.289 53.1499C262.344 53.2124 262.418 53.2437 262.512 53.2437H266.695C266.781 53.2437 266.863 53.2124 266.941 53.1499C267.02 53.0874 267.07 53.0093 267.094 52.9155L267.316 51.8257Z" fill="white"/>
<g filter="url(#filter0_dddddd_0_1)">
<path d="M49.261 18.8921H358.29C361.315 18.8921 364.134 20.3607 365.837 22.8003L370.843 39.6763L370.888 39.8296L370.979 39.9614C371.064 40.0842 371.145 40.2068 371.222 40.3296L371.223 40.3325C371.243 40.3647 371.252 40.38 371.285 40.4341V40.4351C371.318 40.4886 371.342 40.5276 371.365 40.5679L371.367 40.5718C372.201 41.9909 372.583 43.4958 372.591 44.9663L372.592 44.9722C372.592 44.9913 372.593 45.0079 372.593 45.019L372.594 45.0415C372.594 45.0453 372.593 45.0541 372.593 45.063C372.592 45.0743 372.592 45.0906 372.592 45.1099L372.591 45.1157C372.583 46.586 372.201 48.0909 371.367 49.5103L371.365 49.5142C371.342 49.5544 371.318 49.5933 371.285 49.647C371.252 49.7015 371.243 49.7181 371.223 49.7505L371.222 49.7534C371.152 49.8654 371.077 49.9782 370.996 50.0952L370.9 50.2358L370.855 50.4009L365.831 68.9917C364.128 71.4265 361.311 72.8921 358.29 72.8921H49.261C46.4141 72.8921 43.7368 71.5903 42.0081 69.3843L37.6594 51.9868L37.6067 51.7769L37.4729 51.6079C37.2815 51.3662 37.1025 51.1138 36.9358 50.853L36.9319 50.8481L36.7542 50.562C35.8945 49.1268 35.5019 47.5925 35.5002 46.0913V46.0835L35.5032 45.7769C35.5434 44.2445 35.9914 42.6835 36.9309 41.2358L36.9319 41.2368L36.9358 41.231C37.1045 40.9672 37.285 40.7122 37.4778 40.4692L37.6135 40.2983L37.6653 40.0864L42.01 22.3979C43.7388 20.1932 46.415 18.8921 49.261 18.8921Z" stroke="url(#paint2_linear_0_1)" stroke-width="2"/>
</g>
<defs>
<filter id="filter0_dddddd_0_1" x="16.6082" y="8.96454e-05" width="374.877" height="91.784" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="0.213"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="0.426"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_0_1" result="effect2_dropShadow_0_1"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="1.491"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect2_dropShadow_0_1" result="effect3_dropShadow_0_1"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="2.982"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect3_dropShadow_0_1" result="effect4_dropShadow_0_1"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="5.112"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect4_dropShadow_0_1" result="effect5_dropShadow_0_1"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="8.946"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect5_dropShadow_0_1" result="effect6_dropShadow_0_1"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_0_1" result="shape"/>
</filter>
<linearGradient id="paint0_linear_0_1" x1="408" y1="46.3921" x2="373" y2="46.3921" gradientUnits="userSpaceOnUse">
<stop offset="0.379808" stop-color="#8DE3DE" stop-opacity="0"/>
<stop offset="0.673077" stop-color="#8DE3DE" stop-opacity="0.2"/>
<stop offset="1" stop-color="white"/>
</linearGradient>
<linearGradient id="paint1_linear_0_1" x1="35" y1="0.5" x2="0" y2="0.5" gradientUnits="userSpaceOnUse">
<stop offset="0.379808" stop-color="#8DE3DE" stop-opacity="0"/>
<stop offset="0.673077" stop-color="#8DE3DE" stop-opacity="0.2"/>
<stop offset="1" stop-color="white"/>
</linearGradient>
<linearGradient id="paint2_linear_0_1" x1="25.5935" y1="49.3921" x2="386.094" y2="45.9669" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="0.430073" stop-color="#1BC6BD" stop-opacity="0.2"/>
<stop offset="1" stop-color="#F5F5F5"/>
</linearGradient>
</defs>
</svg>

      </div>

      <div className="blog-inner-sidebar-scroll">
        <div className="blog-inner-sidebar-list">
          {latestBlogs.map((blog) => (
            <SidebarBlogCard
              key={blog.id}
              image={blog.image}
              title={t.blogTitle}
              date={t.date}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function RelatedBlogCard({
  blog,
  onReadMore,
  lang,
}: {
  blog: BlogItem;
  onReadMore?: (blog: BlogItem) => void;
  lang: Lang;
}) {
  const isArabic = lang === "ar";
  const t = blogInnerCopy[lang];

  return (
    <article className="blog-card" dir={isArabic ? "rtl" : "ltr"}>
      <div className="blog-image-wrap">
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-image"
          loading="lazy"
          draggable={false}
        />
      </div>

      <div className="blog-overlay">
        <div className="blog-topline">
          <h3 className="blog-title">{blog.title}</h3>
          <span className="blog-date">{blog.date}</span>
        </div>

        <p className="blog-excerpt">{blog.excerpt}</p>

        <button
          type="button"
          className="blog-read-more"
          onClick={() => onReadMore?.(blog)}
        >
          <span className="see-more-title">{t.readMore}</span>
          <img src={arrowMobileUri} alt="" className="see-more-arrow-mobile-2" />
        </button>
      </div>
    </article>
  );
}

export default function BlogInnerPage() {
  const [lang, setLang] = usePersistedLang("ar");
  const isArabic = lang === "ar";
  const t = blogInnerCopy[lang];
  const pageDir = isArabic ? "rtl" : "ltr";

  return (
    <div
      key={`blog-inner-${lang}`}
      className="remaining-page blog-inner-page"
      dir={pageDir}
      lang={lang}
    >
      <Header lang={lang} onLanguageChange={setLang} currentPage="blog" />

      <main className="blog-inner-content">
        <section className="blog-inner-shell">
          <div className="blog-inner-breadcrumb">
            <span>{t.blogs}</span>
            <BreadcrumbArrow />
            <span className="is-active">{t.blogName}</span>
          </div>

          <div className="blog-inner-layout">
            <div className="blog-inner-main">
              <article
                className="blog-inner-article-card"
                style={{ backgroundImage: `url(${articleBorderUri})` }}
              >
                <div className="blog-inner-article-head">
                  <SectionHeader
                    title={t.blogTitle}
                    chipImage={chipShapeUri}
                    showButton={false}
                    lang={lang}
                  />
                  <span className="blog-inner-date">{t.date}</span>
                </div>

                <div className="blog-inner-article-body">
                  <img
                    src={mainImageUri}
                    alt={t.blogTitle}
                    className="blog-inner-main-image"
                  />

                  <p>{articleCopy[lang]}</p>
                </div>
              </article>

              <div className="blog-inner-reviews">
                <CommentSystem
                  title={t.reviews}
                  formTitle={t.leaveReview}
                  submitLabel={t.submit}
                  placeholder={t.placeholder}
                  comments={comments}
                  initialVisibleCount={3}
                  showHeader
                  showForm
                  lang={lang}
                />
              </div>
            </div>

            <LatestBlogsSidebar lang={lang} />
          </div>

          <section className="blog-inner-related-section">
            <SectionHeader
              title={t.youMayAlsoLike}
              chipImage={chipShapeUri}
              showButton={false}
              lang={lang}
            />

            <div className="blog-inner-related-grid">
              {relatedBlogs.map((blog) => (
                <RelatedBlogCard
                  key={blog.id}
                  blog={{
                    ...blog,
                    title: t.blogTitle,
                    date: t.date,
                    excerpt: isArabic
                      ? "هذا نص تجريبي مختصر لعرض شكل بطاقة المقال باللغة العربية داخل الواجهة."
                      : blog.excerpt,
                  }}
                  lang={lang}
                  onReadMore={() => {
                    window.location.href = "/blog-inner";
                  }}
                />
              ))}
            </div>
          </section>
        </section>
      </main>

      <Footer lang={lang} />
      <BackToTop />
    </div>
  );
}

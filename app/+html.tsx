import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

const forceEnglishScript = `
(function () {
  try {
    var root = document.documentElement;
    root.lang = 'en';
    root.dir = 'ltr';
    root.classList.remove('rtl');
    root.classList.add('ltr');

    ['site_lang', 'siteLang', 'appLang', 'language', 'locale', 'lang', 'i18nextLng'].forEach(function (key) {
      localStorage.setItem(key, 'en');
    });
  } catch (e) {}
})();
`;

const firstPaintCss = `
html, body, #root {
  direction: ltr !important;
  text-align: left;
}

html {
  color-scheme: dark;
}

body {
  margin: 0;
  background: #050505;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeSpeed;
}

html[dir="rtl"],
body[dir="rtl"],
[dir="rtl"] {
  direction: ltr !important;
}
`;

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en" dir="ltr" className="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="language" content="English" />
        <meta name="theme-color" content="#050505" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <ScrollViewStyleReset />
        <script dangerouslySetInnerHTML={{ __html: forceEnglishScript }} />
        <style dangerouslySetInnerHTML={{ __html: firstPaintCss }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

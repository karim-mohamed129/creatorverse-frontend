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

    localStorage.setItem('language', 'en');
    localStorage.setItem('lang', 'en');
    localStorage.setItem('locale', 'en');
    localStorage.setItem('i18nextLng', 'en');
  } catch (e) {}
})();
`;

const firstPaintCss = `
html, body, #root {
  direction: ltr !important;
  text-align: left;
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
        <ScrollViewStyleReset />
        <script dangerouslySetInnerHTML={{ __html: forceEnglishScript }} />
        <style dangerouslySetInnerHTML={{ __html: firstPaintCss }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

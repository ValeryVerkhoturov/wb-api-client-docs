import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitepress";
import { editorialFonts } from "vitepress-editorial-modernist/config";

// Docs for https://github.com/ValeryVerkhoturov/wb-api-client — a
// code-generation pipeline that produces client libraries for the
// Wildberries Seller API in five languages. The per-language `README.md`
// files inside that repo are the source of truth for module listings;
// this site is the narrative layer around them (quickstart, auth
// deep-dive, versioning policy, architecture).
//
// i18n layout:
//   root (/)   — Russian, primary audience is WB sellers
//   /en/       — English translation, kept feature-parity with root

const CODE_REPO = "https://github.com/ValeryVerkhoturov/wb-api-client";

// Where the site actually lives. Used for the sitemap, canonical URLs,
// hreflang pairs and absolute og:image URLs — all of which need an origin
// that relative links cannot supply.
const SITE = "https://valeryverkhoturov.github.io";
const BASE = "/wb-api-client-docs/";
const ORIGIN = `${SITE}${BASE}`;

const DOCS_ROOT = fileURLToPath(new URL("..", import.meta.url));

// `guides/quickstart.md` -> `guides/quickstart`, `en/index.md` -> `en`.
// Mirrors `cleanUrls: true`, so the result is the live URL path.
function urlPath(relativePath: string): string {
  return relativePath.replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, "");
}

// First real paragraph of a page, flattened to plain text — the lede that
// follows the h1 on every guide and reference page. Used as the meta and
// og:description so each page describes itself instead of repeating the
// site blurb. Home pages are frontmatter-driven and have none.
function leadParagraph(relativePath: string): string | undefined {
  let source: string;
  try {
    source = readFileSync(`${DOCS_ROOT}${relativePath}`, "utf-8");
  } catch {
    return undefined;
  }

  const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  const lines: string[] = [];
  let fenced = false;

  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim();

    if (line.startsWith("```")) {
      fenced = !fenced;
      continue;
    }
    if (fenced) continue;

    // Headings, containers, tables, lists, quotes and images are not prose.
    const skip =
      !line ||
      /^[#>|]/.test(line) ||
      line.startsWith(":::") ||
      line.startsWith("![") ||
      line.startsWith("<") ||
      /^([-*+]|\d+\.)\s/.test(line);

    if (skip) {
      if (lines.length) break; // paragraph ended
      continue;
    }
    lines.push(line);
  }

  if (!lines.length) return undefined;

  const text = lines
    .join(" ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // links and images -> their text
    .replace(/[`*_]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= 160) return text;
  const cut = text.slice(0, 160);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

// Every page exists twice — at the root in Russian and under /en/ in
// English. Returns the counterpart's relative path, or undefined when the
// translation is missing, so a half-translated page never claims a pair.
function counterpart(relativePath: string): string | undefined {
  const other = relativePath.startsWith("en/")
    ? relativePath.slice(3)
    : `en/${relativePath}`;
  return existsSync(`${DOCS_ROOT}${other}`) ? other : undefined;
}

export default defineConfig({
  title: "wb-api-client",

  // Project-pages base path. Change if the repo is renamed or a custom
  // domain is added (then set to "/").
  base: BASE,

  cleanUrls: true,
  lastUpdated: true,

  // Emits dist/sitemap.xml, with <lastmod> taken from `lastUpdated`.
  // public/robots.txt points crawlers at it.
  sitemap: { hostname: ORIGIN },

  head: [
    ["meta", { name: "theme-color", content: "#c2381c" }],

    // SVG for everything modern, PNG for Safari/iOS and legacy tabs.
    ["link", { rel: "icon", type: "image/svg+xml", href: `${BASE}favicon.svg` }],
    ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: `${BASE}favicon-32.png` }],
    ["link", { rel: "apple-touch-icon", href: `${BASE}apple-touch-icon.png` }],

    ["meta", { name: "twitter:card", content: "summary_large_image" }],

    // Playfair Display + JetBrains Mono, the faces the theme sets its
    // display and label type in. Both ship Cyrillic subsets.
    ...editorialFonts,
  ],

  // Per-page head tags. The site-wide `head` above cannot do these: each
  // one depends on which page — and which locale — is being rendered.
  //
  //   canonical   one address per page, so the two locales never read as
  //               duplicates of each other
  //   alternate   pairs the Russian page with its English translation
  //               (and back), with Russian as x-default — the primary
  //               audience is WB sellers
  //   og/twitter  a real title, description, URL and card image per page,
  //               instead of every share showing the bare site title
  transformPageData(pageData) {
    const path = urlPath(pageData.relativePath);
    const isEnglish = pageData.relativePath.startsWith("en/");
    const url = `${ORIGIN}${path}`;

    const title = pageData.frontmatter.title ?? pageData.title;

    // `??` is not enough here: VitePress leaves `description` as "" rather
    // than undefined on pages that do not set one.
    const description =
      pageData.frontmatter.description ||
      // A home page has no prose lede — its pitch is the hero tagline.
      pageData.frontmatter.hero?.tagline ||
      pageData.description ||
      leadParagraph(pageData.relativePath) ||
      (isEnglish
        ? "Auto-generated client libraries for the Wildberries Seller API — Python, TypeScript, Go, Java, PHP."
        : "Автоматически сгенерированные клиенты Wildberries Seller API для Python, TypeScript, Go, Java и PHP.");

    // Also drives <meta name="description">, which VitePress renders from
    // pageData — otherwise every page carries the site-wide one.
    pageData.description = description;

    const head: [string, Record<string, string>][] = [
      ["link", { rel: "canonical", href: url }],
      [
        "meta",
        {
          property: "og:type",
          content: pageData.frontmatter.layout === "home" ? "website" : "article",
        },
      ],
      ["meta", { property: "og:site_name", content: "wb-api-client" }],
      ["meta", { property: "og:url", content: url }],
      ["meta", { property: "og:title", content: title ? `${title} · wb-api-client` : "wb-api-client" }],
      ["meta", { property: "og:description", content: description }],
      ["meta", { property: "og:locale", content: isEnglish ? "en_US" : "ru_RU" }],
      [
        "meta",
        {
          property: "og:image",
          content: `${ORIGIN}${isEnglish ? "og-en.png" : "og.png"}`,
        },
      ],
      ["meta", { property: "og:image:width", content: "1200" }],
      ["meta", { property: "og:image:height", content: "630" }],
    ];

    const other = counterpart(pageData.relativePath);
    if (other) {
      const russian = `${ORIGIN}${urlPath(isEnglish ? other : pageData.relativePath)}`;
      const english = `${ORIGIN}${urlPath(isEnglish ? pageData.relativePath : other)}`;

      head.push(
        ["link", { rel: "alternate", hreflang: "ru", href: russian }],
        ["link", { rel: "alternate", hreflang: "en", href: english }],
        ["link", { rel: "alternate", hreflang: "x-default", href: russian }],
        ["meta", { property: "og:locale:alternate", content: isEnglish ? "ru_RU" : "en_US" }],
      );
    }

    pageData.frontmatter.head = [...(pageData.frontmatter.head ?? []), ...head];
  },

  themeConfig: {
    socialLinks: [{ icon: "github", link: CODE_REPO }],
  },

  locales: {
    root: {
      label: "Русский",
      lang: "ru-RU",
      description:
        "Автоматически сгенерированные клиенты Wildberries Seller API для Python, TypeScript, Go, Java и PHP.",
      themeConfig: {
        nav: [
          { text: "Руководства", link: "/guides/quickstart" },
          { text: "Языки", link: "/languages/python" },
          { text: "Справочник", link: "/reference/versioning" },
          { text: "Релизы", link: `${CODE_REPO}/releases` },
        ],
        sidebar: {
          "/guides/": [
            {
              text: "Начало работы",
              items: [
                { text: "Быстрый старт", link: "/guides/quickstart" },
                { text: "Аутентификация", link: "/guides/authentication" },
                { text: "Обработка ошибок", link: "/guides/error-handling" },
              ],
            },
          ],
          "/languages/": [
            {
              text: "Клиенты",
              items: [
                { text: "Python", link: "/languages/python" },
                { text: "TypeScript", link: "/languages/typescript" },
                { text: "Go", link: "/languages/go" },
                { text: "Java", link: "/languages/java" },
                { text: "PHP", link: "/languages/php" },
              ],
            },
          ],
          "/reference/": [
            {
              text: "Справочник",
              items: [
                { text: "Версионирование", link: "/reference/versioning" },
                { text: "Архитектура", link: "/reference/architecture" },
                { text: "Участие в разработке", link: "/reference/contributing" },
              ],
            },
          ],
        },
        editLink: {
          pattern:
            "https://github.com/ValeryVerkhoturov/wb-api-client-docs/edit/main/docs/:path",
          text: "Предложить правку на GitHub",
        },
        docFooter: {
          prev: "Назад",
          next: "Далее",
        },
        outline: { label: "Содержание" },
        lastUpdated: { text: "Обновлено" },
        darkModeSwitchLabel: "Тема",
        sidebarMenuLabel: "Меню",
        returnToTopLabel: "Наверх",
        langMenuLabel: "Сменить язык",
        search: {
          provider: "local",
          options: {
            translations: {
              button: {
                buttonText: "Поиск",
                buttonAriaLabel: "Поиск",
              },
              modal: {
                displayDetails: "Показать подробности",
                resetButtonTitle: "Сбросить",
                backButtonTitle: "Закрыть",
                noResultsText: "Ничего не найдено",
                footer: {
                  selectText: "выбрать",
                  navigateText: "перейти",
                  closeText: "закрыть",
                },
              },
            },
          },
        },
        footer: {
          message:
            'Распространяется под лицензией <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache 2.0</a>.',
          copyright: `© ${new Date().getFullYear()} Valery Verkhoturov`,
        },
      },
    },

    en: {
      label: "English",
      lang: "en-US",
      link: "/en/",
      description:
        "Auto-generated client libraries for the Wildberries Seller API — Python, TypeScript, Go, Java, PHP.",
      themeConfig: {
        nav: [
          { text: "Guides", link: "/en/guides/quickstart" },
          { text: "Languages", link: "/en/languages/python" },
          { text: "Reference", link: "/en/reference/versioning" },
          { text: "Releases", link: `${CODE_REPO}/releases` },
        ],
        sidebar: {
          "/en/guides/": [
            {
              text: "Getting started",
              items: [
                { text: "Quickstart", link: "/en/guides/quickstart" },
                { text: "Authentication", link: "/en/guides/authentication" },
                { text: "Error handling", link: "/en/guides/error-handling" },
              ],
            },
          ],
          "/en/languages/": [
            {
              text: "Language clients",
              items: [
                { text: "Python", link: "/en/languages/python" },
                { text: "TypeScript", link: "/en/languages/typescript" },
                { text: "Go", link: "/en/languages/go" },
                { text: "Java", link: "/en/languages/java" },
                { text: "PHP", link: "/en/languages/php" },
              ],
            },
          ],
          "/en/reference/": [
            {
              text: "Reference",
              items: [
                { text: "Versioning", link: "/en/reference/versioning" },
                { text: "Architecture", link: "/en/reference/architecture" },
                { text: "Contributing", link: "/en/reference/contributing" },
              ],
            },
          ],
        },
        editLink: {
          pattern:
            "https://github.com/ValeryVerkhoturov/wb-api-client-docs/edit/main/docs/:path",
          text: "Suggest an edit on GitHub",
        },
        search: {
          provider: "local",
        },
        footer: {
          message:
            'Released under the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache 2.0 License</a>.',
          copyright: `© ${new Date().getFullYear()} Valery Verkhoturov`,
        },
      },
    },
  },
});

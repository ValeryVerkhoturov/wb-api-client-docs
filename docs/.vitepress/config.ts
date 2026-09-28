import { defineConfig } from "vitepress";
import { editorialFonts } from "vitepress-editorial-modernist/config";

// Markdown twin of every page, llms.txt and llms-full.txt, all written
// into dist once the HTML build is done.
import { generateLlmsFiles } from "./llms";
import { counterpart, leadParagraph, mdPath, urlPath } from "./page-meta";

// Endpoint reference: one page per API operation, generated into
// docs/reference/api/ (and /en/) by scripts/gen-api-reference.py in the
// wb-api-client repo. Both the pages and this sidebar are regenerated
// there on every upstream spec change — do not hand-edit either.
import { apiSidebar } from "./api-sidebar";

// Docs for https://github.com/ValeryVerkhoturov/wb-api-client — a
// code-generation pipeline that produces client libraries for the
// Wildberries Seller API in seven languages. The per-language `README.md`
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

    [
      "meta",
      {
        name: "google-site-verification",
        content: "QeUgZ7euC0vgFZldM7fXdho3lp1r6NiRmxxnCDurWS8",
      },
    ],

    // SVG for everything modern, PNG for Safari/iOS and legacy tabs.
    [
      "link",
      { rel: "icon", type: "image/svg+xml", href: `${BASE}favicon.svg` },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: `${BASE}favicon-32.png`,
      },
    ],
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
        ? "Auto-generated client libraries for the Wildberries Seller API — Python, TypeScript, Go, Java, PHP, OneScript, C#."
        : "Автоматически сгенерированные клиенты Wildberries Seller API для Python, TypeScript, Go, Java, PHP, OneScript и C#.");

    // Also drives <meta name="description">, which VitePress renders from
    // pageData — otherwise every page carries the site-wide one.
    pageData.description = description;

    const head: [string, Record<string, string>][] = [
      ["link", { rel: "canonical", href: url }],

      // The same page as Markdown. Agents that follow it get the prose
      // without the app shell around it; browsers ignore the link.
      [
        "link",
        {
          rel: "alternate",
          type: "text/markdown",
          href: `${ORIGIN}${mdPath(path)}`,
        },
      ],
      [
        "meta",
        {
          property: "og:type",
          content:
            pageData.frontmatter.layout === "home" ? "website" : "article",
        },
      ],
      ["meta", { property: "og:site_name", content: "wb-api-client" }],
      ["meta", { property: "og:url", content: url }],
      [
        "meta",
        {
          property: "og:title",
          content: title ? `${title} · wb-api-client` : "wb-api-client",
        },
      ],
      ["meta", { property: "og:description", content: description }],
      [
        "meta",
        { property: "og:locale", content: isEnglish ? "en_US" : "ru_RU" },
      ],
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
        [
          "meta",
          {
            property: "og:locale:alternate",
            content: isEnglish ? "ru_RU" : "en_US",
          },
        ],
      );
    }

    pageData.frontmatter.head = [...(pageData.frontmatter.head ?? []), ...head];
  },

  // Runs after the HTML and sitemap are on disk, and writes alongside
  // them: `<url>.md` for every page, plus llms.txt and llms-full.txt per
  // locale. Nothing here touches the HTML build, so a failure in it is a
  // failure of the whole build — which is what we want, since a stale
  // Markdown mirror is worse than none.
  buildEnd(siteConfig) {
    generateLlmsFiles(siteConfig.outDir, ORIGIN);
  },

  themeConfig: {
    socialLinks: [{ icon: "github", link: CODE_REPO }],
  },

  locales: {
    root: {
      label: "Русский",
      lang: "ru-RU",
      description:
        "Автоматически сгенерированные клиенты Wildberries Seller API для Python, TypeScript, Go, Java, PHP, OneScript и C#.",
      themeConfig: {
        nav: [
          { text: "Руководства", link: "/guides/quickstart" },
          { text: "Языки", link: "/languages/python" },
          { text: "Справочник API", link: "/reference/api/" },
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
                { text: "Свои заголовки", link: "/guides/custom-headers" },
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
                { text: "OneScript (1С)", link: "/languages/onescript" },
                { text: "C#", link: "/languages/csharp" },
              ],
            },
          ],
          "/reference/api/": apiSidebar.ru,
          "/reference/": [
            {
              text: "Справочник",
              items: [
                { text: "Версионирование", link: "/reference/versioning" },
                { text: "Архитектура", link: "/reference/architecture" },
                {
                  text: "Участие в разработке",
                  link: "/reference/contributing",
                },
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
        "Auto-generated client libraries for the Wildberries Seller API — Python, TypeScript, Go, Java, PHP, OneScript, C#.",
      themeConfig: {
        nav: [
          { text: "Guides", link: "/en/guides/quickstart" },
          { text: "Languages", link: "/en/languages/python" },
          { text: "API reference", link: "/en/reference/api/" },
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
                { text: "Custom headers", link: "/en/guides/custom-headers" },
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
                { text: "OneScript (1С)", link: "/en/languages/onescript" },
                { text: "C#", link: "/en/languages/csharp" },
              ],
            },
          ],
          "/en/reference/api/": apiSidebar.en,
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

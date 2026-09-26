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

export default defineConfig({
  title: "wb-api-client",

  // Project-pages base path. Change if the repo is renamed or a custom
  // domain is added (then set to "/").
  base: "/wb-api-client-docs/",

  cleanUrls: true,
  lastUpdated: true,

  head: [
    ["meta", { name: "theme-color", content: "#c2381c" }],
    ["meta", { property: "og:title", content: "wb-api-client" }],

    // Playfair Display + JetBrains Mono, the faces the theme sets its
    // display and label type in. Both ship Cyrillic subsets.
    ...editorialFonts,
  ],

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

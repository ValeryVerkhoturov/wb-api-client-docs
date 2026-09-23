import { defineConfig } from "vitepress";

// Docs for https://github.com/ValeryVerkhoturov/wb-api-client — a
// code-generation pipeline that produces client libraries for the
// Wildberries Seller API in five languages. The per-language `README.md`
// files inside that repo are the source of truth for module listings;
// this site is the narrative layer around them (quickstart, auth
// deep-dive, versioning policy, architecture).

const CODE_REPO = "https://github.com/ValeryVerkhoturov/wb-api-client";

export default defineConfig({
  lang: "en-US",
  title: "wb-api-client",
  description:
    "Auto-generated client libraries for the Wildberries Seller API — Python, TypeScript, Go, Java, PHP.",

  // Project-pages base path. Change if the repo is renamed or a custom
  // domain is added (then set to "/").
  base: "/wb-api-client-docs/",

  cleanUrls: true,
  lastUpdated: true,

  head: [
    ["meta", { name: "theme-color", content: "#7c3aed" }],
    ["meta", { property: "og:title", content: "wb-api-client" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Auto-generated Wildberries Seller API clients for Python, TypeScript, Go, Java, and PHP.",
      },
    ],
  ],

  themeConfig: {
    nav: [
      { text: "Guides", link: "/guides/quickstart" },
      { text: "Languages", link: "/languages/python" },
      { text: "Reference", link: "/reference/versioning" },
      {
        text: "Releases",
        link: `${CODE_REPO}/releases`,
      },
    ],

    sidebar: {
      "/guides/": [
        {
          text: "Getting started",
          items: [
            { text: "Quickstart", link: "/guides/quickstart" },
            { text: "Authentication", link: "/guides/authentication" },
            { text: "Error handling", link: "/guides/error-handling" },
          ],
        },
      ],
      "/languages/": [
        {
          text: "Language clients",
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
          text: "Reference",
          items: [
            { text: "Versioning", link: "/reference/versioning" },
            { text: "Architecture", link: "/reference/architecture" },
            { text: "Contributing", link: "/reference/contributing" },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: CODE_REPO }],

    search: {
      provider: "local",
    },

    editLink: {
      pattern:
        "https://github.com/ValeryVerkhoturov/wb-api-client-docs/edit/main/docs/:path",
      text: "Suggest an edit on GitHub",
    },

    footer: {
      message:
        'Released under the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache 2.0 License</a>.',
      copyright: `© ${new Date().getFullYear()} Valery Verkhoturov`,
    },
  },
});

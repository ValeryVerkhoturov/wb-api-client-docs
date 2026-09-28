// llms.txt and the Markdown twin of every page, both written into dist
// at the end of the build.
//
// The HTML build serves two readers badly. An agent that fetches one page
// gets the VitePress shell — app JS, the whole sidebar, the search index
// hint — wrapped around a couple of kilobytes of prose. A model handed
// the site as a whole has no index to start from: sitemap.xml lists 666
// URLs with no titles and no shape.
//
// So every page is written out again as `<url>.md` (linked from its HTML
// by rel="alternate"), the narrative pages are concatenated into
// llms-full.txt, and llms.txt indexes both. One set per locale, mirroring
// the site: Russian at the root, English under /en/.
//
// The 638 generated endpoint pages stay out of llms.txt on purpose — they
// would bury the twelve pages that explain what the project is. They are
// reachable in one more hop: llms.txt lists the 13 module pages, and each
// of those lists its own operations.
//
// Format: https://llmstxt.org

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";

import {
  DOCS_ROOT,
  frontmatterValue,
  leadParagraph,
  mdPath,
  pageTitle,
  stripFrontmatter,
  urlPath,
} from "./page-meta";

// The narrative layer, in the order the sidebar presents it — the same
// paths under both locales, so one table drives both files.
const SECTIONS = [
  {
    ru: "Руководства",
    en: "Guides",
    pages: [
      "guides/quickstart",
      "guides/authentication",
      "guides/error-handling",
      "guides/custom-headers",
    ],
  },
  {
    ru: "Клиенты",
    en: "Language clients",
    pages: [
      "languages/python",
      "languages/typescript",
      "languages/go",
      "languages/java",
      "languages/php",
      "languages/onescript",
      "languages/csharp",
    ],
  },
  {
    ru: "Справочник",
    en: "Reference",
    pages: [
      "reference/versioning",
      "reference/architecture",
      "reference/contributing",
    ],
  },
];

const LOCALES = [
  {
    prefix: "",
    lang: "ru-RU",
    other: "en/",
    blurb:
      "Автоматически сгенерированные клиенты Wildberries Seller API для Python, TypeScript, Go, Java, PHP, OneScript и C#. Одна версия на все семь экосистем, bearer-токен маскируется по умолчанию.",
    mirror:
      "Любая страница сайта доступна в Markdown по её адресу с суффиксом `.md` — например `guides/quickstart.md`. Это относится и к 638 страницам справочника API, которые ниже не перечислены поштучно: страница модуля перечисляет все свои операции.",
    api: "Справочник API",
    full: "Все обзорные страницы одним файлом, без справочника по операциям",
    otherLabel: "The same index in English",
  },
  {
    prefix: "en/",
    lang: "en-US",
    other: "",
    blurb:
      "Auto-generated client libraries for the Wildberries Seller API — Python, TypeScript, Go, Java, PHP, OneScript and C#. One version across all seven ecosystems, bearer tokens redacted by default.",
    mirror:
      "Every page on the site is also served as Markdown at its own address plus `.md` — `guides/quickstart.md`, for instance. That includes the 638 endpoint reference pages, which are not listed individually below: each module page lists its own operations.",
    api: "API reference",
    full: "Every narrative page in one file, endpoint reference excluded",
    otherLabel: "Этот же указатель на русском",
  },
];

type Locale = (typeof LOCALES)[number];

// Every Markdown source under docs/, as paths relative to it. `public/`
// holds assets only and `.vitepress/` is the build itself.
function sources(dir = ""): string[] {
  return readdirSync(join(DOCS_ROOT, dir), { withFileTypes: true }).flatMap(
    (entry) => {
      const path = dir ? `${dir}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        return entry.name === ".vitepress" || entry.name === "public"
          ? []
          : sources(path);
      }
      return entry.name.endsWith(".md") ? [path] : [];
    },
  );
}

function read(relativePath: string): string {
  return readFileSync(join(DOCS_ROOT, relativePath), "utf-8");
}

function write(outDir: string, path: string, contents: string): void {
  const file = join(outDir, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, contents, "utf-8");
}

// The home page is frontmatter, not prose: its pitch lives in the hero
// and the feature grid, which `stripFrontmatter` would throw away. Turn
// that back into the heading and list a reader would expect.
function heroSection(source: string): string {
  const name = frontmatterValue(source, "name") ?? "wb-api-client";
  const text = frontmatterValue(source, "text");
  const tagline = frontmatterValue(source, "tagline");

  const features = [
    ...source.matchAll(/^\s*-\s+title:\s*(.+?)\s*\n\s*details:\s*(.+?)\s*$/gm),
  ].map(([, title, details]) => `- **${title}** — ${details}`);

  return [`# ${name}${text ? ` — ${text}` : ""}`, tagline, features.join("\n")]
    .filter(Boolean)
    .join("\n\n");
}

// VitePress's Markdown extensions are markup that only its renderer
// understands. Code groups become labelled code blocks, custom
// containers become blockquotes, and root-relative links become absolute
// — a `.md` file gets read on its own, with no site around it to resolve
// them against.
function normalize(body: string, origin: string): string {
  const out: string[] = [];
  const containers: ("quote" | "group")[] = [];
  let fence: string | undefined;

  const quoted = () => containers.includes("quote");
  const emit = (line: string) =>
    out.push(quoted() && line ? `> ${line}` : quoted() ? ">" : line);

  for (const raw of body.split(/\r?\n/)) {
    if (fence) {
      if (raw.trimStart().startsWith(fence)) fence = undefined;
      emit(raw);
      continue;
    }

    // ```bash [Python] — the label is the code group's tab, and belongs
    // above the block once the tabs themselves are gone.
    const opening =
      /^(\s*)(`{3,}|~{3,})\s*([^\s[]*)\s*(?:\[([^\]]*)\])?\s*$/.exec(raw);
    if (opening) {
      const [, indent, marker, lang, label] = opening;
      fence = marker;
      if (label) {
        emit(`**${label}**`);
        emit("");
      }
      emit(`${indent}${marker}${lang}`);
      continue;
    }

    const container = /^:::\s*([a-z-]+)\s*(.*)$/.exec(raw);
    if (container) {
      const [, kind, title] = container;
      if (kind === "code-group") {
        containers.push("group");
      } else {
        containers.push("quote");
        emit(`**${title || kind}**`);
        emit("");
      }
      continue;
    }
    if (/^:::\s*$/.test(raw)) {
      containers.pop();
      continue;
    }

    emit(raw.replace(/\]\(\//g, `](${origin}`));
  }

  return out
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// One page as a standalone Markdown document: normalized body under
// frontmatter that says where it came from, so a model holding the file
// alone can still cite and follow it.
function page(relativePath: string, locale: Locale, origin: string): string {
  const source = read(relativePath);
  const url = `${origin}${urlPath(relativePath)}`;
  const title = pageTitle(source) ?? "wb-api-client";
  const description =
    frontmatterValue(source, "description") ||
    frontmatterValue(source, "tagline") ||
    leadParagraph(relativePath);

  const isHome = frontmatterValue(source, "layout") === "home";
  const body = normalize(stripFrontmatter(source), origin);

  return [
    "---",
    `title: ${JSON.stringify(title)}`,
    description ? `description: ${JSON.stringify(description)}` : undefined,
    `lang: ${locale.lang}`,
    `source: ${url}`,
    "---",
    "",
    isHome ? `${heroSection(source)}\n\n${body}` : body,
    "",
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}

// `- [Title](url): description`, the line shape llms.txt is made of.
function entry(relativePath: string, origin: string): string {
  const source = read(relativePath);
  const title = pageTitle(source) ?? urlPath(relativePath);
  const description =
    frontmatterValue(source, "description") || leadParagraph(relativePath);

  return `- [${title}](${origin}${mdPath(urlPath(relativePath))})${
    description ? `: ${description}` : ""
  }`;
}

// The 13 API modules in the order the reference index tabulates them,
// which is the order of the package's own sub-modules — not alphabetical.
function apiModules(prefix: string): string[] {
  const index = `${prefix}reference/api/index.md`;
  const linked = [
    ...read(index).matchAll(/\]\(\/(?:en\/)?reference\/api\/([a-z0-9-]+)\/\)/g),
  ].map(([, slug]) => slug);

  return [...new Set(linked)].filter((slug) =>
    existsSync(join(DOCS_ROOT, `${prefix}reference/api/${slug}/index.md`)),
  );
}

function llmsIndex(locale: Locale, origin: string): string {
  const p = locale.prefix;
  const label = (section: (typeof SECTIONS)[number]) =>
    p ? section.en : section.ru;

  const lines = ["# wb-api-client", "", `> ${locale.blurb}`, "", locale.mirror];

  for (const section of SECTIONS) {
    lines.push("", `## ${label(section)}`, "");
    for (const page of section.pages) {
      lines.push(entry(`${p}${page}.md`, origin));
    }
  }

  lines.push(
    "",
    `## ${locale.api}`,
    "",
    entry(`${p}reference/api/index.md`, origin),
  );
  for (const slug of apiModules(p)) {
    lines.push(entry(`${p}reference/api/${slug}/index.md`, origin));
  }

  lines.push(
    "",
    "## Optional",
    "",
    `- [llms-full.txt](${origin}${p}llms-full.txt): ${locale.full}`,
    `- [llms.txt](${origin}${locale.other}llms.txt): ${locale.otherLabel}`,
    "",
  );

  return lines.join("\n");
}

function llmsFull(locale: Locale, origin: string): string {
  const p = locale.prefix;
  const pages = [
    `${p}index.md`,
    ...SECTIONS.flatMap((section) =>
      section.pages.map((path) => `${p}${path}.md`),
    ),
  ];

  const head = [
    "# wb-api-client",
    "",
    `> ${locale.blurb}`,
    "",
    locale.mirror,
    "",
  ].join("\n");

  // No separator between the pages: each one opens with its own
  // frontmatter block, which is the rule already.
  return [head, ...pages.map((path) => page(path, locale, origin))].join("\n");
}

export function generateLlmsFiles(outDir: string, origin: string): void {
  for (const relativePath of sources()) {
    const locale = LOCALES[relativePath.startsWith("en/") ? 1 : 0];
    write(
      outDir,
      mdPath(urlPath(relativePath)),
      page(relativePath, locale, origin),
    );
  }

  for (const locale of LOCALES) {
    write(outDir, `${locale.prefix}llms.txt`, llmsIndex(locale, origin));
    write(outDir, `${locale.prefix}llms-full.txt`, llmsFull(locale, origin));
  }
}

import { existsSync } from "node:fs";
import { join } from "node:path";

import { DOCS_ROOT, mdPath, urlPath } from "../kernel/pages";
import { read, sources, write } from "../kernel/sources";
import { entry, page } from "./mirror";

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
      "languages/rust",
    ],
  },
  {
    ru: "Справочник",
    en: "Reference",
    pages: ["guides/versioning", "guides/architecture", "guides/contributing"],
  },
];

const LOCALES = [
  {
    prefix: "",
    lang: "ru-RU",
    other: "en/",
    blurb:
      "Автоматически сгенерированные клиенты Wildberries Seller API для Python, TypeScript, Go, Java, PHP, OneScript, C# и Rust. Одна версия на все восемь экосистем, bearer-токен маскируется по умолчанию.",
    mirror:
      "Любая страница сайта доступна в Markdown по её адресу с суффиксом `.md` — например `guides/quickstart.md`. Это относится и к {apiPages} справочника API, которые ниже не перечислены поштучно: страница модуля перечисляет все свои операции.",
    api: "Справочник API",
    packages: "Пакеты",
    full: "Все обзорные страницы одним файлом, без справочника по операциям",
    otherLabel: "The same index in English",
  },
  {
    prefix: "en/",
    lang: "en-US",
    other: "",
    blurb:
      "Auto-generated client libraries for the Wildberries Seller API — Python, TypeScript, Go, Java, PHP, OneScript, C# and Rust. One version across all eight ecosystems, bearer tokens redacted by default.",
    mirror:
      "Every page on the site is also served as Markdown at its own address plus `.md` — `guides/quickstart.md`, for instance. That includes the {apiPages} endpoint reference pages, which are not listed individually below: each module page lists its own operations.",
    api: "API reference",
    packages: "Packages",
    full: "Every narrative page in one file, endpoint reference excluded",
    otherLabel: "Этот же указатель на русском",
  },
];

type Locale = (typeof LOCALES)[number];

const PACKAGES: [name: string, url: string, install: string][] = [
  [
    "Python",
    "https://pypi.org/project/valeryverkhoturov-wb-api-client/",
    "pip install valeryverkhoturov-wb-api-client",
  ],
  [
    "TypeScript",
    "https://www.npmjs.com/package/@valeryverkhoturov/wb-api-client",
    "npm install @valeryverkhoturov/wb-api-client",
  ],
  [
    "Go",
    "https://pkg.go.dev/github.com/ValeryVerkhoturov/wb-api-client-go",
    "go get github.com/ValeryVerkhoturov/wb-api-client-go@latest",
  ],
  [
    "Java",
    "https://central.sonatype.com/artifact/io.github.valeryverkhoturov/wb-api-client",
    "Maven Central: io.github.valeryverkhoturov:wb-api-client",
  ],
  [
    "PHP",
    "https://packagist.org/packages/valeryverkhoturov/wb-api-client",
    "composer require valeryverkhoturov/wb-api-client",
  ],
  [
    "OneScript",
    "https://hub.oscript.io/pools/default/packages/wb-api-client",
    "opm install wb-api-client",
  ],
  [
    "C#",
    "https://www.nuget.org/packages/ValeryVerkhoturov.WbApiClient",
    "dotnet add package ValeryVerkhoturov.WbApiClient",
  ],
  ["Rust", "https://crates.io/crates/wb-api-client", "cargo add wb-api-client"],
];

function countApiPages(prefix: string): number {
  return sources().filter(
    (path) =>
      path.startsWith(`${prefix}reference/api/`) && !path.endsWith("index.md"),
  ).length;
}

function ruPagesDative(n: number): string {
  return n % 10 === 1 && n % 100 !== 11 ? `${n} странице` : `${n} страницам`;
}

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

  const apiPages = countApiPages(p);
  const mirror = locale.mirror.replace(
    "{apiPages}",
    p ? String(apiPages) : ruPagesDative(apiPages),
  );

  const lines = ["# wb-api-client", "", `> ${locale.blurb}`, "", mirror];

  for (const section of SECTIONS) {
    lines.push("", `## ${label(section)}`, "");
    for (const pagePath of section.pages) {
      lines.push(entry(`${p}${pagePath}.md`, origin));
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

  lines.push("", `## ${locale.packages}`, "");
  for (const [name, url, install] of PACKAGES) {
    lines.push(`- [${name}](${url}): \`${install}\``);
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

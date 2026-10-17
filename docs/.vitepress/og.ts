// One share card per page, rendered into dist at the end of the build.
//
// A single site-wide card made every shared link look the same — the same
// picture for the quickstart, for a language page and for each of the 616
// endpoints. These are drawn from the page's own title and description,
// in the theme's voice: warm paper, a vermilion section kicker, the title
// in Playfair, a hairline above the lede.
//
// The source is the built HTML rather than the Markdown, which is why
// this runs in `buildEnd`: `transformPageData` has already resolved every
// title and description (composing the endpoint ones, stripping Markdown,
// clamping to 160), and reading them back guarantees the card and the
// meta tags can never drift apart. It also means the card is written to
// exactly the path `og:image` promises.
//
// Rendering is satori (layout -> SVG) + resvg (SVG -> PNG): no browser,
// so it runs the same on a laptop and on the CI runner.

import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const WIDTH = 1200;
const HEIGHT = 630;

const PAPER = "#f6f3ec";
const INK = "#17150f";
const INK_2 = "#58533f";
const RULE = "#d8d3c6";
const ACCENT = "#c2381c";

// The strip along the top, matching the running head on the site itself.
const RUNHEAD = "Wildberries Seller API · SDK";
// All seven, in the order the site lists them everywhere else. The strip
// shares its line with the running head, so it is set a step smaller than
// the rest of the labels to keep the two from meeting in the middle.
const LANGS = "Python · TypeScript · Go · Java · PHP · OneScript · C#";

// The kicker above the title. Keyed by the first path segment, so a page
// that lives outside these sections (the two home pages) falls back to
// the package name.
const SECTIONS: Record<string, { ru: string; en: string }> = {
  guides: { ru: "Руководства", en: "Guides" },
  languages: { ru: "Языки", en: "Languages" },
  reference: { ru: "Справочник API", en: "API reference" },
};

type Font = {
  name: string;
  data: Buffer;
  weight: 400 | 500;
  style: "normal";
};

// Fontsource ships one file per script, and satori binds a single file
// per family name — give both subsets the same name and the Cyrillic one
// is simply never consulted, so every Russian title renders as a row of
// "no glyph" boxes. Satori does fall back across a comma-separated
// family list, so the Cyrillic cut is registered under its own name and
// every `fontFamily` below names the pair. The site is Russian-first;
// this is the difference between a card and a row of tofu.
const FAMILIES: { name: string; pkg: string; weight: 400 | 500 }[] = [
  { name: "Playfair Display", pkg: "playfair-display", weight: 500 },
  { name: "JetBrains Mono", pkg: "jetbrains-mono", weight: 500 },
  { name: "Inter", pkg: "inter", weight: 400 },
];

// What to pass as `fontFamily` to get the Latin cut with the Cyrillic one
// behind it.
const DISPLAY = "Playfair Display, Playfair Display Cyrillic";
const MONO = "JetBrains Mono, JetBrains Mono Cyrillic";
const SANS = "Inter, Inter Cyrillic";

function loadFonts(): Font[] {
  return FAMILIES.flatMap(({ name, pkg, weight }) =>
    (["latin", "cyrillic"] as const).map((subset) => ({
      name: subset === "latin" ? name : `${name} Cyrillic`,
      data: readFileSync(
        join(
          DEPS,
          `@fontsource/${pkg}/files/${pkg}-${subset}-${weight}-normal.woff`,
        ),
      ),
      weight,
      style: "normal" as const,
    })),
  );
}

// node_modules, found from this file rather than from the cwd so the
// build works whatever directory it is started in.
const DEPS = join(
  dirname(new URL(import.meta.url).pathname),
  "..",
  "..",
  "node_modules",
);

// Satori takes React elements; these two build the same shape without a
// JSX pipeline, since this is the only file that needs it.
type Node = { type: string; props: Record<string, unknown> };

const el = (
  type: string,
  style: Record<string, unknown>,
  children?: unknown,
): Node => ({ type, props: { style, ...(children ? { children } : {}) } });

const label = (text: string, color: string, size = 15) =>
  el(
    "div",
    {
      fontFamily: MONO,
      fontSize: size,
      fontWeight: 500,
      letterSpacing: size * 0.16,
      color,
    },
    text.toUpperCase(),
  );

// Long titles get smaller type rather than overflowing the card. The
// endpoint titles run from a couple of words to a full sentence, so the
// steps are generous at the short end and tighten quickly.
function titleSize(title: string): number {
  if (title.length <= 24) return 82;
  if (title.length <= 40) return 68;
  if (title.length <= 60) return 56;
  if (title.length <= 90) return 44;
  return 36;
}

function card(title: string, description: string, kicker: string): Node {
  return el(
    "div",
    {
      width: WIDTH,
      height: HEIGHT,
      display: "flex",
      flexDirection: "column",
      backgroundColor: PAPER,
      padding: "64px 80px 56px",
    },
    [
      el(
        "div",
        {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        [label(RUNHEAD, INK_2), label(LANGS, INK_2, 13)],
      ),
      el("div", { height: 3, backgroundColor: INK, marginTop: 18 }),
      el("div", { marginTop: 34, display: "flex" }, [
        label(kicker, ACCENT, 17),
      ]),
      el(
        "div",
        {
          marginTop: 24,
          display: "flex",
          fontFamily: DISPLAY,
          fontWeight: 500,
          fontSize: titleSize(title),
          lineHeight: 1.04,
          letterSpacing: -1,
          color: INK,
        },
        title,
      ),
      // Pushes the footer to the bottom whatever the title height.
      el("div", { flexGrow: 1 }),
      el("div", { height: 1, backgroundColor: RULE }),
      el("div", { marginTop: 22, display: "flex" }, [
        el(
          "div",
          {
            fontFamily: SANS,
            fontSize: 22,
            lineHeight: 1.45,
            color: INK_2,
          },
          description,
        ),
      ]),
    ],
  );
}

// The lede is the page's own description, which is already clamped to 160
// characters for the search result — still two or three lines of 22px
// type, so it is trimmed again for the card.
function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  // The description may already end in an ellipsis from its own 160-char
  // clamp; trim any trailing punctuation so the two do not stack up into
  // "экосистем....".
  const trimmed = cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s.,;:…]+$/, "");
  return `${trimmed}…`;
}

function decode(html: string): string {
  return html
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function meta(head: string, selector: RegExp): string {
  return decode(selector.exec(head)?.[1] ?? "");
}

function htmlFiles(dir: string, base = dir): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full, base);
    return entry.isFile() && entry.name.endsWith(".html") ? [full] : [];
  });
}

export async function generateOgImages(
  outDir: string,
  origin: string,
): Promise<void> {
  const fonts = loadFonts();
  const originPath = new URL(origin).pathname;
  let written = 0;

  for (const file of htmlFiles(outDir)) {
    if (file.endsWith("404.html")) continue;

    const head = readFileSync(file, "utf-8").split("</head>")[0];
    const image = meta(
      head,
      /<meta[^>]+property="og:image"[^>]+content="([^"]*)"/,
    );

    // Only the cards this build promises; anything pointing at a static
    // image in public/ is left alone.
    if (!image.includes("/og/")) continue;

    const title = meta(head, /<title>([^<]*)<\/title>/).replace(
      / \| wb-api-client$/,
      "",
    );
    const description = meta(
      head,
      /<meta[^>]+name="description"[^>]+content="([^"]*)"/,
    );

    const route = new URL(image).pathname.slice(originPath.length);
    const section = route.replace(/^og\/(en\/)?/, "").split("/")[0];
    const isEnglish = route.startsWith("og/en/");
    const kicker = SECTIONS[section]
      ? SECTIONS[section][isEnglish ? "en" : "ru"]
      : "wb-api-client";

    const svg = await satori(
      card(title, clamp(description, 130), kicker) as never,
      { width: WIDTH, height: HEIGHT, fonts },
    );

    const png = new Resvg(svg, {
      fitTo: { mode: "width", value: WIDTH },
    })
      .render()
      .asPng();

    const target = join(outDir, route);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, png);
    written += 1;
  }

  console.log(`  og: ${written} share cards`);
}

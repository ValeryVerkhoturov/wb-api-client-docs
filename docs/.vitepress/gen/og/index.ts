import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { HEIGHT, SECTIONS, WIDTH, card, clamp } from "./card";
import { loadFonts } from "./fonts";

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

function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
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
      {
        width: WIDTH,
        height: HEIGHT,
        fonts,
      },
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

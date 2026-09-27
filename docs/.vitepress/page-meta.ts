// Facts read straight out of the Markdown sources, rather than out of
// VitePress's page data. Two callers need the same answers — the
// `transformPageData` hook in config.ts, which only ever sees one page at
// a time, and the llms.txt build in llms.ts, which runs over every file
// at once and has no page data at all — so the helpers live here instead
// of in either one.

import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// This file sits in docs/.vitepress/, so "../" is the docs root that
// every `relativePath` in VitePress is relative to.
export const DOCS_ROOT = fileURLToPath(new URL("..", import.meta.url));

// `guides/quickstart.md` -> `guides/quickstart`, `en/index.md` -> `en/`.
// Mirrors `cleanUrls: true`, so the result is the live URL path.
export function urlPath(relativePath: string): string {
  return relativePath.replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, "");
}

// Address of a page's Markdown twin, given that live URL path. Directory
// pages end in "/" (the site root is ""), where a bare "<path>.md" would
// name the directory rather than a file inside it.
export function mdPath(path: string): string {
  return path === "" || path.endsWith("/") ? `${path}index.md` : `${path}.md`;
}

// First real paragraph of a page, flattened to plain text — the lede that
// follows the h1 on every guide and reference page. Used as the meta and
// og:description so each page describes itself instead of repeating the
// site blurb. Home pages are frontmatter-driven and have none.
export function leadParagraph(relativePath: string): string | undefined {
  let source: string;
  try {
    source = readFileSync(`${DOCS_ROOT}${relativePath}`, "utf-8");
  } catch {
    return undefined;
  }

  const body = stripFrontmatter(source);
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
export function counterpart(relativePath: string): string | undefined {
  const other = relativePath.startsWith("en/")
    ? relativePath.slice(3)
    : `en/${relativePath}`;
  return existsSync(`${DOCS_ROOT}${other}`) ? other : undefined;
}

export function stripFrontmatter(source: string): string {
  return source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

// The frontmatter block itself, or "" when the page has none.
function frontmatter(source: string): string {
  return /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(source)?.[1] ?? "";
}

// A scalar out of the frontmatter, at any nesting depth — enough for the
// handful of keys these pages set (`title`, `description`, `layout`,
// `hero.tagline`) without pulling in a YAML parser for them. Returns the
// first match, which is what "the page's title" means here.
export function frontmatterValue(
  source: string,
  key: string,
): string | undefined {
  const match = new RegExp(`^\\s*${key}:\\s*(.+?)\\s*$`, "m").exec(
    frontmatter(source),
  );
  if (!match) return undefined;
  return match[1].replace(/^(["'])([\s\S]*)\1$/, "$2");
}

// What the page calls itself: the frontmatter title if it sets one, else
// its h1 — every generated endpoint page carries both, the hand-written
// guides only the h1.
export function pageTitle(source: string): string | undefined {
  return (
    frontmatterValue(source, "title") ??
    /^#\s+(.+?)\s*$/m.exec(stripFrontmatter(source))?.[1]
  );
}

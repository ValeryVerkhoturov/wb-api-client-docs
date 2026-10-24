import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const DOCS_ROOT = fileURLToPath(new URL("../../..", import.meta.url));

export function urlPath(relativePath: string): string {
  return relativePath.replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, "");
}

export function mdPath(path: string): string {
  return path === "" || path.endsWith("/") ? `${path}index.md` : `${path}.md`;
}

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

export function counterpart(relativePath: string): string | undefined {
  const other = relativePath.startsWith("en/")
    ? relativePath.slice(3)
    : `en/${relativePath}`;
  return existsSync(`${DOCS_ROOT}${other}`) ? other : undefined;
}

export function stripFrontmatter(source: string): string {
  return source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

function frontmatter(source: string): string {
  return /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(source)?.[1] ?? "";
}

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

export function pageTitle(source: string): string | undefined {
  return (
    frontmatterValue(source, "title") ??
    /^#\s+(.+?)\s*$/m.exec(stripFrontmatter(source))?.[1]
  );
}

export function endpointSignature(relativePath: string): string | undefined {
  let source: string;
  try {
    source = readFileSync(`${DOCS_ROOT}${relativePath}`, "utf-8");
  } catch {
    return undefined;
  }

  const match = /^```http\r?\n([A-Z]+)\s+(\S+)\r?\n```/m.exec(
    stripFrontmatter(source),
  );
  return match ? `${match[1]} ${match[2]}` : undefined;
}

function titleOf(relativePath: string): string | undefined {
  try {
    return pageTitle(readFileSync(`${DOCS_ROOT}${relativePath}`, "utf-8"));
  } catch {
    return undefined;
  }
}

export function breadcrumbTrail(
  relativePath: string,
): { name: string; path: string }[] {
  const prefix = relativePath.startsWith("en/") ? "en/" : "";
  const rest = relativePath.slice(prefix.length);

  if (rest === "index.md") return [];

  const trail: { name: string; path: string }[] = [];
  const segments = rest.split("/");

  for (let i = 0; i < segments.length - 1; i += 1) {
    const dir = `${prefix}${segments.slice(0, i + 1).join("/")}`;
    const name = titleOf(`${dir}/index.md`);
    if (name) trail.push({ name, path: `${dir}/` });
  }

  if (!rest.endsWith("index.md")) {
    const name = titleOf(relativePath);
    if (name) trail.push({ name, path: urlPath(relativePath) });
  }

  return trail;
}

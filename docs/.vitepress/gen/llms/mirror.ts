import {
  frontmatterValue,
  leadParagraph,
  mdPath,
  pageTitle,
  stripFrontmatter,
  urlPath,
} from "../kernel/pages";
import { read } from "../kernel/sources";

export interface PageLocale {
  lang: string;
}

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

export function page(
  relativePath: string,
  locale: PageLocale,
  origin: string,
): string {
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

export function entry(relativePath: string, origin: string): string {
  const source = read(relativePath);
  const title = pageTitle(source) ?? urlPath(relativePath);
  const description =
    frontmatterValue(source, "description") || leadParagraph(relativePath);

  return `- [${title}](${origin}${mdPath(urlPath(relativePath))})${
    description ? `: ${description}` : ""
  }`;
}

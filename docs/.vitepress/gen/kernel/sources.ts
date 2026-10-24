import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { DOCS_ROOT } from "./pages";

export function sources(dir = ""): string[] {
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

export function read(relativePath: string): string {
  return readFileSync(join(DOCS_ROOT, relativePath), "utf-8");
}

export function write(outDir: string, path: string, contents: string): void {
  const file = join(outDir, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, contents, "utf-8");
}

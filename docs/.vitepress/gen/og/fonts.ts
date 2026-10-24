import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";

export type Font = {
  name: string;
  data: Buffer;
  weight: 400 | 500;
  style: "normal";
};

const FAMILIES: { name: string; pkg: string; weight: 400 | 500 }[] = [
  { name: "Playfair Display", pkg: "playfair-display", weight: 500 },
  { name: "JetBrains Mono", pkg: "jetbrains-mono", weight: 500 },
  { name: "Inter", pkg: "inter", weight: 400 },
];

export const DISPLAY = "Playfair Display, Playfair Display Cyrillic";
export const MONO = "JetBrains Mono, JetBrains Mono Cyrillic";
export const SANS = "Inter, Inter Cyrillic";

const DEPS = join(
  dirname(new URL(import.meta.url).pathname),
  "..",
  "..",
  "..",
  "..",
  "node_modules",
);

export function loadFonts(): Font[] {
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

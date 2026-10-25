import { DISPLAY, MONO, SANS } from "./fonts";

export const WIDTH = 1200;
export const HEIGHT = 630;

const PAPER = "#f6f3ec";
const INK = "#17150f";
const INK_2 = "#58533f";
const RULE = "#d8d3c6";
const ACCENT = "#c2381c";

const RUNHEAD = "Wildberries Seller API · SDK";
const LANGS = "Python · TypeScript · Go · Java · PHP · OneScript · C# · Rust";

export const SECTIONS: Record<string, { ru: string; en: string }> = {
  guides: { ru: "Руководства", en: "Guides" },
  languages: { ru: "Языки", en: "Languages" },
  reference: { ru: "Справочник API", en: "API reference" },
};

export type Node = { type: string; props: Record<string, unknown> };

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

function titleSize(title: string): number {
  if (title.length <= 24) return 82;
  if (title.length <= 40) return 68;
  if (title.length <= 60) return 56;
  if (title.length <= 90) return 44;
  return 36;
}

export function card(title: string, description: string, kicker: string): Node {
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

export function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const trimmed = cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s.,;:…]+$/, "");
  return `${trimmed}…`;
}

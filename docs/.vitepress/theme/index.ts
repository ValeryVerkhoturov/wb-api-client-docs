// Editorial-modernist theme layer over VitePress's default theme.
//
// Everything is CSS: no component overrides, so upstream VitePress
// upgrades keep working. The rules in `editorial.css` are grouped in the
// same order as the page reads — masthead, hero, features, body copy,
// code, sidebar, footer.
import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";

import "./editorial.css";

export default {
  extends: DefaultTheme,
} satisfies Theme;

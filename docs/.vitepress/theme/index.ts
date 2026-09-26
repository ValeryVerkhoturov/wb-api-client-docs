// The look lives in its own package:
// https://github.com/ValeryVerkhoturov/vitepress-editorial-modernist
//
// It is a stylesheet over VitePress's default theme. Only what is
// specific to this site stays here — the decorative labels the theme
// leaves to the consumer, in both locales, loaded after it so they win
// the cascade.
import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";

import "vitepress-editorial-modernist/style.css";
import "./labels.css";

export default {
  extends: DefaultTheme,
} satisfies Theme;

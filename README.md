# wb-api-client-docs

Documentation site for [wb-api-client](https://github.com/ValeryVerkhoturov/wb-api-client) — the auto-generated SDKs for the Wildberries Seller API in Python, TypeScript, Go, Java, and PHP.

Live site: **https://valeryverkhoturov.github.io/wb-api-client-docs/**

Built with [VitePress](https://vitepress.dev). Deployed to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml`.

## Local dev

```bash
npm install
npm run docs:dev
# → http://localhost:5173/wb-api-client-docs/
```

## Build

```bash
npm run docs:build     # -> docs/.vitepress/dist
npm run docs:preview   # serve the built site locally
```

## Layout

```
docs/
  .vitepress/config.ts   # nav, sidebar, base path, search
  index.md               # landing page (hero + install/call code groups)
  guides/
    quickstart.md
    authentication.md
    error-handling.md
    custom-headers.md
    versioning.md
    architecture.md
    contributing.md
  languages/
    python.md
    typescript.md
    go.md
    java.md
    php.md
  reference/
    api/                 # GENERATED — endpoint reference, do not edit
      index.md
      <module>/index.md
      <module>/<method>-<path>.md
  en/                    # English mirror of everything above
  .vitepress/
    api-sidebar.ts       # GENERATED — sidebar for reference/api
.github/workflows/deploy.yml
```

## The API reference is generated

`docs/reference/api/`, `docs/en/reference/api/` and
`docs/.vitepress/api-sidebar.ts` are written by
[`scripts/gen-api-reference.py`](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/scripts/gen-api-reference.py)
in the **wb-api-client** repo — 305 operations across 13 modules, one page
each, in both locales. Hand-edits there are lost on the next upstream spec
change, so fix the generator instead.

The generator formats what it writes with this repo's own pinned Prettier
before it finishes, so the generated pages pass `npm run format:check` along
with everything else — they are not excluded from it.

They are regenerated and pushed here automatically by that repo's
`daily-check.yml` whenever Wildberries changes a spec, which triggers the
Pages deploy below. To rebuild them by hand from a wb-api-client checkout:

```bash
make reference DOCS=../wb-api-client-docs
```

## Publishing

Push to `main`. That's it — the workflow builds VitePress, uploads the artifact, and calls `actions/deploy-pages`.

One-time GitHub setup for a new repo:

1. **Settings → Pages** → **Source**: GitHub Actions.
2. **Settings → Environments** → confirm `github-pages` exists (auto-created after the first successful deploy).

## License

Apache 2.0 — see [LICENSE](LICENSE). Same license as the code repo.

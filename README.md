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
  languages/
    python.md
    typescript.md
    go.md
    java.md
    php.md
  reference/
    versioning.md
    architecture.md
    contributing.md
.github/workflows/deploy.yml
```

## Publishing

Push to `main`. That's it — the workflow builds VitePress, uploads the artifact, and calls `actions/deploy-pages`.

One-time GitHub setup for a new repo:

1. **Settings → Pages** → **Source**: GitHub Actions.
2. **Settings → Environments** → confirm `github-pages` exists (auto-created after the first successful deploy).

## License

Apache 2.0 — see [LICENSE](LICENSE). Same license as the code repo.

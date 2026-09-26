# Contributing

## Reporting issues

Bugs, spec-drift oddities, generator quirks: open an issue on the main code repo — [`ValeryVerkhoturov/wb-api-client/issues`](https://github.com/ValeryVerkhoturov/wb-api-client/issues).

Include:

- Which language client (Python / TypeScript / Go / Java / PHP)
- Which sub-module (`items`, `orders_fbs`, `analytics`, …)
- Version string from the manifest (`1.YYYYMMDD.N`)
- Minimal reproduction — one API call, one exception, one expected-vs-actual

Docs-site issues (typos, missing content, broken examples) go on the docs repo: [`ValeryVerkhoturov/wb-api-client-docs/issues`](https://github.com/ValeryVerkhoturov/wb-api-client-docs/issues).

## Do NOT hand-edit generated code

Every file under `clients/` in the main repo is generated. Editing there gets overwritten on the next daily-check run — the PR check will also flag it before merge.

If you find something wrong in generated output, the fix goes in one of:

- **`scripts/post-process.py`** — a new pass, if the fix applies to the spec before generation.
- **`scripts/inject-secret.py`** — if the fix is in the generated `Configuration` / `ApiClient` boilerplate.
- **`generator-configs/*.yaml`** — if it's an openapi-generator option toggle.
- **`templates/{lang}/*`** — if it's in the top-level manifest.

The [architecture reference](/en/reference/architecture) has the full pipeline map.

## Local development

```bash
git clone --recurse-submodules https://github.com/ValeryVerkhoturov/wb-api-client
cd wb-api-client

./scripts/download-swaggers.sh                # pull upstream (may 498 locally)
pip install -r scripts/requirements.txt       # ruamel.yaml, markdownify, black, flask
python  scripts/post-process.py               # -> swaggers/processed/
./scripts/generate.sh 1.20260920.0            # -> clients/{python,typescript,go,java,php}
make verify                                    # build + format check every language
```

`generate.sh` always regenerates all five languages. For per-language iteration during debugging, comment out the other four loops rather than adding a flag — the script is <200 lines and doesn't need argument plumbing.

Formatting runs inside Docker so contributors don't need language runtimes installed. `make verify-<lang>` and `make {black,prettier,gofmt,spotless,php-cs-fixer}` are individual targets. `make help` lists everything.

## PR flow

1. Fork the main repo.
2. Make your change to `scripts/`, `templates/`, `generator-configs/`, or a workflow.
3. Regenerate locally so `clients/` matches.
4. Commit `swaggers/`, `clients/`, and your source changes together.
5. Open a PR. The PR-check workflow will regenerate from scratch and fail if `git diff` is non-empty against your commit — that catches non-determinism.

## Contributing to the docs site

This site lives in [`ValeryVerkhoturov/wb-api-client-docs`](https://github.com/ValeryVerkhoturov/wb-api-client-docs).

```bash
git clone https://github.com/ValeryVerkhoturov/wb-api-client-docs
cd wb-api-client-docs

npm install
npm run docs:dev
# → http://localhost:5173/wb-api-client-docs/
```

Push to `main`; the deploy workflow builds and publishes to GitHub Pages automatically.

## License

Both repos are Apache 2.0. Contributions are assumed to be under the same license.

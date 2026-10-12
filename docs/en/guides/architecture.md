# Architecture

A one-page tour of what's actually in the [main repo](https://github.com/ValeryVerkhoturov/wb-api-client), so nothing about the generated clients feels magic.

## The pipeline

```
download-swaggers.sh   →  swaggers/*.yaml         (raw upstream, checksummed)
post-process.py        →  swaggers/processed/     (12 passes)
generate.sh <ver>      →  clients/<lang>/…        (openapi-generator-cli, 7 langs)
    ├── inject-secret.py           (SecretString wrapper per lang)
    ├── {black|prettier|gofmt|spotless|php-cs-fixer}   (canonicalize formatting)
    └── gen-readmes.py             (per-language README.md)
     ↓ committed at v<version>, single tag covers all 7 languages
publish.yml            →  PyPI / npm / Go tag / Maven Central / Packagist / hub.oscript.io / NuGet
gen-api-reference.py   →  wb-api-client-docs      (API reference: operation pages,
                                                   call snippets and data structures
                                                   in 7 languages, RU/EN)
```

Every step is a plain shell script or Python file, so nothing is hidden behind opaque tooling.

## Why generate?

WB ships OpenAPI specs. Hand-writing 13 clients × 7 languages would drift within a week. The upside of generating from the spec is that every field, every enum, every response wrapper is exactly what WB documents — and re-syncing takes exactly zero effort once the pipeline exists.

The downside is that generator output is generator output — sometimes ugly, sometimes carrying artifacts from spec quirks. Which is why there's a post-processing layer.

## post-process.py — 12 passes

1. **`inject_bearer_auth`** — drops WB's `HeaderApiKey` scheme (duplicated with the real bearer JWT semantics) and installs a single `BearerAuth` scheme instead. Every generated client then exposes exactly one auth code path.
2. **`fix_untyped_arrays`** — adds `items: {type: string}` to arrays missing their inner type (Go / TS would otherwise emit `[]any`).
3. **`inline_top_level_arrays`** — inlines every `$ref` to a `type: array` component and collapses `allOf: [array, description-only]` wrappers (openapi-generator mishandles arrays-at-root). Runs to fixed point because inlined subtrees can contain further refs.
4. **`rename_digit_prefixed_schemas`** — `409SupplyDeliverError` → `Http409SupplyDeliverError` (invalid Go identifier otherwise).
5. **`name_inline_response_schemas`** — hoists anonymous inline 4xx/5xx bodies to `<OperationId>Response<code>` (again, valid Go identifiers).
6. **`drop_response_required`** — WB marks nearly every response field `required`, but the live API omits fields at will, and every generated language then throws on deserialization. The pass deletes `required` from every schema reachable from a response; request bodies keep their `required` lists, so input validation is unaffected.
7. **`sanitize_non_ascii_enums`** — adds `x-enum-varnames` for Russian enum members like `"Склад WB"` (empty JS/Go/Java identifiers otherwise).
8. **`rename_tags_to_module`** — WB tags are Russian (`Финансовые отчёты`), which openapi-generator sanitizes to an empty class-name stem, so every language fell back to `Api`/`DefaultApi` classes. The pass rewrites every operation's tags to the module name (`Finances`, `Reports`, …), giving each module a single well-named API class (`FinancesApi`, …), and stashes the original tags in `x-original-tags` for the docs generator.
9. **`drop_date_formats`** — WB returns `""` for unset date fields (`fixTariffDateFrom`, `utdUcdDate`), which no strict date parser accepts. The pass strips `format: date` / `format: date-time` from string schemas so clients type these as plain strings.
10. **`htmlize_descriptions_to_markdown`** — every `description` field is passed through `markdownify` so HTML in docstrings renders as Markdown in generated docs.
11. **`absolutize_description_links`** — relative `[…](/openapi/…)` links get `https://dev.wildberries.ru` prepended so links in generated docstrings still work.
12. **`add_docs_links`** — appends a `Library doc: <url>` line to every operation's `description`, pointing at the operation's page on this site. Generators copy `description` into docstrings/Javadoc, so every client method links to its rendered docs. `gen-api-reference.py` strips the line back out, so the docs site itself is unaffected.

## generate.sh

- Runs `openapi-generator-cli` (pinned Docker image) per spec per language, into scratch directories.
- Splices each per-spec SDK into a unified per-language tree — Python packages nested under `wb_api_client.<slug>`, TypeScript subpath exports, Go sub-packages, Java sub-packages, PHP sub-namespaces, for OneScript a class-name prefix (the language has no namespaces), and C# namespaces.
- Runs `inject-secret.py` to patch every generated `Configuration` / `ApiClient` with the language-native secret-string wrapper.
- Runs the pinned formatter per language: `black`, `prettier`, `gofmt`, spotless (google-java-format), `php-cs-fixer`, `dotnet format`. All inside Docker — no host runtime needed.
- Substitutes `__VERSION__` in top-level manifests (`pyproject.toml`, `package.json`, `go.mod`, `pom.xml`, `composer.json`) with the passed version.
- Runs `gen-readmes.py` to emit a per-language `README.md`.

The result: `clients/{python,typescript,go,java,php,onescript,csharp}/` — seven ready-to-publish packages.

## Determinism

The daily job would flap constantly if generation weren't deterministic. To keep it stable:

- `openapi-generator-cli` Docker tag is pinned.
- Every language's `openapi-generator` config sets `hideGenerationTimestamp: true`.
- Every formatter is pinned to a specific version.
- The PR-check workflow regenerates from scratch and fails the PR if `git diff swaggers/ clients/` is non-empty. This catches any change that would make subsequent runs produce drift.

## Publishing

`daily-check.yml` computes the version, regenerates, commits, tags. Then it fires 7 `workflow_dispatch` events at `publish.yml` — one per language — with the tag as the `ref` input. Each language branch of `publish.yml`:

- Python — OIDC → PyPI trusted publishing (`pypa/gh-action-pypi-publish`).
- TypeScript — OIDC → npm trusted publishing (`npm publish --provenance`).
- Go — the tag is pushed to [`wb-api-client-go`](https://github.com/ValeryVerkhoturov/wb-api-client-go) (see below); the job itself is a no-op because `proxy.golang.org` fetches directly from the tag.
- Java — GPG-signed deploy to Maven Central via `central-publishing-maven-plugin`. Maven is pinned to 3.9.x (`stCarolas/setup-maven`): the plugin builds its bundle through a Maven-2 stager, and Maven 3.10's Resolver drops a stray `maven-metadata-local.xml` into it, so Central rejects the bundle ("Bundle has content that does NOT have a .pom file").
- PHP — ping the Packagist update-package API.
- OneScript — `opm build` then `opm push` to hub.oscript.io.
- C# — `dotnet pack` then `dotnet nuget push` to NuGet.

Separately, daily-check regenerates the API reference (`gen-api-reference.py` — operation pages, call snippets, and request/response data structures per language, with links to the WB specification) and pushes it to `wb-api-client-docs`, which deploys to GitHub Pages.

Reusable workflows (`workflow_call`) would be cleaner, but PyPI + npm trusted publishing don't support them — both the OIDC token's `job_workflow_ref` (callee) and the Sigstore attestation cert's `workflow_ref` (caller) have to point at the same file, which is impossible with `workflow_call`. Hence `workflow_dispatch`.

## The sibling repositories

Three languages live in their own repos, mounted here as git submodules:

- [`ValeryVerkhoturov/wb-api-client-php`](https://github.com/ValeryVerkhoturov/wb-api-client-php) → `clients/php`. Reason: Packagist requires `composer.json` at the ROOT of the crawled repo.
- [`ValeryVerkhoturov/wb-api-client-1c`](https://github.com/ValeryVerkhoturov/wb-api-client-1c) → `clients/onescript`. So 1C users can clone just the client and install it from a tag.
- [`ValeryVerkhoturov/wb-api-client-go`](https://github.com/ValeryVerkhoturov/wb-api-client-go) → `clients/go`. Reason: Go versions modules with repository tags, so the module must sit at a repo root (`go get github.com/ValeryVerkhoturov/wb-api-client-go`) — a subdirectory module would need `clients/go/`-prefixed tags and `go get` would fetch the whole monorepo.

Every daily run commits and tags all three siblings BEFORE the main repo — otherwise the submodule pointers recorded in the release commit would reference commits their remotes have never seen, and a fresh `git clone --recurse-submodules` would fail.

A fourth sibling is [`ValeryVerkhoturov/wb-api-client-docs`](https://github.com/ValeryVerkhoturov/wb-api-client-docs) — this site. Not a submodule: daily-check clones it, runs `gen-api-reference.py`, and pushes the result back.

## The OneScript generator

openapi-generator ships no OneScript target, so it lives in a separate repo — [`ValeryVerkhoturov/onescript-openapi-generator`](https://github.com/ValeryVerkhoturov/onescript-openapi-generator). It is an ordinary plugin: the class extends `DefaultCodegen`, registers through `META-INF/services`, and is loaded next to `openapi-generator-cli.jar`, so `-g onescript` resolves like a built-in generator. The main repo pins it by commit — the OneScript equivalent of pinning the Docker image tag for the other languages.

## What's not generated

The hand-written parts of the main repo:

- `scripts/*` — the pipeline itself (download, post-process, generate, inject-secret, gen-readmes).
- `generator-configs/*.yaml` — one openapi-generator config per language.
- `templates/*` — top-level manifests with `__VERSION__` placeholders.
- `.github/workflows/*` — daily-check, per-language publish, PR drift check.
- `Makefile`, `README.md`, `CLAUDE.md`.

Everything under `clients/` is generated output — never hand-edit it, regenerate.

## Full pipeline docs

The main-repo [`CLAUDE.md`](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/CLAUDE.md) is a working, machine-readable version of the same content — kept up to date because CI itself reads it.

<p align="center">
  <img src="/pics/blueberry-academic-cap-ascii-animated.webp" style="height: 200px; width: auto; max-width: 100%; object-fit: contain" alt="wb-api-client mascot">
</p>

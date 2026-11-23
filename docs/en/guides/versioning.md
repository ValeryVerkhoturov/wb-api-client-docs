# Versioning

All eight language packages share one version string per release — full **semver `MAJOR.MINOR.PATCH`** (since `2.0.0`; earlier releases used the `1.YYYYMMDD.N` format).

## Format

| Field   | When it increments                                                                                                                                         |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MAJOR` | Breaking changes: removed or renamed operations, parameters, fields; narrowed types; new required fields — anything that can break existing consumer code. |
| `MINOR` | Backward-compatible additions: new operations, optional parameters and fields, new enum values.                                                            |
| `PATCH` | Non-functional spec edits: descriptions, examples, typos.                                                                                                  |

Example: `2.1.0` — a backward-compatible addition on top of `2.0.0`.

## Where the number comes from

`daily-check.yml` runs `scripts/compute-version.py`: it takes the upstream diff (`git diff HEAD -- specs/unprocessed/ru`) and asks the **DeepSeek API** to classify it as `major` / `minor` / `patch`, then increments the highest `v2+` git tag. With no `v2+` tag yet, it emits `2.0.0`. Without `DEEPSEEK_API_KEY` or on API failure it defaults to `minor` (WB upstream changes are overwhelmingly additive); an empty diff (forced re-run) means `patch`.

The resulting string goes into every language's manifest — `pyproject.toml`, `package.json`, `go.mod` tag, `pom.xml`, `composer.json`, `Cargo.toml` — verbatim. No language sees a translated form.

`MAJOR ≥ 2` is why the Go module path carries the `/v2` suffix: `github.com/ValeryVerkhoturov/wb-api-client-go/v2` (a Go modules requirement).

## What "latest" resolves to

Because every release is a **stable** (non-prerelease) version, `@latest` / `LATEST` / `^2.0.0` all pick the highest published:

::: code-group

```bash [Python]
pip install valeryverkhoturov-wb-api-client
```

```bash [TypeScript]
npm install @valeryverkhoturov/wb-api-client
```

```bash [Go]
go get github.com/ValeryVerkhoturov/wb-api-client-go/v2@latest
```

```xml [Java]
<version>[2.0.0,)</version>   <!-- range: any 2.x -->
```

```bash [PHP]
composer require valeryverkhoturov/wb-api-client
```

```bash [OneScript]
opm install wb-api-client
```

```bash [C#]
dotnet add package ValeryVerkhoturov.WbApiClient
```

```bash [Rust]
cargo add wb-api-client
```

:::

## Pinning a version

Pin the exact `X.Y.Z` when reproducibility matters (CI, production deploys):

::: code-group

```txt [Python]
valeryverkhoturov-wb-api-client==2.0.0
```

```json [TypeScript]
"@valeryverkhoturov/wb-api-client": "2.0.0"
```

```bash [Go]
go get github.com/ValeryVerkhoturov/wb-api-client-go/v2@v2.0.0
```

```xml [Java]
<version>2.0.0</version>
```

```json [PHP]
"valeryverkhoturov/wb-api-client": "2.0.0"
```

```bsl [OneScript]
.ЗависитОт("wb-api-client", "2.0.0")
```

```xml [C#]
<PackageReference Include="ValeryVerkhoturov.WbApiClient" Version="2.0.0" />
```

```toml [Rust]
wb-api-client = "=2.0.0"
```

:::

## Release cadence

New versions get cut only when upstream specs actually change. Concretely: `daily-check.yml` runs at 06:15 UTC, checksum-diffs `specs/unprocessed/ru/checksums.txt` against the previous run, and only re-generates + tags if anything moved. A quiet week produces no releases; a WB portal deploy typically produces one the next morning.

Manually forcing a release (e.g. to pick up a client-side fix): `Actions → Daily upstream check → Run workflow` with `force: true`.

## Deprecations

WB removes fields on their own schedule. When they do:

1. Their spec drops the field.
2. Next daily-check regenerates without the field.
3. A new version publishes with the field gone.
4. Callers on the previous version keep working (their local models still have it, they just get nulls).

There is no formal deprecation window — the upstream contract is the source of truth. Pin an old version if you need time to migrate.

## Multi-language version drift — impossible by construction

Because the same `X.Y.Z` is stamped into every language's manifest in the same generate-clients.py invocation, and every language is regenerated in every release run, you cannot end up with "Python 2.1.0 but Go 2.0.3" from a single upstream state — they're always in lockstep.

The only way to skew: a language's publish step fails (e.g. Maven Central rejects a signature). The tag exists and the source is on GitHub; a manual re-run of the failed publish job for that specific language fixes it.

<p align="center">
  <img src="/pics/blueberry-calendar-ascii-animated.webp" style="height: 200px; width: auto; max-width: 100%; object-fit: contain" alt="wb-api-client mascot">
</p>

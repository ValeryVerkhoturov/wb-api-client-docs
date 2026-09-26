# Versioning

All five language packages share one version string per release: **`1.YYYYMMDD.N`**.

## Format

| Field   | Value                         | Why                                                                                                                                                                                                  |
| ------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MAJOR` | `1` — fixed                   | Keeps Go's module path free of the `/vN` suffix that `MAJOR ≥ 2` would require. Any real breaking change to the pipeline surfaces as a major-version bump of the _code repo_, not a new module path. |
| `MINOR` | `YYYYMMDD` (UTC release date) | Monotonic across days — `20260919 < 20260920 < 20261001`. Sorts as an integer under semver rules.                                                                                                    |
| `PATCH` | `N` — same-day counter        | `0` for the first release of a day, `1`, `2`, … for repeats (rare).                                                                                                                                  |

Example: `1.20260921.0` — first release cut on 21 Sep 2026 UTC.

## Where the number comes from

The daily-check workflow computes it inline:

```bash
today="$(date -u +%Y%m%d)"
n="$(git tag --list "v1.${today}.*" | wc -l | tr -d ' ')"
version="1.${today}.${n}"
```

The resulting string goes into every language's manifest — `pyproject.toml`, `package.json`, `go.mod` tag, `pom.xml`, `composer.json` — verbatim. No language sees a translated form.

## What "latest" resolves to

Because every release is a **stable** (non-prerelease) version, `@latest` / `LATEST` / `^1.0.0` all pick the highest published:

::: code-group

```bash [Python]
pip install valeryverkhoturov-wb-api-client
```

```bash [TypeScript]
npm install @valeryverkhoturov/wb-api-client
```

```bash [Go]
go get github.com/ValeryVerkhoturov/wb-api-client/clients/go@latest
```

```xml [Java]
<version>[1.0.0,)</version>   <!-- range: any 1.x -->
```

```bash [PHP]
composer require valeryverkhoturov/wb-api-client
```

```bash [OneScript]
opm install wb-api-client
```

:::

## Pinning a version

Pin the exact `1.YYYYMMDD.N` when reproducibility matters (CI, production deploys):

::: code-group

```txt [Python]
valeryverkhoturov-wb-api-client==1.20260921.0
```

```json [TypeScript]
"@valeryverkhoturov/wb-api-client": "1.20260921.0"
```

```bash [Go]
go get github.com/ValeryVerkhoturov/wb-api-client/clients/go@v1.20260921.0
```

```xml [Java]
<version>1.20260921.0</version>
```

```json [PHP]
"valeryverkhoturov/wb-api-client": "1.20260921.0"
```

```bsl [OneScript]
.ЗависитОт("wb-api-client", "1.20260921.0")
```

:::

## Release cadence

New versions get cut only when upstream specs actually change. Concretely: `daily-check.yml` runs at 06:15 UTC, checksum-diffs `swaggers/` against the previous run, and only re-generates + tags if anything moved. A quiet week produces no releases; a WB portal deploy typically produces one the next morning.

Manually forcing a release (e.g. to pick up a client-side fix): `Actions → Daily upstream check → Run workflow` with `force: true`.

## Deprecations

WB removes fields on their own schedule. When they do:

1. Their spec drops the field.
2. Next daily-check regenerates without the field.
3. A new version publishes with the field gone.
4. Callers on the previous version keep working (their local models still have it, they just get nulls).

There is no formal deprecation window — the upstream contract is the source of truth. Pin an old version if you need time to migrate.

## Multi-language version drift — impossible by construction

Because the same `1.YYYYMMDD.N` is stamped into every language's manifest in the same generate.sh invocation, and every language is regenerated in every release run, you cannot end up with "Python 1.20260921.0 but Go 1.20260919.0" from a single upstream state — they're always in lockstep.

The only way to skew: a language's publish step fails (e.g. Maven Central rejects a signature). The tag exists and the source is on GitHub; a manual re-run of the failed publish job for that specific language fixes it.

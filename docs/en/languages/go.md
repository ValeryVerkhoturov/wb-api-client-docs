# Go

Module: `github.com/ValeryVerkhoturov/wb-api-client-go` — resolved from git tags on its [dedicated repo](https://github.com/ValeryVerkhoturov/wb-api-client-go).

- **Go:** 1.22+
- **HTTP:** `net/http` (standard library)
- **Secret wrapper:** [`github.com/negrel/secrecy`](https://github.com/negrel/secrecy)

## Install

```bash
go get github.com/ValeryVerkhoturov/wb-api-client-go@latest
```

Pin a specific version by tag:

```bash
go get github.com/ValeryVerkhoturov/wb-api-client-go@v1.20260926.0
```

`proxy.golang.org` fetches directly from the pushed tag — no separate registry.

## Why the module lives in its own repo

Go's convention is one module per repo, so the client lives in [wb-api-client-go](https://github.com/ValeryVerkhoturov/wb-api-client-go) with `go.mod` at its root. Release tags (`vX.Y.Z`) are pushed to that repo by the same pipeline that tags the main one — Go picks up whichever tag matches the release.

Because `MAJOR = 1` is fixed (see [versioning](/en/guides/versioning)), there's no `/v2` suffix now or later.

## Import shape

One Go package per WB API category, each with its own `Configuration`, `APIClient`, and `*API` types.

```go
import wbitems "github.com/ValeryVerkhoturov/wb-api-client-go/items"
```

Alias each sub-module (`wbitems`, `wbfbs`, `wbanalytics`, …) so call sites are readable — they all export the same identifier names.

## Sub-modules

`general`, `items`, `orders_fbs`, `orders_dbw`, `dbs`, `in_store_pickup`, `orders_fbw`, `promotion`, `communications`, `rates`, `analytics`, `reports`, `finances`.

Per-module `*API` structs and endpoint methods are enumerated in the per-release README: [wb-api-client-go/README.md](https://github.com/ValeryVerkhoturov/wb-api-client-go#readme).

## Auth

```go
package main

import (
    "context"
    "fmt"

    wbitems "github.com/ValeryVerkhoturov/wb-api-client-go/items"
)

func main() {
    cfg := wbitems.NewConfiguration()
    cfg.SetAccessToken("<your WB JWT>")   // wrapped in *secrecy.SecretString
    client := wbitems.NewAPIClient(cfg)

    v, _, err := client.DefaultAPI.SomeEndpoint(context.Background()).Execute()
    if err != nil {
        panic(err)
    }
    fmt.Printf("%+v\n", v)
}
```

`SetAccessToken` is the ONLY path — the openapi-generator-default `ContextAccessToken` context-value channel is stripped so there's no way to accidentally bypass the wrapper.

To read the raw value back:

```go
cfg.AccessToken.ExposeSecret()
```

## Contexts

Every call takes a `context.Context`. Wire your app's deadline/cancellation through — the client honors it:

```go
ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
defer cancel()
v, _, err := client.DefaultAPI.SomeEndpoint(ctx).Execute()
```

## Custom HTTP client

Wire an `*http.Client` for proxying, custom timeouts, or a transport wrapper:

```go
cfg := wbitems.NewConfiguration()
cfg.HTTPClient = &http.Client{
    Timeout: 60 * time.Second,
    Transport: &http.Transport{
        Proxy: http.ProxyFromEnvironment,
    },
}
```

## Testing

Override the host at Configuration construction:

```go
cfg := wbitems.NewConfiguration()
cfg.Host = "localhost:8080"
cfg.Scheme = "http"
```

## See also

- [Authentication guide](/en/guides/authentication)
- [Error handling](/en/guides/error-handling)
- [Full per-module reference on GitHub](https://github.com/ValeryVerkhoturov/wb-api-client-go#readme)

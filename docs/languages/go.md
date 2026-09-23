# Go

Module: `github.com/ValeryVerkhoturov/wb-api-client/clients/go` — resolved from git tags on the [main repo](https://github.com/ValeryVerkhoturov/wb-api-client).

- **Go:** 1.22+
- **HTTP:** `net/http` (standard library)
- **Secret wrapper:** [`github.com/negrel/secrecy`](https://github.com/negrel/secrecy)

## Install

```bash
go get github.com/ValeryVerkhoturov/wb-api-client/clients/go@latest
```

Pin a specific version by tag:

```bash
go get github.com/ValeryVerkhoturov/wb-api-client/clients/go@v1.20260921.0
```

`proxy.golang.org` fetches directly from the pushed tag — no separate registry.

## Why the module path stays under `/clients/go`

The main repo hosts five language clients; Go's convention is one module per repo, so the module path includes the sub-directory. Version tags cover all five languages simultaneously — Go picks up whichever tag exists on the commit that produced its sources.

Because `MAJOR = 1` is fixed (see [versioning](/reference/versioning)), there's no `/v2` suffix now or later.

## Import shape

One Go package per WB API category, each with its own `Configuration`, `APIClient`, and `*API` types.

```go
import wbitems "github.com/ValeryVerkhoturov/wb-api-client/clients/go/items"
```

Alias each sub-module (`wbitems`, `wbfbs`, `wbanalytics`, …) so call sites are readable — they all export the same identifier names.

## Sub-modules

`general`, `items`, `orders_fbs`, `orders_dbw`, `dbs`, `in_store_pickup`, `orders_fbw`, `promotion`, `communications`, `rates`, `analytics`, `reports`, `finances`.

Per-module `*API` structs and endpoint methods are enumerated in the per-release README: [clients/go/README.md](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/clients/go/README.md).

## Auth

```go
package main

import (
    "context"
    "fmt"

    wbitems "github.com/ValeryVerkhoturov/wb-api-client/clients/go/items"
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

- [Authentication guide](/guides/authentication)
- [Error handling](/guides/error-handling)
- [Full per-module reference on GitHub](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/clients/go/README.md)

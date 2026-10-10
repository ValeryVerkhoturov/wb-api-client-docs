# Custom headers

Sometimes every request needs a header the WB spec knows nothing about: credentials for a gateway or corporate proxy sitting in front of the API, a trace identifier, an environment tag. Every client can add them — the mechanism differs per language, and all seven are covered below.

## What this is not for

Two things are worth separating up front, or you will end up adding a header the client already sets.

**The WB token.** The client builds the `Authorization` header itself from your token — see [Authentication](/en/guides/authentication). Do not assemble it by hand through the mechanisms on this page: in some languages (Go) that produces two `Authorization` headers on one request.

**Headers declared in the spec.** If a header is declared on an operation, the generator has already turned it into an ordinary method argument. WB has a couple: `X-Nm-Id` and `X-Photo-Number` on `postV3MediaFile` in the `items` sub-module. Pass those as arguments, not as custom headers.

What is left is everything else — headers the spec does not know about. Those are what we add here.

## Headers for the whole client

The common case: the header belongs on every request. Set it once, when you build the client.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

client = ApiClient(Configuration(access_token="<your WB JWT>"))
client.set_default_header("X-Gateway-Token", "<gateway credentials>")
client.set_default_header("X-Request-Source", "erp-sync")

api = ItemsApi(client)
```

```ts [TypeScript]
import {
  Configuration,
  ItemsApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({
  baseOptions: {
    headers: {
      "X-Gateway-Token": "<gateway credentials>",
      "X-Request-Source": "erp-sync",
    },
  },
});
cfg.setAccessToken("<your WB JWT>");

const api = new ItemsApi(cfg);
```

```go [Go]
import wbitems "github.com/ValeryVerkhoturov/wb-api-client/clients/go/items"

cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
cfg.AddDefaultHeader("X-Gateway-Token", "<gateway credentials>")
cfg.AddDefaultHeader("X-Request-Source", "erp-sync")

client := wbitems.NewAPIClient(cfg)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.ItemsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
client.addDefaultHeader("X-Gateway-Token", "<gateway credentials>");
client.addDefaultHeader("X-Request-Source", "erp-sync");

ItemsApi api = new ItemsApi(client);
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));

// PHP's Configuration has no header registry — the Guzzle client holds them.
$http = new Client([
    'headers' => [
        'X-Gateway-Token' => '<gateway credentials>',
        'X-Request-Source' => 'erp-sync',
    ],
]);

$api = new ItemsApi($http, $config);
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Настройки.ДополнительныеЗаголовки.Вставить("X-Gateway-Token", "<gateway credentials>");
Настройки.ДополнительныеЗаголовки.Вставить("X-Request-Source", "erp-sync");

Клиент = Новый ItemsApi(Настройки);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
config.DefaultHeaders["X-Gateway-Token"] = "<gateway credentials>";
config.DefaultHeaders["X-Request-Source"] = "erp-sync";

var api = new ItemsApi(config);
```

:::

Headers live on a `Configuration` / `ApiClient` instance — and each sub-module has its own. If you use both `items` and `orders_fbs`, set the headers on both; see [Multiple sub-modules, one token](/en/guides/authentication#multiple-sub-modules-one-token).

## Headers for a single request

Not every client can set a header for one call — it depends on what openapi-generator emitted for that language.

| Language   | Per-call support                                     |
| ---------- | ---------------------------------------------------- |
| Python     | yes — a `_headers=` keyword argument on every method |
| TypeScript | yes — a trailing `RawAxiosRequestConfig` argument    |
| Go         | no — methods take no headers                         |
| Java       | no                                                   |
| PHP        | no                                                   |
| C#         | no                                                   |
| OneScript  | no — `Заголовки` are assembled inside the method     |

::: code-group

```python [Python]
# Careful: default headers override _headers when the names collide.
tags = api.get_v2_tags(_headers={"X-Correlation-Id": "9f1c-…"})
```

```ts [TypeScript]
// The opposite here: a per-call header beats baseOptions and Authorization.
const tags = await api.getV2Tags({
  headers: { "X-Correlation-Id": "9f1c-…" },
});
```

:::

In the other five languages, if a header is only needed on some requests, build a second client instance carrying its own headers and route those calls through it.

## Precedence

Each generator merges headers in its own order, and it is not always the intuitive one. Verified against the generated code:

| Language   | Order (rightmost wins)                                                                | Note                                                                                          |
| ---------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Python     | `_headers` → default headers                                                          | **Defaults win**: `default_headers` are applied on top of `_headers`                          |
| TypeScript | auth → `baseOptions.headers` → per-call headers                                       | a config header can override `Authorization` too                                              |
| Go         | —                                                                                     | uses `Header.Add`, so it **appends rather than replaces**: a duplicate name sends two headers |
| Java       | `defaultHeaderMap` over operation headers                                             | replaces by name                                                                              |
| PHP        | request headers → Guzzle defaults                                                     | Guzzle client defaults apply only when the header is not already set                          |
| C#         | `DefaultHeaders` → operation headers                                                  | replaces by name                                                                              |
| OneScript  | `Accept`/`User-Agent`/`Authorization` → `ДополнительныеЗаголовки` → operation headers | `Соответствие.Вставить` replaces the value                                                    |

The practical takeaway is the same everywhere: do not use the mechanisms on this page to override a header the client already sets. `User-Agent` has a dedicated setting in every language, and `Authorization` has the token setter.

## Secrets in headers

`SecretString` wraps the WB token **only**. Gateway or partner-service credentials are plain strings, and the client does not redact them: they appear in full in an HTTP-client log or a configuration dump.

So the same rules apply to them as to the WB token:

1. Keep the value in a secret manager (Vault, SSM, a GitHub Actions secret), not in source.
2. Read it into an environment variable at process start and build the client once.
3. Check that your request logger does not dump headers wholesale — or add your header names to its redaction list.

If you log requests through middleware, add these header names to the same filter that already holds `Authorization`.

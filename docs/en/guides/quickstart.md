# Quickstart

Five minutes: get a token, install the client for your language, make your first API call.

## 1. Get a WB API token

The client libraries are transports — you still need a Wildberries seller account and a personal API token.

1. Sign in at [seller.wildberries.ru](https://seller.wildberries.ru).
2. Open **Настройки → Доступ к API** (Settings → API access).
3. Create a token with the scopes you need. For a first test, tick **Контент** (Content) — that's what powers the `items` sub-module.
4. Copy the JWT. You won't be able to view it again.

Tokens are per-seller and per-scope. If you need to call multiple API categories (`items`, `orders_fbs`, `analytics`, …) create tokens with the union of scopes you need — or one token per scope if you want to keep blast radius small.

## 2. Install

Every SDK ships one package per language. All 13 API categories are inside as sub-modules.

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

```xml [Java (Maven)]
<dependency>
  <groupId>io.github.valeryverkhoturov</groupId>
  <artifactId>wb-api-client</artifactId>
  <version>LATEST</version>
</dependency>
```

```bash [PHP]
composer require valeryverkhoturov/wb-api-client
```

:::

`LATEST` for Java: check the [releases page](https://github.com/ValeryVerkhoturov/wb-api-client/releases) for the current `1.YYYYMMDD.N` version and paste it in.

## 3. First call — list your seller info

The `general` sub-module has a `getV1SellerInfo` endpoint that's cheap to call and confirms both your token and your network path.

::: code-group

```python [Python]
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import DefaultApi

cfg = Configuration(access_token="<your WB JWT>")
api = DefaultApi(ApiClient(cfg))

info = api.get_v1_seller_info()
print(info)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/general";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const info = await api.getV1SellerInfo();
console.log(info.data);
```

```go [Go]
package main

import (
    "context"
    "fmt"

    wbgeneral "github.com/ValeryVerkhoturov/wb-api-client/clients/go/general"
)

func main() {
    cfg := wbgeneral.NewConfiguration()
    cfg.SetAccessToken("<your WB JWT>")
    client := wbgeneral.NewAPIClient(cfg)

    info, _, err := client.DefaultAPI.GetV1SellerInfo(context.Background()).Execute()
    if err != nil {
        panic(err)
    }
    fmt.Printf("%+v\n", info)
}
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.general.ApiClient;
import io.github.valeryverkhoturov.wbapi.general.SecretString;
import io.github.valeryverkhoturov.wbapi.general.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV1SellerInfo());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1SellerInfo());
```

:::

If that returns your seller data — you're wired up.

## 4. Where to go next

- **[Authentication](/en/guides/authentication)** — how the secret-string wrapper works, why you should never print your token, and how to expose the raw value when you actually need to.
- **[Error handling](/en/guides/error-handling)** — WB's status codes, retry strategy for 429/5xx, and how errors surface in each language.
- **[Language pages](/en/languages/python)** — every sub-module, install snippet, and the shape of each `Api` class.

## Troubleshooting the first call

| Symptom | Likely cause | Fix |
|---|---|---|
| `401 Unauthorized` | Token wrong / expired / not for this scope | Regenerate in Seller portal; ensure the scope matches the module (e.g. `Контент` for `items`) |
| `403 Forbidden` | Token valid but scope insufficient | Add the required scope to the token, or make a new one |
| `429 Too Many Requests` | You've hit WB's rate limit | Wait for `Retry-After` and back off; the SDK does not auto-retry |
| Connection hangs | Corporate proxy / TLS interception | Set `HTTPS_PROXY` env var; most clients honor it |
| `ImportError` / `Cannot find module` | Installed the wrong package name | Package is `valeryverkhoturov-wb-api-client` / `@valeryverkhoturov/wb-api-client` — the bare `wb-api-client` name is a different project |

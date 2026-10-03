# Quickstart

Five minutes: get a token, install the client for your language, make your first API call.

## 1. Get a WB API token

The client libraries are transports — you still need a Wildberries seller account and a personal API token.

1. Sign in at [seller.wildberries.ru](https://seller.wildberries.ru) and open the [Интеграции по API](https://seller.wildberries.ru/api-integrations) (API integrations) section.
2. Click **+ Создать токен** (+ Create token) and pick the **Для интеграции вручную** (Manual integration) tab.
3. Choose the token type — **персональный** (personal) or **базовый** (base) for normal work, **тестовый** (test) for the sandbox.
4. Fill in the name, pick the method categories and the access level (**Чтение и запись** — read & write, or **Только чтение** — read only). For a first test, **Контент** (Content) is enough — that's what powers the `items` sub-module.
5. For a personal token, tick the **Я понимаю, что не следует передавать токен третьим лицам** ("I understand the token must not be shared with third parties") checkbox and click **Создать** (Create).
6. Click **Скопировать и закрыть** (Copy and close) — the token lands on your clipboard. You won't be able to view it again.

Only pick the categories you plan to work with. If you need to call multiple API categories (`items`, `orders_fbs`, `analytics`, …) create a token with the union of categories — or one token per category to keep blast radius small.

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

```bash [OneScript]
opm install wb-api-client
```

```bash [C#]
dotnet add package ValeryVerkhoturov.WbApiClient
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

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ИнформацияОПродавцеApi(Настройки);

Сообщить(Клиент.GetV1SellerInfo().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1SellerInfo());
```

:::

If that returns your seller data — you're wired up.

## 4. Where to go next

- **[Authentication](/en/guides/authentication)** — how the secret-string wrapper works, why you should never print your token, and how to expose the raw value when you actually need to.
- **[Error handling](/en/guides/error-handling)** — WB's status codes, retry strategy for 429/5xx, and how errors surface in each language.
- **[Language pages](/en/languages/python)** — every sub-module, install snippet, and the shape of each `Api` class.

## Troubleshooting the first call

| Symptom                              | Likely cause                                  | Fix                                                                                                                                      |
| ------------------------------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `401 Unauthorized`                   | Token wrong / expired / not for this category | Regenerate in Seller portal; ensure the category matches the module (e.g. `Контент` for `items`)                                         |
| `403 Forbidden`                      | Token valid but category missing              | Add the required category to the token, or make a new one                                                                                |
| `429 Too Many Requests`              | You've hit WB's rate limit                    | Wait `X-Ratelimit-Retry` seconds from the response and back off; the SDK does not auto-retry                                             |
| Connection hangs                     | Corporate proxy / TLS interception            | Set `HTTPS_PROXY` env var; most clients honor it                                                                                         |
| `ImportError` / `Cannot find module` | Installed the wrong package name              | Package is `valeryverkhoturov-wb-api-client` / `@valeryverkhoturov/wb-api-client` — the bare `wb-api-client` name is a different project |

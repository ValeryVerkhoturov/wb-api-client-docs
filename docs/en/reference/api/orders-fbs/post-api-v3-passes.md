---
title: "Создать пропуск"
description: "Метод создаёт пропуск продавца с привязкой к складу WB. Пропуск действует 48 часов со времени создания."
---

# Создать пропуск

```http
POST /api/v3/passes
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** Пропуска FBS · [Library doc ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/en/reference/api/orders-fbs/post-api-v3-passes) · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbs#tag/fbsPasses/operation/postV3Passes)

Метод создаёт [пропуск продавца](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsPasses/operation/getV3Passes) с привязкой к складу WB.
Пропуск действует 48 часов со времени создания.

Максимум 1 запрос в 10 [минут](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца.
Один запрос с кодами ответов `4XX` учитывается как 10 запросов.

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description            | Schema                    |
| ----- | ---------------------- | ------------------------- |
| `201` | Создано                | `PostV3PassesResponse201` |
| `400` | Неправильный запрос    | `Error`                   |
| `401` | Не авторизован         | `object`                  |
| `402` | Требуется платёж       | `object`                  |
| `403` | Доступ запрещён        | `Error`                   |
| `404` | Не найдено             | `Error`                   |
| `429` | Слишком много запросов | `object`                  |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<your WB JWT>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.post_v3_passes(post_v3_passes_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbsApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new OrdersFbsApi(cfg);

const { data } = await api.postV3Passes(postV3PassesRequest);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbordersfbs "github.com/ValeryVerkhoturov/wb-api-client-go/orders_fbs"
)

cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.PostV3Passes(context.Background()).PostV3PassesRequest(postV3PassesRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.OrdersFbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.postV3Passes(postV3PassesRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->postV3Passes($post_v3_passes_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.PostV3Passes(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.PostV3Passes(postV3PassesRequest));
```

:::

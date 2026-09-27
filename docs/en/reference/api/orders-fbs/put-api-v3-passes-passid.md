---
title: "Обновить пропуск"
description: "Метод обновляет данные пропуска продавца. В том числе, можно обновить данные привязанного склада WB."
---

# Обновить пропуск

```http
PUT /api/v3/passes/{passId}
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** Пропуска FBS · [WB documentation ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsPasses/operation/putV3PassesPassId)

Метод обновляет данные [пропуска продавца](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsPasses/operation/getV3Passes). В том числе, можно обновить данные привязанного склада WB.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                          | Лимит        | Интервал | Всплеск     |
| --------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                           | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов. |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Маркетплейса**.

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description            | Schema   |
| ----- | ---------------------- | -------- |
| `204` | Обновлено              | —        |
| `400` | Неправильный запрос    | `Error`  |
| `401` | Не авторизован         | `object` |
| `402` | Требуется платёж       | `object` |
| `403` | Доступ запрещён        | `Error`  |
| `404` | Не найдено             | `Error`  |
| `429` | Слишком много запросов | `object` |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  FBSApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new FBSApi(cfg);

const { data } = await api.putV3PassesPassId(passId, putV3PassesPassIdRequest);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.FBSAPI.PutV3PassesPassId(context.Background(), passId).PutV3PassesPassIdRequest(putV3PassesPassIdRequest).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.orders_fbs.ApiClient;
import io.github.valeryverkhoturov.wbapi.orders_fbs.SecretString;
import io.github.valeryverkhoturov.wbapi.orders_fbs.api.FbsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
FbsApi api = new FbsApi(client);

System.out.println(api.putV3PassesPassId(passId, putV3PassesPassIdRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\FBSApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new FBSApi(new Client(), $config);

print_r($api->putV3PassesPassId($pass_id, $put_v3_passes_pass_id_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ПропускаFBSApi(Настройки);

Сообщить(Клиент.PutV3PassesPassId(passId, Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new FBSApi(config);

Console.WriteLine(api.PutV3PassesPassId(passId, putV3PassesPassIdRequest));
```

:::

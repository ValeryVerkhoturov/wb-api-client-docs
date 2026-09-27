---
title: "Установить ID ЭТрН поставок"
description: "Метод устанавливает ID ЭТрН — электронной транспортной накладной. Чтобы использовать метод, укажите место отгрузки поставки со способом доставки…"
---

# Установить ID ЭТрН поставок

```http
PATCH /api/marketplace/v3/fbs/supplies/waybill
```

**Base URL:** `https://marketplace-api.wildberries.ru` · **Module:** [`orders-fbs`](/en/reference/api/orders-fbs/) · **Section:** Поставки FBS · [WB documentation ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesWaybill)

Метод устанавливает ID ЭТрН — электронной транспортной накладной. Чтобы использовать метод, укажите [место отгрузки поставки](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesShippingMethod) со способом доставки `"shippingType":"transportCompany"`.

ID ЭТрН нужно указать до передачи поставки в доставку. Вы можете обновлять ID ЭТрН до сканирования поставки и её коробов в пункте отгрузки. Когда поставка будет отсканирована, метод начнёт возвращать ошибку `409`.

В запросе можно указать максимум 100 поставок. Результат обработки возвращается для каждой поставки отдельно.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description            | Schema                          |
| ----- | ---------------------- | ------------------------------- |
| `200` | Успешно                | `UpdateSuppliesWaybillResponse` |
| `400` | Неправильный запрос    | `Error`                         |
| `401` | Не авторизован         | `object`                        |
| `403` | Доступ запрещён        | `Error`                         |
| `429` | Слишком много запросов | `object`                        |

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

const { data } = await api.patchV3FbsSuppliesWaybill(patchV3FbsSuppliesWaybillRequest);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.FBSAPI.PatchV3FbsSuppliesWaybill(context.Background()).PatchV3FbsSuppliesWaybillRequest(patchV3FbsSuppliesWaybillRequest).Execute()
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

System.out.println(api.patchV3FbsSuppliesWaybill(patchV3FbsSuppliesWaybillRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\FBSApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new FBSApi(new Client(), $config);

print_r($api->patchV3FbsSuppliesWaybill($patch_v3_fbs_supplies_waybill_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ПоставкиFBSApi(Настройки);

Сообщить(Клиент.PatchV3FbsSuppliesWaybill(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new FBSApi(config);

Console.WriteLine(api.PatchV3FbsSuppliesWaybill(patchV3FbsSuppliesWaybillRequest));
```

:::

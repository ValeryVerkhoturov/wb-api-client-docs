---
title: "Получить QR-код СПОТ"
description: "Метод возвращает сформированный QR-код СПОТ для поставки в формате PNG, кодировка base64. Вы можете получить QR-код, когда в методе получения данных СПОТ будет…"
---

# Получить QR-код СПОТ

```http
GET /api/marketplace/v3/fbs/supplies/{supplyId}/stickers/spot
```

**База:** `https://marketplace-api.wildberries.ru` · **Модуль:** [`orders-fbs`](/reference/api/orders-fbs/) · **Раздел:** Поставки FBS · [Документация WB ↗](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsSuppliesSupplyIdStickersSpot)

Метод возвращает сформированный QR-код СПОТ для поставки в формате PNG, кодировка base64.
Вы можете получить QR-код, когда в методе [получения данных СПОТ](https://dev.wildberries.ru/openapi/orders-fbs#tag/fbsSupplies/operation/postV3FbsSuppliesSpotList) будет признак `"status":"completed"`.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для методов **сборочных заданий, поставок, пропусков и настроек автовозврата FBS**:

| Период                                                         | Лимит        | Интервал | Всплеск     |
| -------------------------------------------------------------- | ------------ | -------- | ----------- |
| 1 мин                                                          | 300 запросов | 200 мс   | 20 запросов |
| Один запрос с кодами ответов `4XX` учитывается как 10 запросов |

## Параметры

| Имя        | Где  | Тип      | Обяз. | Описание    |
| ---------- | ---- | -------- | ----- | ----------- |
| `supplyId` | path | `string` | да    | ID поставки |

## Ответы

| Код   | Описание               | Схема              |
| ----- | ---------------------- | ------------------ |
| `200` | Успешно                | `SupplySpotQRCode` |
| `400` | Неправильный запрос    | `ApiErrorV3`       |
| `401` | Не авторизован         | `object`           |
| `403` | Доступ запрещён        | `object`           |
| `404` | Не найдено             | `ApiErrorV3`       |
| `429` | Слишком много запросов | `object`           |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.orders_fbs import Configuration, ApiClient
from wb_api_client.orders_fbs.api import OrdersFbsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = OrdersFbsApi(ApiClient(cfg))

result = api.get_v3_fbs_supplies_supply_id_stickers_spot(supply_id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  OrdersFbsApi,
} from "@valeryverkhoturov/wb-api-client/orders-fbs";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new OrdersFbsApi(cfg);

const { data } = await api.getV3FbsSuppliesSupplyIdStickersSpot(supplyId);
console.log(data);
```

```go [Go]
cfg := wbordersfbs.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbordersfbs.NewAPIClient(cfg)

result, _, err := client.OrdersFbsAPI.GetV3FbsSuppliesSupplyIdStickersSpot(context.Background(), supplyId).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
OrdersFbsApi api = new OrdersFbsApi(client);

System.out.println(api.getV3FbsSuppliesSupplyIdStickersSpot(supplyId));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Configuration;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\SecretString;
use ValeryVerkhoturov\WbApiClient\OrdersFbs\Api\OrdersFbsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new OrdersFbsApi(new Client(), $config);

print_r($api->getV3FbsSuppliesSupplyIdStickersSpot($supply_id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый OrdersFbsApi(Настройки);

Сообщить(Клиент.GetV3FbsSuppliesSupplyIdStickersSpot(supplyId).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new OrdersFbsApi(config);

Console.WriteLine(api.GetV3FbsSuppliesSupplyIdStickersSpot(supplyId));
```

:::

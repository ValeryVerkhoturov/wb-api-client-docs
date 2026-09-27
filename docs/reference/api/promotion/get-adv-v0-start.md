---
title: "Запуск кампании"
description: "Метод запускает кампании в статусах 4 — готово к запуску — или 11 — пауза. Чтобы запустить кампанию, проверьте ее бюджет. Если бюджета недостаточно, пополните…"
---

# Запуск кампании

```http
GET /adv/v0/start
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Управление кампаниями · [Документация WB ↗](https://dev.wildberries.ru/openapi/promotion#tag/campaignManagement/operation/getV0Start)

Метод запускает [кампании](https://dev.wildberries.ru/openapi/promotion#tag/campaigns/operation/getV2Adverts) в статусах `4` — готово к запуску — или `11` — пауза.
Чтобы запустить кампанию, проверьте ее бюджет. Если бюджета недостаточно, [пополните его](https://dev.wildberries.ru/openapi/promotion#tag/finances/operation/postV1BudgetDeposit).

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Сервисный          | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Базовый с секретом | 1 сек  | 5 запросов | 200 мс   | 5 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Параметры

| Имя  | Где   | Тип       | Обяз. | Описание    |
| ---- | ----- | --------- | ----- | ----------- |
| `id` | query | `integer` | да    | ID кампании |

## Ответы

| Код   | Описание               | Схема             |
| ----- | ---------------------- | ----------------- |
| `200` | Успешно                | —                 |
| `400` | Неправильный запрос    | `Http400Response` |
| `401` | Не авторизован         | `object`          |
| `403` | Доступ запрещён        | `object`          |
| `422` | Статус не изменен      | `string`          |
| `429` | Слишком много запросов | `object`          |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import Api

cfg = Configuration(access_token="<ваш JWT WB>")
api = Api(ApiClient(cfg))

result = api.get_v0_start(id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/promotion";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.getV0Start(id);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV0Start(context.Background()).Id(id).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.promotion.ApiClient;
import io.github.valeryverkhoturov.wbapi.promotion.SecretString;
import io.github.valeryverkhoturov.wbapi.promotion.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV0Start(id));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV0Start($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый УправлениеКампаниямиApi(Настройки);

Сообщить(Клиент.GetV0Start(id).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV0Start(id));
```

:::

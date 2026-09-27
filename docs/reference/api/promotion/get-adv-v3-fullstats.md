---
title: "Статистика кампаний"
description: "Метод формирует статистику для кампаний независимо от типа."
---

# Статистика кампаний

```http
GET /adv/v3/fullstats
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Статистика · [Документация WB ↗](https://dev.wildberries.ru/openapi/promotion#tag/statistics/operation/getV3Fullstats)

Метод формирует статистику для кампаний независимо от типа.

Максимальный период в запросе — 31 день.

Для кампаний в статусах `7`, `9` и `11`.

В песочнице статистика кампаний доступна за последние 30 дней. Генерируется только для компаний в статусе `9`, тип `8`, 9 раз в сутки

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит     | Интервал | Всплеск  |
| ------------------ | ------ | --------- | -------- | -------- |
| Персональный       | 1 мин  | 3 запроса | 20 сек   | 1 запрос |
| Сервисный          | 1 мин  | 3 запроса | 20 сек   | 1 запрос |
| Базовый с секретом | 1 мин  | 3 запроса | 20 сек   | 1 запрос |
| Базовый            | 1 ч    | 1 запрос  | 1 ч      | 1 запрос |

## Параметры

| Имя         | Где   | Тип            | Обяз. | Описание                          |
| ----------- | ----- | -------------- | ----- | --------------------------------- |
| `ids`       | query | `string`       | да    | ID кампаний, максимум 50 значений |
| `beginDate` | query | `string<date>` | да    | Дата начала интервала             |
| `endDate`   | query | `string<date>` | да    | Дата окончания интервала          |

## Ответы

| Код   | Описание               | Схема                       |
| ----- | ---------------------- | --------------------------- |
| `200` | Успешно                | `GetV3FullstatsResponse200` |
| `400` | Неправильный запрос    | `FullStatsError`            |
| `401` | Не авторизован         | `object`                    |
| `403` | Доступ запрещён        | `object`                    |
| `429` | Слишком много запросов | `object`                    |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import DefaultApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DefaultApi(ApiClient(cfg))

result = api.get_v3_fullstats(ids=..., begin_date=..., end_date=...)
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

const { data } = await api.getV3Fullstats(ids, beginDate, endDate);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV3Fullstats(context.Background()).Ids(ids).BeginDate(beginDate).EndDate(endDate).Execute()
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

System.out.println(api.getV3Fullstats(ids, beginDate, endDate));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV3Fullstats($ids, $begin_date, $end_date));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый СтатистикаApi(Настройки);

Сообщить(Клиент.GetV3Fullstats(ids, beginDate, endDate).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV3Fullstats(ids, beginDate, endDate));
```

:::

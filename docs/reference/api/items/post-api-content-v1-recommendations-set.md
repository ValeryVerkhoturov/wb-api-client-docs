---
title: "Установить рекомендации для товаров"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Установить рекомендации для товаров

```http
POST /api/content/v1/recommendations/set
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Рекомендации · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/recommendations/operation/postV1RecommendationsSet)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод обновляет, добавляет или удаляет [рекомендации](https://seller.wildberries.ru/recommendations-v3) для товаров.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Период | Лимит        | Интервал | Всплеск    |
| ------ | ------------ | -------- | ---------- |
| 1 мин  | 100 запросов | 600 мс   | 5 запросов |

## Тело запроса

`application/json` — схема `SetRecomReq`, обязательно

## Ответы

| Код   | Описание               | Схема                 |
| ----- | ---------------------- | --------------------- |
| `200` | Успешно                | `SetRecomRes`         |
| `208` | Уже отправлено         | `response208SetRecom` |
| `400` | Неправильный запрос    | `response400SetRecom` |
| `401` | Не авторизован         | `object`              |
| `403` | Доступ запрещён        | `Response4XX`         |
| `429` | Слишком много запросов | `object`              |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import DefaultApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DefaultApi(ApiClient(cfg))

result = api.post_v1_recommendations_set(set_recom_req=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.postV1RecommendationsSet(setRecomReq);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV1RecommendationsSet(context.Background()).SetRecomReq(setRecomReq).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV1RecommendationsSet(setRecomReq));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV1RecommendationsSet($set_recom_req));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый РекомендацииApi(Настройки);

Сообщить(Клиент.PostV1RecommendationsSet(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV1RecommendationsSet(setRecomReq));
```

:::

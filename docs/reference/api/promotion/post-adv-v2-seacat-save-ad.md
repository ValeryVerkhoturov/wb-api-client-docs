---
title: "Создать кампанию"
description: "Метод создаёт кампанию: - с ручной ставкой для продвижения товаров в поиске и/или рекомендациях - с единой ставкой для продвижения товаров одновременно в…"
---

# Создать кампанию

```http
POST /adv/v2/seacat/save-ad
```

**База:** `https://advert-api.wildberries.ru` · **Модуль:** [`promotion`](/reference/api/promotion/) · **Раздел:** Создание кампаний · [Документация WB ↗](https://dev.wildberries.ru/openapi/promotion#tag/creatingCampaigns/operation/postV2SeacatSaveAd)

Метод создаёт кампанию:

- с ручной ставкой для продвижения товаров в поиске и/или рекомендациях
- с единой ставкой для продвижения товаров одновременно в поиске и рекомендациях

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 мин  | 5 запросов | 12 сек   | 5 запросов |
| Сервисный          | 1 мин  | 5 запросов | 12 сек   | 5 запросов |
| Базовый с секретом | 1 мин  | 5 запросов | 12 сек   | 5 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Тело запроса

`application/json` — схема `object`, необязательно

## Ответы

| Код   | Описание               | Схема     |
| ----- | ---------------------- | --------- |
| `200` | Успешно                | `integer` |
| `400` | Неправильный запрос    | `string`  |
| `401` | Не авторизован         | `object`  |
| `403` | Доступ запрещён        | `object`  |
| `429` | Слишком много запросов | `object`  |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.promotion import Configuration, ApiClient
from wb_api_client.promotion.api import PromotionApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = PromotionApi(ApiClient(cfg))

result = api.post_v2_seacat_save_ad(post_v2_seacat_save_ad_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  PromotionApi,
} from "@valeryverkhoturov/wb-api-client/promotion";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new PromotionApi(cfg);

const { data } = await api.postV2SeacatSaveAd(postV2SeacatSaveAdRequest);
console.log(data);
```

```go [Go]
cfg := wbpromotion.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbpromotion.NewAPIClient(cfg)

result, _, err := client.PromotionAPI.PostV2SeacatSaveAd(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.promotion.ApiClient;
import io.github.valeryverkhoturov.wbapi.promotion.SecretString;
import io.github.valeryverkhoturov.wbapi.promotion.api.PromotionApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
PromotionApi api = new PromotionApi(client);

System.out.println(api.postV2SeacatSaveAd(postV2SeacatSaveAdRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Promotion\Configuration;
use ValeryVerkhoturov\WbApiClient\Promotion\SecretString;
use ValeryVerkhoturov\WbApiClient\Promotion\Api\PromotionApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new PromotionApi(new Client(), $config);

print_r($api->postV2SeacatSaveAd());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый PromotionApi(Настройки);

Сообщить(Клиент.PostV2SeacatSaveAd(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Promotion.Api;
using ValeryVerkhoturov.WbApiClient.Promotion.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new PromotionApi(config);

Console.WriteLine(api.PostV2SeacatSaveAd());
```

:::

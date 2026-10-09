---
title: "Количество закреплённых и откреплённых отзывов"
description: "Метод возвращает количество закреплённых и откреплённых отзывов за заданный период."
---

# Количество закреплённых и откреплённых отзывов

```http
GET /api/feedbacks/v1/pins/count
```

**База:** `https://feedbacks-api.wildberries.ru` · **Модуль:** [`communications`](/reference/api/communications/) · **Раздел:** Закреплённые отзывы · [Документация WB ↗](https://dev.wildberries.ru/openapi/customer-communication#tag/pinnedFeedbacks/operation/getV1PinsCount)

Метод возвращает количество закреплённых и откреплённых отзывов за заданный период.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Вопросы и отзывы**:

| Тип                | Период | Лимит      | Интервал | Всплеск    |
| ------------------ | ------ | ---------- | -------- | ---------- |
| Персональный       | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Сервисный          | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый с секретом | 1 сек  | 3 запроса  | 333 мс   | 6 запросов |
| Базовый            | 1 ч    | 5 запросов | 12 мин   | 1 запрос   |

## Параметры

| Имя          | Где   | Тип       | Обяз. | Описание                                                                                                                                                                                                                                                                                                                                         |
| ------------ | ----- | --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `state`      | query | `string`  | нет   | Закреплён ли отзыв: - `pinned` — да - `unpinned` — нет                                                                                                                                                                                                                                                                                           |
| `pinOn`      | query | `string`  | нет   | Место закрепления отзыва: - `nm` — карточка товара - `imt` — группа [объединённых](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov) карточек товаров                                                                                      |
| `imtId`      | query | `integer` | нет   | ID для [объединённых](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami#obuedinenie-i-razuedinenie-kartochek-tovarov) карточек товаров. Един для всех артикулов WB группы объединённых карточек. У каждой карточки товара есть `imtId`, даже если она не объединена с другими карточками |
| `nmId`       | query | `integer` | нет   | Артикул WB                                                                                                                                                                                                                                                                                                                                       |
| `feedbackId` | query | `integer` | нет   | ID отзыва                                                                                                                                                                                                                                                                                                                                        |
| `dateFrom`   | query | `string`  | нет   | Дата закрепления первого отзыва в списке                                                                                                                                                                                                                                                                                                         |
| `dateTo`     | query | `string`  | нет   | Дата закрепления последнего отзыва в списке                                                                                                                                                                                                                                                                                                      |

## Ответы

| Код   | Описание               | Схема                       |
| ----- | ---------------------- | --------------------------- |
| `200` | Успешно                | `GetV1PinsCountResponse200` |
| `400` | Неправильный запрос    | `respond.ResultErr`         |
| `401` | Не авторизован         | `object`                    |
| `402` | Требуется платёж       | `object`                    |
| `403` | Доступ запрещён        | `object`                    |
| `429` | Слишком много запросов | `object`                    |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/communications";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.getV1PinsCount(state, pinOn, imtId, nmId, feedbackId, dateFrom, dateTo);
console.log(data);
```

```go [Go]
cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.DefaultApi.GetV1PinsCount(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.communications.ApiClient;
import io.github.valeryverkhoturov.wbapi.communications.SecretString;
import io.github.valeryverkhoturov.wbapi.communications.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV1PinsCount(state, pinOn, imtId, nmId, feedbackId, dateFrom, dateTo));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1PinsCount());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ЗакреплённыеОтзывыApi(Настройки);

Сообщить(Клиент.GetV1PinsCount().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.GetV1PinsCount());
```

:::

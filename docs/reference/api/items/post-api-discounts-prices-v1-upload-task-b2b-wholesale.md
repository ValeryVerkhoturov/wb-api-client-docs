---
title: "Установить оптовые скидки для B2B-продаж"
description: "Метод доступен по Персональному токену, Сервисному токену"
---

# Установить оптовые скидки для B2B-продаж

```http
POST /api/discounts-prices/v1/upload/task/b2b/wholesale
```

**База:** `https://discounts-prices-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Цены и скидки · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV1UploadTaskB2bWholesale)

Метод [доступен](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Pravila-ispolzovaniya-tokenov-dostupa-k-API) по
**Персональному** токену,
**Сервисному** токену

Метод устанавливает [оптовые скидки для бизнеса](https://seller.wildberries.ru/instructions/ru/ru/material/how-to-enable-wholesale-discounts-for-business)

Получить информацию о процессе установки цен и скидок можно с помощью методов [состояния](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/getV2HistoryTasks) и [детализации](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/getV2HistoryGoodsTask) обработанной загрузки.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Цены и скидки**:

| Тип          | Период | Лимит       | Интервал | Всплеск    |
| ------------ | ------ | ----------- | -------- | ---------- |
| Персональный | 6 сек  | 10 запросов | 600 мс   | 5 запросов |
| Сервисный    | 6 сек  | 10 запросов | 600 мс   | 5 запросов |

## Ответы

| Код   | Описание                | Схема             |
| ----- | ----------------------- | ----------------- |
| `200` | Успешно                 | `object`          |
| `208` | Такая загрузка уже есть | `object`          |
| `400` | Неправильный запрос     | `ResponseErrorV3` |
| `401` | Не авторизован          | `object`          |
| `403` | Доступ запрещён         | `ResponseErrorV3` |
| `429` | Слишком много запросов  | `object`          |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.postV1UploadTaskB2bWholesale(postV1UploadTaskB2bWholesaleRequest);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV1UploadTaskB2bWholesale(context.Background()).Execute()
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

System.out.println(api.postV1UploadTaskB2bWholesale(postV1UploadTaskB2bWholesaleRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV1UploadTaskB2bWholesale($post_v1_upload_task_b2b_wholesale_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ЦеныИСкидкиApi(Настройки);

Сообщить(Клиент.PostV1UploadTaskB2bWholesale(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV1UploadTaskB2bWholesale(postV1UploadTaskB2bWholesaleRequest));
```

:::

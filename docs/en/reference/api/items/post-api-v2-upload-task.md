---
title: "Установить цены и скидки"
description: "Метод устанавливает цены и скидки для товаров."
---

# Установить цены и скидки

```http
POST /api/v2/upload/task
```

**Base URL:** `https://discounts-prices-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Цены и скидки · [WB documentation ↗](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV2UploadTask)

Метод устанавливает цены и скидки для товаров.

Чтобы установить цены для размеров товара, используйте [отдельный метод](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV2UploadTaskSize).

Получить информацию о процессе установки цен и скидок можно с помощью методов [состояния](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/getV2HistoryTasks) и [детализации](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/getV2HistoryGoodsTask) обработанной загрузки.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов категории **Цены и скидки**:

| Тип                | Период | Лимит       | Интервал | Всплеск    |
| ------------------ | ------ | ----------- | -------- | ---------- |
| Персональный       | 6 сек  | 10 запросов | 600 мс   | 5 запросов |
| Сервисный          | 6 сек  | 10 запросов | 600 мс   | 5 запросов |
| Базовый с секретом | 6 сек  | 10 запросов | 600 мс   | 5 запросов |
| Базовый            | 1 ч    | 4 запроса   | 15 мин   | 1 запрос   |

---

В песочнице — максимум 1 запрос в секунду суммарно для всех методов **Контента**.

## Responses

| Code  | Description                   | Schema                      |
| ----- | ----------------------------- | --------------------------- |
| `200` | Успешно                       | `TaskCreated`               |
| `208` | Такая загрузка уже есть       | `RequestAlreadyExistsError` |
| `400` | Неправильный запрос           | `ResponseError`             |
| `401` | Не авторизован                | `object`                    |
| `402` | Требуется платёж              | `object`                    |
| `403` | Доступ запрещён               | `ResponseError`             |
| `409` | Ошибка при конвертации валюты | `ResponseError`             |
| `422` | Неожидаемый результат         | `ResponseError`             |
| `429` | Слишком много запросов        | `object`                    |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.post_v2_upload_task(post_v2_upload_task_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ItemsApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new ItemsApi(cfg);

const { data } = await api.postV2UploadTask(postV2UploadTaskRequest);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.PostV2UploadTask(context.Background()).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.ItemsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
ItemsApi api = new ItemsApi(client);

System.out.println(api.postV2UploadTask(postV2UploadTaskRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2UploadTask($post_v2_upload_task_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2UploadTask(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2UploadTask(postV2UploadTaskRequest));
```

:::

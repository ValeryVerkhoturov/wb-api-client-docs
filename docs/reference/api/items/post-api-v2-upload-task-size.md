---
title: "Установить цены для размеров"
description: "Метод устанавливает цены отдельно для размеров товаров. Работает только для товаров из категорий, где можно устанавливать цены отдельно для разных размеров.…"
---

# Установить цены для размеров

```http
POST /api/v2/upload/task/size
```

**База:** `https://discounts-prices-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Цены и скидки · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV2UploadTaskSize)

Метод устанавливает цены отдельно для размеров товаров.
Работает только для товаров из категорий, где можно устанавливать цены отдельно для разных размеров. Для [таких товаров](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/getV2ListGoodsSizeNm) `"editableSizePrice":true`.
Чтобы установить цены и скидки для самих товаров, используйте [отдельный метод](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts/operation/postV2UploadTask).

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

## Ответы

| Код   | Описание                      | Схема                       |
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

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = ItemsApi(ApiClient(cfg))

result = api.post_v2_upload_task_size(post_v2_upload_task_size_request=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  ItemsApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new ItemsApi(cfg);

const { data } = await api.postV2UploadTaskSize(postV2UploadTaskSizeRequest);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.PostV2UploadTaskSize(context.Background()).Execute()
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
ItemsApi api = new ItemsApi(client);

System.out.println(api.postV2UploadTaskSize(postV2UploadTaskSizeRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV2UploadTaskSize($post_v2_upload_task_size_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV2UploadTaskSize(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV2UploadTaskSize(postV2UploadTaskSizeRequest));
```

:::

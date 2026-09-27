---
title: "Удаление ярлыка"
description: "Метод удаляет ярлык из списка ярлыков продавца."
---

# Удаление ярлыка

```http
DELETE /content/v2/tag/{id}
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Ярлыки · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/labels/operation/deleteV2TagId)

Метод удаляет ярлык из [списка ярлыков](https://dev.wildberries.ru/openapi/item-management#tag/labels/operation/getV2Tags) продавца.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **Ярлыков**:

| Тип                | Период | Лимит        | Интервал | Всплеск    |
| ------------------ | ------ | ------------ | -------- | ---------- |
| Персональный       | 1 мин  | 100 запросов | 600 мс   | 5 запросов |
| Сервисный          | 1 мин  | 100 запросов | 600 мс   | 5 запросов |
| Базовый с секретом | 1 мин  | 100 запросов | 600 мс   | 5 запросов |
| Базовый            | 1 ч    | 2 запроса    | 30 мин   | 1 запрос   |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Контента**.

## Параметры

| Имя  | Где  | Тип       | Обяз. | Описание           |
| ---- | ---- | --------- | ----- | ------------------ |
| `id` | path | `integer` | да    | Числовой ID ярлыка |

## Ответы

| Код   | Описание               | Схема                         |
| ----- | ---------------------- | ----------------------------- |
| `200` | Успешно                | `responseContentError`        |
| `400` | Неправильный запрос    | `responseBodyContentError400` |
| `401` | Не авторизован         | `object`                      |
| `402` | Требуется платёж       | `object`                      |
| `403` | Доступ запрещён        | `responseBodyContentError403` |
| `429` | Слишком много запросов | `object`                      |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import DefaultApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DefaultApi(ApiClient(cfg))

result = api.delete_v2_tag_id(id=...)
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

const { data } = await api.deleteV2TagId(id);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.DefaultApi.DeleteV2TagId(context.Background(), id).Execute()
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

System.out.println(api.deleteV2TagId(id));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->deleteV2TagId($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый ЯрлыкиApi(Настройки);

Сообщить(Клиент.DeleteV2TagId(id).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.DeleteV2TagId(id));
```

:::

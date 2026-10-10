---
title: "Получить файл из сообщения"
description: "Метод возвращает файл или изображение из сообщения по его ID."
---

# Получить файл из сообщения

```http
GET /api/v1/seller/download/{id}
```

**База:** `https://buyer-chat-api.wildberries.ru` · **Модуль:** [`communications`](/reference/api/communications/) · **Раздел:** Чат с покупателями · [Документация библиотеки ↗](https://valeryverkhoturov.github.io/wb-api-client-docs/reference/api/communications/get-api-v1-seller-download-id) · [Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/customer-communication#tag/buyersChat/operation/getV1SellerDownloadId)

Метод возвращает файл или изображение из сообщения по его ID.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца:

| Тип                | Период | Лимит       | Интервал | Всплеск     |
| ------------------ | ------ | ----------- | -------- | ----------- |
| Персональный       | 10 сек | 10 запросов | 1 сек    | 10 запросов |
| Сервисный          | 10 сек | 10 запросов | 1 сек    | 10 запросов |
| Базовый с секретом | 10 сек | 10 запросов | 1 сек    | 10 запросов |
| Базовый            | 1 ч    | 10 запросов | 6 мин    | 1 запрос    |

## Параметры

| Имя  | Где  | Тип      | Обяз. | Описание                                                                                                                                                                |
| ---- | ---- | -------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id` | path | `string` | да    | ID файла, см. значение поля `downloadID` в методе [События чатов](https://dev.wildberries.ru/openapi/customer-communication#tag/buyersChat/operation/getV1SellerEvents) |

## Ответы

| Код   | Описание                 | Схема                              |
| ----- | ------------------------ | ---------------------------------- |
| `200` | Успешно                  | `string`                           |
| `202` | Файл на модерации        | `GetV1SellerDownloadIdResponse202` |
| `400` | Неправильный запрос      | `GetV1SellerDownloadIdResponse400` |
| `401` | Не авторизован           | `object`                           |
| `402` | Требуется платёж         | `object`                           |
| `403` | Доступ запрещён          | `object`                           |
| `429` | Слишком много запросов   | `object`                           |
| `451` | Файл не прошёл модерацию | `GetV1SellerDownloadIdResponse451` |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.communications import Configuration, ApiClient
from wb_api_client.communications.api import CommunicationsApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = CommunicationsApi(ApiClient(cfg))

result = api.get_v1_seller_download_id(id=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  CommunicationsApi,
} from "@valeryverkhoturov/wb-api-client/communications";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new CommunicationsApi(cfg);

const { data } = await api.getV1SellerDownloadId(id);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbcommunications "github.com/ValeryVerkhoturov/wb-api-client-go/communications"
)

cfg := wbcommunications.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbcommunications.NewAPIClient(cfg)

result, _, err := client.CommunicationsAPI.GetV1SellerDownloadId(context.Background(), id).Execute()
if err != nil {
    panic(err)
}
fmt.Printf("%+v\n", result)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.communications.ApiClient;
import io.github.valeryverkhoturov.wbapi.communications.SecretString;
import io.github.valeryverkhoturov.wbapi.communications.api.CommunicationsApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
CommunicationsApi api = new CommunicationsApi(client);

System.out.println(api.getV1SellerDownloadId(id));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Communications\Configuration;
use ValeryVerkhoturov\WbApiClient\Communications\SecretString;
use ValeryVerkhoturov\WbApiClient\Communications\Api\CommunicationsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new CommunicationsApi(new Client(), $config);

print_r($api->getV1SellerDownloadId($id));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый CommunicationsApi(Настройки);

Сообщить(Клиент.GetV1SellerDownloadId(id).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Communications.Api;
using ValeryVerkhoturov.WbApiClient.Communications.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new CommunicationsApi(config);

Console.WriteLine(api.GetV1SellerDownloadId(id));
```

:::

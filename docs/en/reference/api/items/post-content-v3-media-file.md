---
title: "Загрузить медиафайл"
description: "Метод загружает и добавляет один медиафайл к карточке товара. Требования к изображениям: \\ максимум изображений для одной карточки товара — 30 \\ минимальное…"
---

# Загрузить медиафайл

```http
POST /content/v3/media/file
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Медиафайлы · [WB documentation ↗](https://dev.wildberries.ru/openapi/item-management#tag/mediaFiles/operation/postV3MediaFile)

Метод загружает и добавляет один медиафайл к карточке товара.
Требования к изображениям:
\* максимум изображений для одной карточки товара — 30
\* минимальное разрешение — 700x900 px
\* максимальный размер — 32 Мб
\* минимальное качество — 65%
\* форматы — JPG, PNG, BMP, GIF (статичные), WebP
Требования к видео:
\* максимум одно видео для одной карточки товара
\* максимальный размер — 50 Мб
\* форматы — MOV, MP4

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **Медиафайлов**:

| Тип                | Период | Лимит        | Интервал | Всплеск    |
| ------------------ | ------ | ------------ | -------- | ---------- |
| Персональный       | 1 мин  | 100 запросов | 600 мс   | 5 запросов |
| Сервисный          | 1 мин  | 100 запросов | 600 мс   | 5 запросов |
| Базовый с секретом | 1 мин  | 100 запросов | 600 мс   | 5 запросов |
| Базовый            | 1 ч    | 2 запроса    | 30 мин   | 1 запрос   |

---

В [песочнице](https://dev.wildberries.ru/sandbox) — максимум 1 запрос в секунду суммарно для всех методов **Контента**.

## Parameters

| Name             | In     | Type      | Req. | Description                                                                                                                                                                                                         |
| ---------------- | ------ | --------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-Nm-Id`        | header | `string`  | yes  | Артикул WB                                                                                                                                                                                                          |
| `X-Photo-Number` | header | `integer` | yes  | Номер медиафайла на загрузку, начинается с `1`. При загрузке видео всегда указывайте `1`. Чтобы добавить изображение к уже загруженным, номер медиафайла должен быть больше количества уже загруженных медиафайлов. |

## Request body

`multipart/form-data` — schema `object`, required

## Responses

| Code  | Description            | Schema                       |
| ----- | ---------------------- | ---------------------------- |
| `200` | Успешно                | `PostV3MediaFileResponse200` |
| `400` | Неправильный запрос    | `mediaErrors`                |
| `401` | Не авторизован         | `object`                     |
| `402` | Требуется платёж       | `object`                     |
| `403` | Доступ запрещён        | `mediaErrors`                |
| `429` | Слишком много запросов | `object`                     |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import DefaultApi

cfg = Configuration(access_token="<your WB JWT>")
api = DefaultApi(ApiClient(cfg))

result = api.post_v3_media_file(x_nm_id=..., x_photo_number=..., uploadfile=...)
print(result)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const { data } = await api.postV3MediaFile(xNmId, xPhotoNumber, uploadfile);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.DefaultApi.PostV3MediaFile(context.Background()).XNmId(xNmId).XPhotoNumber(xPhotoNumber).Uploadfile(uploadfile).Execute()
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
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV3MediaFile(xNmId, xPhotoNumber, uploadfile));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV3MediaFile($x_nm_id, $x_photo_number));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый МедиафайлыApi(Настройки);

Сообщить(Клиент.PostV3MediaFile(XNmId, XPhotoNumber).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV3MediaFile(xNmId, xPhotoNumber));
```

:::

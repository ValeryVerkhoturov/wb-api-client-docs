---
title: "Загрузить медиафайл"
description: "Метод загружает и добавляет один медиафайл к карточке товара. Требования к изображениям: \\ максимум изображений для одной карточки товара — 30 \\ минимальное…"
---

# Загрузить медиафайл

```http
POST /content/v3/media/file
```

**База:** `https://content-api.wildberries.ru` · **Модуль:** [`items`](/reference/api/items/) · **Раздел:** Медиафайлы · [Документация WB ↗](https://dev.wildberries.ru/openapi/item-management#tag/mediaFiles/operation/postV3MediaFile)

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

## Параметры

| Имя              | Где    | Тип       | Обяз. | Описание                                                                                                                                                                                                            |
| ---------------- | ------ | --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-Nm-Id`        | header | `string`  | да    | Артикул WB                                                                                                                                                                                                          |
| `X-Photo-Number` | header | `integer` | да    | Номер медиафайла на загрузку, начинается с `1`. При загрузке видео всегда указывайте `1`. Чтобы добавить изображение к уже загруженным, номер медиафайла должен быть больше количества уже загруженных медиафайлов. |

## Тело запроса

`multipart/form-data` — схема `object`, обязательно

## Ответы

| Код   | Описание               | Схема                        |
| ----- | ---------------------- | ---------------------------- |
| `200` | Успешно                | `PostV3MediaFileResponse200` |
| `400` | Неправильный запрос    | `mediaErrors`                |
| `401` | Не авторизован         | `object`                     |
| `402` | Требуется платёж       | `object`                     |
| `403` | Доступ запрещён        | `mediaErrors`                |
| `429` | Слишком много запросов | `object`                     |

## Примеры вызова

Аргументы показаны именами параметров — подставьте свои значения. Языки, в клиенте которых этой операции нет, не показаны.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import DefaultApi

cfg = Configuration(access_token="<ваш JWT WB>")
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
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const { data } = await api.postV3MediaFile(xNmId, xPhotoNumber, uploadfile);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
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
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.postV3MediaFile(xNmId, xPhotoNumber, uploadfile));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->postV3MediaFile($x_nm_id, $x_photo_number));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый МедиафайлыApi(Настройки);

Сообщить(Клиент.PostV3MediaFile(XNmId, XPhotoNumber).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new DefaultApi(config);

Console.WriteLine(api.PostV3MediaFile(xNmId, xPhotoNumber));
```

:::

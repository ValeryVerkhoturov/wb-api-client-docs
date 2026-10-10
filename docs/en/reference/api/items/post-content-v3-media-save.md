---
title: "Загрузить медиафайлы по ссылкам"
description: "Метод загружает набор медиафайлов в карточку товара через указание ссылок в запросе."
---

# Загрузить медиафайлы по ссылкам

```http
POST /content/v3/media/save
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Медиафайлы · [WB documentation ↗](https://dev.wildberries.ru/openapi/item-management#tag/mediaFiles/operation/postV3MediaSave)

Метод загружает набор медиафайлов в карточку товара через указание ссылок в запросе.

Новые медиафайлы полностью заменяют старые. Чтобы добавить новые медиафайлы, укажите в запросе ссылки одновременно на новые и старые медиафайлы.

Требования к ссылкам:
\* для доступа к файлу по ссылке не нужна авторизация
\* ссылка ведёт прямо на файл. Убедитесь, что ссылка не ведёт на страницу предпросмотра или авторизации. Ссылка должна заканчиваться на имя файла с расширением — например, `/file\_name.jpg`. Если по ссылке открывается текстовая страница TXT или HTML, ссылка считается некорректной.
Помните, что некоторые хранилища не формируют прямые ссылки и поэтому не подходят для использования. К таким хранилищам относится, например, \*\*Google Drive\*\*, который формирует ссылки только на предпросмотр файла либо на служебные страницы.
Требования к изображениям:
\* максимум изображений для одной карточки товара — 30
\* минимальное разрешение — 700×900 px
\* максимальный размер — 32 Мб
\* минимальное качество — 65%
\* форматы — JPG, PNG, BMP, GIF (статичные), WebP
Требования к видео:
\* максимум одно видео для одной карточки товара
\* максимальный размер — 50 Мб
\* форматы — MOV, MP4
Если видео или хотя бы одно изображение в запросе не соответствует требованиям, то даже при успешном ответе (`200`) ни одно изображение/видео не загрузится.

[Лимит запросов](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Limity-zaprosov) на один аккаунт продавца для всех методов **Медиафайлов**:

| Тип                | Период | Лимит        | Интервал | Всплеск    |
| ------------------ | ------ | ------------ | -------- | ---------- |
| Персональный       | 1 мин  | 100 запросов | 600 мс   | 5 запросов |
| Сервисный          | 1 мин  | 100 запросов | 600 мс   | 5 запросов |
| Базовый с секретом | 1 мин  | 100 запросов | 600 мс   | 5 запросов |
| Базовый            | 1 ч    | 2 запроса    | 30 мин   | 1 запрос   |

---

В песочнице — максимум 1 запрос в секунду суммарно для всех методов **Контента**.

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description                    | Schema                       |
| ----- | ------------------------------ | ---------------------------- |
| `200` | Успешно                        | `PostV3MediaSaveResponse200` |
| `400` | Неправильный запрос            | `mediaErrors`                |
| `401` | Не авторизован                 | `object`                     |
| `402` | Требуется платёж               | `object`                     |
| `403` | Доступ запрещён                | `mediaErrors`                |
| `409` | Ошибка сохранения части ссылок | `mediaErrors`                |
| `422` | Отсутствует параметр nmId      | `mediaErrors`                |
| `429` | Слишком много запросов         | `object`                     |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.post_v3_media_save(post_v3_media_save_request=...)
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

const { data } = await api.postV3MediaSave(postV3MediaSaveRequest);
console.log(data);
```

```go [Go]
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.PostV3MediaSave(context.Background()).PostV3MediaSaveRequest(postV3MediaSaveRequest).Execute()
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

System.out.println(api.postV3MediaSave(postV3MediaSaveRequest));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV3MediaSave($post_v3_media_save_request));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV3MediaSave(Тело).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV3MediaSave(postV3MediaSaveRequest));
```

:::

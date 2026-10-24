---
title: "Upload Media File"
description: "Uploads and adds one media file for the listing. Requirements for images: \\ maximum images for each listing — 30, \\ minimal resolution – 700 × 900 pixels, \\…"
---

# Upload Media File

```http
POST /content/v3/media/file
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Media Files · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/mediaFiles/operation/postV3MediaFile)

Uploads and adds one media file for the listing.
Requirements for images:
\* maximum images for each listing  — 30,
\* minimal resolution – 700 × 900 pixels,
\* maximum size — 32 МB,
\* minimal quality — 65%,
\* formats — JPG, PNG, BMP, GIF (static), WebP.
Requirements for video:
\* maximum one video for each listing
\* maximum size — 50 MB
\* formats — MOV, MP4

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all **Media Files** methods:

| Type             | Period | Limit        | Interval | Burst      |
| ---------------- | ------ | ------------ | -------- | ---------- |
| Personal         | 1 min  | 100 requests | 600 ms   | 5 requests |
| Service          | 1 min  | 100 requests | 600 ms   | 5 requests |
| Base with secret | 1 min  | 100 requests | 600 ms   | 5 requests |
| Base             | 1 h    | 2 requests   | 30 min   | 1 request  |

---

In Sandbox — maximum of 1 request per second for all **Content** methods in total.

## Parameters

| Name             | In     | Type             | Req. | Description                                                                                                                                                       |
| ---------------- | ------ | ---------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-Nm-Id`        | header | `string`         | yes  | WB item number                                                                                                                                                    |
| `X-Photo-Number` | header | `integer<int64>` | yes  | Number of media file, starting from `1`. To add the video set `1`. To add the image to the uploaded ones, set file the number more then number of uploaded files. |

## Request body

`multipart/form-data` — schema `object`, required

## Responses

| Code  | Description       | Schema                       |
| ----- | ----------------- | ---------------------------- |
| `200` | Success           | `PostV3MediaFileResponse200` |
| `400` | Bad request       | `mediaErrors`                |
| `401` | Unauthorized      | `object`                     |
| `402` | Payment required  | `object`                     |
| `403` | Access denied     | `mediaErrors`                |
| `429` | Too many requests | `object`                     |

## Call examples

Arguments are shown as parameter names — substitute your own values. Languages whose client does not expose this operation are omitted.

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import ItemsApi

cfg = Configuration(access_token="<your WB JWT>")
api = ItemsApi(ApiClient(cfg))

result = api.post_v3_media_file(x_nm_id=..., x_photo_number=..., uploadfile=...)
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

const { data } = await api.postV3MediaFile(xNmId, xPhotoNumber, uploadfile);
console.log(data);
```

```go [Go]
import (
	"context"
	"fmt"

	wbitems "github.com/ValeryVerkhoturov/wb-api-client-go/items"
)

cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)

result, _, err := client.ItemsAPI.PostV3MediaFile(context.Background()).XNmId(xNmId).XPhotoNumber(xPhotoNumber).Uploadfile(uploadfile).Execute()
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

System.out.println(api.postV3MediaFile(xNmId, xPhotoNumber, uploadfile));
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\ItemsApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new ItemsApi(new Client(), $config);

print_r($api->postV3MediaFile($x_nm_id, $x_photo_number));
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый ItemsApi(Настройки);

Сообщить(Клиент.PostV3MediaFile(XNmId, XPhotoNumber).Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.Items.Api;
using ValeryVerkhoturov.WbApiClient.Items.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");
var api = new ItemsApi(config);

Console.WriteLine(api.PostV3MediaFile(xNmId, xPhotoNumber));
```

:::

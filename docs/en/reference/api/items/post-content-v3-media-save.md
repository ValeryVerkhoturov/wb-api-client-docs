---
title: "Upload Media Files via Links"
description: "The method uploads a set of media files to a listing by specifying links in the request."
---

# Upload Media Files via Links

```http
POST /content/v3/media/save
```

**Base URL:** `https://content-api.wildberries.ru` · **Module:** [`items`](/en/reference/api/items/) · **Section:** Media Files · [Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management#tag/mediaFiles/operation/postV3MediaSave)

The method uploads a set of media files to a listing by specifying links in the request.

New media files (`data`) replace old ones (`mediaFiles`). To add new files, set links both to new and old files.

Requirements for links:
\* no authorization is required to access the file via the link
\* the link must point directly to the file. Ensure the link does not lead to a preview or authentication page. The link must end with the file name including its extension — for example, `/file\_name.jpg`. If the link opens a TXT or HTML page, it is considered invalid.
Note that some storage services do not generate direct links and therefore are not suitable for use. \*\*Google Drive\*\* is an example of such a service, as it only generates links to a file preview or internal service pages.
Requirements for images:
\* maximum images for each listing — 30
\* minimal resolution – 700 × 900 pixels
\* maximum size — 32 MB
\* minimal quality — 65%
\* formats — JPG, PNG, BMP, GIF (static), WebP
Requirements for video:
\* maximum one video for each listing
\* maximum size — 50 MB
\* formats — MOV, MP4
If one or several images or a video do not meet the requirements, no images and a video will be uploaded even if you have the success response (`200`)

[Request limit](https://dev.wildberries.ru/openapi/api-information#tag/introduction/Rate-Limits) per one seller account for all **Media Files** methods:

| Type             | Period | Limit        | Interval | Burst      |
| ---------------- | ------ | ------------ | -------- | ---------- |
| Personal         | 1 min  | 100 requests | 600 ms   | 5 requests |
| Service          | 1 min  | 100 requests | 600 ms   | 5 requests |
| Base with secret | 1 min  | 100 requests | 600 ms   | 5 requests |
| Base             | 1 h    | 2 requests   | 30 min   | 1 request  |

---

In Sandbox — maximum of 1 request per second for all **Content** methods in total.

## Request body

`application/json` — schema `object`, required

## Responses

| Code  | Description                    | Schema                       |
| ----- | ------------------------------ | ---------------------------- |
| `200` | Success                        | `PostV3MediaSaveResponse200` |
| `400` | Bad request                    | `mediaErrors`                |
| `401` | Unauthorized                   | `object`                     |
| `402` | Payment required               | `object`                     |
| `403` | Access denied                  | `mediaErrors`                |
| `409` | Error saving some of the links | `mediaErrors`                |
| `422` | The parameter nmId is missing  | `mediaErrors`                |
| `429` | Too many requests              | `object`                     |

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
import (
	"context"
	"fmt"

	wbitems "github.com/ValeryVerkhoturov/wb-api-client-go/items"
)

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
client.setAccessToken(new SecretString("<your WB JWT>"));
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

```rust [Rust]
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");

    let result = items_api::post_v3_media_save(&cfg, post_v3_media_save_request).await;
    println!("{:#?}", result);
}
```

:::

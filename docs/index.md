---
layout: home

hero:
  name: wb-api-client
  text: Wildberries Seller API — на языке вашего проекта.
  tagline: Автоматически сгенерированные SDK для Python, TypeScript, Go, Java и PHP. Одна версия для всех экосистем. Bearer-токен маскируется по умолчанию.
  actions:
    - theme: brand
      text: Быстрый старт
      link: /guides/quickstart
    - theme: alt
      text: Исходники на GitHub
      link: https://github.com/ValeryVerkhoturov/wb-api-client

features:
  - icon: 🧩
    title: 13 категорий API, один пакет
    details: Все категории — товары, заказы (FBS / DBW / FBW / DBS), продвижение, аналитика, финансы и остальные — поставляются как изолированные под-модули внутри одного пакета на язык. Никаких коллизий имён между категориями.
  - icon: 🔐
    title: Маскирование секретов из коробки
    details: Ваш bearer-токен обёрнут в языко-специфичный SecretString, поэтому он не попадает в логи, print, дампы отладчика и Sentry, пока вы явно не запросите значение.
  - icon: 📆
    title: Ежедневная синхронизация с апстримом
    details: CI-задача каждый день скачивает спецификации WB. Если что-то изменилось, автоматически публикуется новый релиз на PyPI, npm, Go, Maven Central и Packagist — с соответствующим git-тегом.
  - icon: 🧬
    title: Одна версия, пять экосистем
    details: 1.YYYYMMDD.N — валидный стабильный semver в каждом языке. pip / npm / go get / mvn / composer подхватывают последнюю версию без прелиз-плясок.
  - icon: 🛡️
    title: Bearer-авторизация везде
    details: Апстрим-YAML путает apiKey-схему с bearer JWT. Пост-обработка убирает дублирование, и в каждом сгенерированном клиенте остаётся ровно один способ авторизации.
  - icon: 🧪
    title: Детерминированная генерация
    details: Зафиксированные версии openapi-generator и форматтеров, скрытые метки времени. Проверка на PR перегенерирует всё с нуля и падает, если результат отличается.
---

## Установка

::: code-group

```bash [Python]
pip install valeryverkhoturov-wb-api-client
```

```bash [TypeScript]
npm install @valeryverkhoturov/wb-api-client
```

```bash [Go]
go get github.com/ValeryVerkhoturov/wb-api-client/clients/go@latest
```

```xml [Java (Maven)]
<dependency>
  <groupId>io.github.valeryverkhoturov</groupId>
  <artifactId>wb-api-client</artifactId>
  <version>LATEST</version>
</dependency>
```

```bash [PHP]
composer require valeryverkhoturov/wb-api-client
```

:::

## Первый вызов

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import DefaultApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DefaultApi(ApiClient(cfg))
```

```ts [TypeScript]
import { Configuration, DefaultApi } from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);
```

```go [Go]
import wbitems "github.com/ValeryVerkhoturov/wb-api-client/clients/go/items"

cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<ваш JWT WB>")
client := wbitems.NewAPIClient(cfg)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);
```

:::

Подробно по каждому языку и всем 13 под-модулям: [Python](/languages/python) · [TypeScript](/languages/typescript) · [Go](/languages/go) · [Java](/languages/java) · [PHP](/languages/php).

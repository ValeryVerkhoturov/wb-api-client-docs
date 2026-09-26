---
layout: home

hero:
  name: wb-api-client
  text: Wildberries API, in your language.
  tagline: Auto-generated SDKs for Python, TypeScript, Go, Java, PHP and OneScript (1С). One version across every ecosystem. Bearer tokens redacted by default.
  actions:
    - theme: brand
      text: Quickstart
      link: /en/guides/quickstart
    - theme: alt
      text: Source on GitHub
      link: https://github.com/ValeryVerkhoturov/wb-api-client

features:
  - title: 13 API categories, one package
    details: Every category — items, orders (FBS/DBW/FBW/DBS), promotion, analytics, finances, and the rest — ships as an isolated sub-module inside a single per-language package. No cross-category name clashes.
  - title: Secret redaction, built in
    details: Your bearer JWT is wrapped in a per-language SecretString so it stays out of logs, prints, and debuggers unless you explicitly ask for the raw value.
  - title: Daily upstream sync
    details: A CI job re-downloads the WB specs every morning. If anything changed, a new release is cut and pushed to PyPI, npm, Go, Maven Central, Packagist and hub.oscript.io automatically — with a matching git tag.
  - title: One version, six ecosystems
    details: 1.YYYYMMDD.N — a valid stable semver in every language. pip / npm / go get / mvn / composer / opm all pick the latest without prerelease dance.
  - title: Bearer auth, everywhere
    details: The upstream YAMLs conflate an API-key scheme with a bearer JWT. A post-processing pass strips that duplication so every generated client exposes exactly one auth path.
  - title: Deterministic regeneration
    details: Pinned openapi-generator + formatter versions + hidden generation timestamps. PRs that break determinism are caught by a per-PR regen check.
---

## Install

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

```bash [OneScript]
opm install wb-api-client
```

:::

## Call something

::: code-group

```python [Python]
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import DefaultApi

cfg = Configuration(access_token="<your WB JWT>")
api = DefaultApi(ApiClient(cfg))
```

```ts [TypeScript]
import { Configuration, DefaultApi } from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);
```

```go [Go]
import wbitems "github.com/ValeryVerkhoturov/wb-api-client/clients/go/items"

cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("<your WB JWT>")
client := wbitems.NewAPIClient(cfg)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));
DefaultApi api = new DefaultApi(client);
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));
$api = new DefaultApi(new Client(), $config);
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<your WB JWT>");
Клиент = Новый КарточкиТоваровApi(Настройки);
```

:::

Full tour of every sub-module, per-language: [Python](/en/languages/python) · [TypeScript](/en/languages/typescript) · [Go](/en/languages/go) · [Java](/en/languages/java) · [PHP](/en/languages/php) · [OneScript](/en/languages/onescript).

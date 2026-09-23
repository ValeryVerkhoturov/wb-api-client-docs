# Аутентификация

Каждый вызов Wildberries Seller API требует **bearer JWT** в заголовке `Authorization`. Клиенты сами подставляют заголовок; вы передаёте только токен.

## Откуда берётся токен

Токены выпускаются в кабинете продавца:

1. [seller.wildberries.ru](https://seller.wildberries.ru) → **Настройки → Доступ к API**.
2. **Создать новый токен** — выберите права (Контент, Маркетплейс, Аналитика, …), срок жизни и sandbox-режим при желании.
3. Немедленно скопируйте JWT. Его показывают один раз.

Каждой галочке прав примерно соответствует одна или несколько категорий (под-модулей) в клиенте. Если пришёл `403` — токен валиден, но прав не хватает; перевыпустите с нужной галочкой.

## Обёртки SecretString

Получив токен, не носите его по коду как обычную строку. Каждый клиент оборачивает значение в языко-специфичный «секретный» тип — он маскирует токен в логах, `print`-выводе, отладчике и дампах ошибок, пока вы явно не запросите значение.

| Язык | Обёртка | Сеттер | Маскируется в | Явное значение |
|---|---|---|---|---|
| Python | [`pydantic.SecretStr`](https://docs.pydantic.dev/latest/api/types/#pydantic.types.SecretStr) | `Configuration(access_token=…)` | `print(cfg.access_token)` → `**********` | `.get_secret_value()` |
| TypeScript | встроенный класс `SecretString` | `Configuration.setAccessToken(…)` | `console.log(new SecretString("…"))` → `<REDACTED>` | `.exposeSecret()` |
| Go | [`secrecy.SecretString`](https://github.com/negrel/secrecy) | `Configuration.SetAccessToken(…)` | `fmt.Printf("%v", cfg.AccessToken)` → `<!SECRET_LEAKED!>` | `.ExposeSecret()` |
| Java | `SecretString` в каждом под-пакете | `ApiClient.setBearerToken(SecretString)` | `System.out.println(s)` → `<REDACTED>` | `.exposeSecret()` |
| PHP | `SecretString` в каждом под-пространстве | `Configuration::setAccessTokenSecret(SecretString)` | `var_dump($secret)` → `'<REDACTED>'` | `->exposeSecret()` |

### Зачем это нужно

Реальные ситуации, ради которых это сделано:

- Логгер-middleware, который в трейсе ошибки дампит всю конфигурацию запроса.
- `print(config)`, оставленный в коде после отладки.
- Исключения, сериализованные в Sentry / трекер вместе с полным контекстом HTTP-клиента.
- Отладчик IDE, показывающий поля объекта на демо-встрече по шаринг-скрину.

Обёртка превращает каждый из этих сценариев из утечки токена в безобидную метку `<REDACTED>`. Цена — одна строка кода в точке ввода.

### Как это выглядит на практике

::: code-group

```python [Python]
from wb_api_client.items import Configuration
cfg = Configuration(access_token="eyJhbGciOi...")
print(cfg.access_token)                       # SecretStr('**********')
print(cfg.access_token.get_secret_value())    # eyJhbGciOi...  (по запросу)
```

```ts [TypeScript]
import { Configuration } from "@valeryverkhoturov/wb-api-client/items";
const cfg = new Configuration({});
cfg.setAccessToken("eyJhbGciOi...");
console.log(cfg.accessToken);                 // SecretString { <REDACTED> }
console.log(cfg.accessToken.exposeSecret());  // eyJhbGciOi...  (по запросу)
```

```go [Go]
import wbitems "github.com/ValeryVerkhoturov/wb-api-client/clients/go/items"
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("eyJhbGciOi...")
fmt.Printf("%v\n", cfg.AccessToken)           // <!SECRET_LEAKED!>
fmt.Println(cfg.AccessToken.ExposeSecret())   // eyJhbGciOi...  (по запросу)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.SecretString;
SecretString s = new SecretString("eyJhbGciOi...");
System.out.println(s);                        // <REDACTED>
System.out.println(s.exposeSecret());         // eyJhbGciOi...  (по запросу)
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
$s = new SecretString('eyJhbGciOi...');
var_dump($s);                                 // object(...) { ['value']=> '<REDACTED>' }
echo $s->exposeSecret();                      // eyJhbGciOi...  (по запросу)
```

:::

## Один токен на несколько под-модулей

Если в процессе вы используете сразу несколько под-модулей, у каждого — свой `Configuration` / `ApiClient`. Так задумано: openapi-generator создаёт полностью изолированные SDK на каждую спецификацию. Переиспользуйте строку токена, но конструируйте конфиг на каждый модуль.

::: code-group

```python [Python]
from wb_api_client.items import Configuration as ItemsCfg, ApiClient as ItemsClient
from wb_api_client.orders_fbs import Configuration as OrdCfg, ApiClient as OrdClient

TOKEN = "<ваш JWT WB>"
items_api = ItemsClient(ItemsCfg(access_token=TOKEN))
orders_api = OrdClient(OrdCfg(access_token=TOKEN))
```

```ts [TypeScript]
import { Configuration as ItemsCfg } from "@valeryverkhoturov/wb-api-client/items";
import { Configuration as OrdCfg } from "@valeryverkhoturov/wb-api-client/orders_fbs";

const TOKEN = "<ваш JWT WB>";
const itemsCfg = new ItemsCfg({}); itemsCfg.setAccessToken(TOKEN);
const ordCfg   = new OrdCfg({});   ordCfg.setAccessToken(TOKEN);
```

:::

## Ротация токенов

Токены WB не ротируются сами — их нужно заменять вручную. Хорошая практика:

1. Держите токен в секрет-менеджере (SSM, Vault, GitHub Actions secret) — не в исходниках.
2. Читайте в переменную окружения при старте процесса и конструируйте конфиг один раз.
3. На ротации: убейте процесс (или пул соединений) и запустите заново с новым токеном. Клиент кэширует токен на уровне экземпляра Configuration.

## Типичные ошибки авторизации

| Ответ | Значение |
|---|---|
| `401 Unauthorized` — `token expired` | Срок токена истёк; выпустите новый |
| `401 Unauthorized` — `invalid signature` | Неверный формат заголовка Authorization или токен от другой среды (sandbox / prod) |
| `403 Forbidden` — `no access to resource` | Токен валиден, прав не хватает — перевыпустите с правильной галочкой |
| `429 Too Many Requests` | Rate-limit; сам токен в порядке |

Ретраи и работа с ошибками — в [руководстве по обработке ошибок](/guides/error-handling).

# Authentication

Every Wildberries Seller API call takes a **bearer JWT** in the `Authorization` header. The clients handle the header for you; you just hand them the token.

## Where the token comes from

Tokens are minted in the seller portal:

1. [seller.wildberries.ru](https://seller.wildberries.ru) → **Настройки → Доступ к API**.
2. **Создать новый токен** — pick the scopes (Контент, Маркетплейс, Аналитика, …), a lifetime, and whether it's a test-sandbox token.
3. Copy the JWT immediately. It's shown once.

Each scope corresponds roughly to one or more sub-modules in the clients. If a call returns `403`, the token is valid but lacks the scope — regenerate with the missing checkbox ticked.

## Secret-string wrappers

Once you have the token, don't pass it around as a plain string. Every client wraps the value in a language-native "secret string" type so it redacts under logs, `print`, debuggers, and error dumps — unless you explicitly ask for the raw value.

| Language   | Wrapper                                                                                      | Setter                                              | Redacted under                                            | Explicit expose       |
| ---------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------------- | --------------------- |
| Python     | [`pydantic.SecretStr`](https://docs.pydantic.dev/latest/api/types/#pydantic.types.SecretStr) | `Configuration(access_token=…)`                     | `print(cfg.access_token)` → `**********`                  | `.get_secret_value()` |
| TypeScript | inlined `SecretString` class                                                                 | `Configuration.setAccessToken(…)`                   | `console.log(new SecretString("…"))` → `<REDACTED>`       | `.exposeSecret()`     |
| Go         | [`secrecy.SecretString`](https://github.com/negrel/secrecy)                                  | `Configuration.SetAccessToken(…)`                   | `fmt.Printf("%v", cfg.AccessToken)` → `<!SECRET_LEAKED!>` | `.ExposeSecret()`     |
| Java       | per-sub-module `SecretString`                                                                | `ApiClient.setBearerToken(SecretString)`            | `System.out.println(s)` → `<REDACTED>`                    | `.exposeSecret()`     |
| PHP        | per-sub-module `SecretString`                                                                | `Configuration::setAccessTokenSecret(SecretString)` | `var_dump($secret)` → `'<REDACTED>'`                      | `->exposeSecret()`    |

### Why bother?

Real incidents behind this design:

- Logger middleware that dumps the request config on error.
- `print(config)` sprinkled in during debugging and never removed.
- Exceptions serialized to Sentry / a bug tracker with the full HTTP client context attached.
- IDE debuggers displaying object internals in a shared screen-share.

The wrapper flips all of those from a token leak into a `<REDACTED>` marker. The one-line cost is the wrapper type at the boundary.

### Examples of the redaction firing

::: code-group

```python [Python]
from wb_api_client.items import Configuration
cfg = Configuration(access_token="eyJhbGciOi...")
print(cfg.access_token)           # SecretStr('**********')
print(cfg.access_token.get_secret_value())  # eyJhbGciOi...  (opt-in)
```

```ts [TypeScript]
import { Configuration } from "@valeryverkhoturov/wb-api-client/items";
const cfg = new Configuration({});
cfg.setAccessToken("eyJhbGciOi...");
console.log(cfg.accessToken);      // SecretString { <REDACTED> }
console.log(cfg.accessToken.exposeSecret()); // eyJhbGciOi...  (opt-in)
```

```go [Go]
import wbitems "github.com/ValeryVerkhoturov/wb-api-client/clients/go/items"
cfg := wbitems.NewConfiguration()
cfg.SetAccessToken("eyJhbGciOi...")
fmt.Printf("%v\n", cfg.AccessToken)         // <!SECRET_LEAKED!>
fmt.Println(cfg.AccessToken.ExposeSecret()) // eyJhbGciOi...  (opt-in)
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.items.SecretString;
SecretString s = new SecretString("eyJhbGciOi...");
System.out.println(s);            // <REDACTED>
System.out.println(s.exposeSecret()); // eyJhbGciOi...  (opt-in)
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
$s = new SecretString('eyJhbGciOi...');
var_dump($s);                     // object(...) { ['value']=> '<REDACTED>' }
echo $s->exposeSecret();          // eyJhbGciOi...  (opt-in)
```

:::

## Multiple sub-modules, one token

If you use several sub-modules in the same process, each has its own `Configuration` / `ApiClient` — because each sub-module is a self-contained SDK generated from a different upstream spec. Reuse the token string; construct a config per module.

::: code-group

```python [Python]
from wb_api_client.items import Configuration as ItemsCfg, ApiClient as ItemsClient
from wb_api_client.orders_fbs import Configuration as OrdCfg, ApiClient as OrdClient

TOKEN = "<your WB JWT>"
items_api = ItemsClient(ItemsCfg(access_token=TOKEN))
orders_api = OrdClient(OrdCfg(access_token=TOKEN))
```

```ts [TypeScript]
import { Configuration as ItemsCfg } from "@valeryverkhoturov/wb-api-client/items";
import { Configuration as OrdCfg } from "@valeryverkhoturov/wb-api-client/orders_fbs";

const TOKEN = "<your WB JWT>";
const itemsCfg = new ItemsCfg({}); itemsCfg.setAccessToken(TOKEN);
const ordCfg   = new OrdCfg({});   ordCfg.setAccessToken(TOKEN);
```

:::

## Rotating tokens

WB tokens don't rotate on the wire — you have to swap them. Best practice:

1. Store the token in a secret manager (SSM, Vault, GitHub Actions secret) — never in source.
2. Read it into an env var at process start; construct the config once.
3. On rotation: kill the process (or the connection pool) and start fresh with the new token. The clients cache the token per Configuration instance.

## Common auth failures

| Response                                  | Meaning                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------ |
| `401 Unauthorized` — `token expired`      | Token past its expiry; mint a new one                                                      |
| `401 Unauthorized` — `invalid signature`  | Wrong Authorization header format, or token from a different environment (sandbox vs prod) |
| `403 Forbidden` — `no access to resource` | Token valid, scope missing — regenerate with the right box ticked                          |
| `429 Too Many Requests`                   | Rate-limited; the token itself is fine                                                     |

See the [error-handling guide](/en/guides/error-handling) for retry patterns.

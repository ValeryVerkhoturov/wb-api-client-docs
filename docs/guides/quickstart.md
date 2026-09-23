# Быстрый старт

Пять минут: получить токен, установить клиент для своего языка, сделать первый вызов.

## 1. Получите API-токен WB

Клиентские библиотеки — это только транспорт; вам всё равно нужен аккаунт продавца Wildberries и персональный API-токен.

1. Войдите на [seller.wildberries.ru](https://seller.wildberries.ru).
2. Откройте **Настройки → Доступ к API**.
3. Создайте токен с нужными правами. Для первого теста поставьте галочку **Контент** — это то, что использует под-модуль `items`.
4. Скопируйте JWT. Повторно посмотреть его не получится.

Токены выдаются на продавца и на набор прав. Если нужно вызывать несколько категорий API (`items`, `orders_fbs`, `analytics`, …), создайте токен с объединением прав — или по токену на каждую категорию, если хотите уменьшить радиус поражения при утечке.

## 2. Установка

Один пакет на язык, внутри которого 13 категорий API как отдельные под-модули.

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

`LATEST` для Java: посмотрите текущую версию `1.YYYYMMDD.N` на [странице релизов](https://github.com/ValeryVerkhoturov/wb-api-client/releases) и подставьте её.

## 3. Первый вызов — данные о продавце

В под-модуле `general` есть эндпоинт `getV1SellerInfo` — он дёшев и подтверждает, что и токен, и сетевой путь работают.

::: code-group

```python [Python]
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import DefaultApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = DefaultApi(ApiClient(cfg))

info = api.get_v1_seller_info()
print(info)
```

```ts [TypeScript]
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/general";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const info = await api.getV1SellerInfo();
console.log(info.data);
```

```go [Go]
package main

import (
    "context"
    "fmt"

    wbgeneral "github.com/ValeryVerkhoturov/wb-api-client/clients/go/general"
)

func main() {
    cfg := wbgeneral.NewConfiguration()
    cfg.SetAccessToken("<ваш JWT WB>")
    client := wbgeneral.NewAPIClient(cfg)

    info, _, err := client.DefaultAPI.GetV1SellerInfo(context.Background()).Execute()
    if err != nil {
        panic(err)
    }
    fmt.Printf("%+v\n", info)
}
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.general.ApiClient;
import io.github.valeryverkhoturov.wbapi.general.SecretString;
import io.github.valeryverkhoturov.wbapi.general.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
DefaultApi api = new DefaultApi(client);

System.out.println(api.getV1SellerInfo());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new DefaultApi(new Client(), $config);

print_r($api->getV1SellerInfo());
```

:::

Если вернулись данные о вашем продавце — всё подключено.

## 4. Дальше

- **[Аутентификация](/guides/authentication)** — как устроен SecretString, зачем не выводить токен и как получить сырое значение, когда оно действительно нужно.
- **[Обработка ошибок](/guides/error-handling)** — коды ответов WB, стратегия ретраев на 429/5xx и как ошибки выглядят в каждом языке.
- **[Страницы языков](/languages/python)** — все под-модули, сниппеты установки и форма каждого класса `Api`.

## Что делать, если первый вызов не проходит

| Симптом | Вероятная причина | Что делать |
|---|---|---|
| `401 Unauthorized` | Токен неверен / просрочен / без нужных прав | Перевыпустите в кабинете продавца; убедитесь, что права токена подходят под модуль (например, «Контент» для `items`) |
| `403 Forbidden` | Токен валиден, но прав недостаточно | Добавьте нужные права токену или создайте новый |
| `429 Too Many Requests` | Упёрлись в лимит WB | Дождитесь `Retry-After` и откладывайте повторные запросы; SDK не ретраит сам |
| Зависает соединение | Корпоративный прокси / MITM TLS | Задайте переменную `HTTPS_PROXY`; большинство клиентов её учитывает |
| `ImportError` / `Cannot find module` | Установлено не то имя пакета | Правильное имя — `valeryverkhoturov-wb-api-client` / `@valeryverkhoturov/wb-api-client`. Пакет с «голым» именем `wb-api-client` — это другой проект |

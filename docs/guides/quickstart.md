# Быстрый старт

Пять минут: получить токен, установить клиент для своего языка, сделать первый вызов.

## 1. Получите API-токен WB

Клиентские библиотеки — это только транспорт; вам всё равно нужен аккаунт продавца Wildberries и персональный API-токен.

1. Войдите на [seller.wildberries.ru](https://seller.wildberries.ru) и откройте раздел [Интеграции по API](https://seller.wildberries.ru/api-integrations).
2. Нажмите **+ Создать токен** и выберите вкладку **Для интеграции вручную**.
3. Выберите тип токена — для обычной работы подойдёт **персональный** или **базовый**, для проверки в песочнице — **тестовый**.
4. Заполните название, выберите категории методов и уровень доступа (**Чтение и запись** или **Только чтение**). Для первого теста достаточно категории **Контент** — её использует под-модуль `items`.
5. Для персонального токена отметьте чекбокс **Я понимаю, что не следует передавать токен третьим лицам** и нажмите **Создать**.
6. Нажмите **Скопировать и закрыть** — токен окажется в буфере обмена. После этого посмотреть его в кабинете уже не получится.

Выбирайте только те категории, с которыми планируете работать. Если нужно вызывать несколько категорий API (`items`, `orders_fbs`, `analytics`, …), создайте токен с объединением категорий — или по токену на каждую категорию, если хотите уменьшить радиус поражения при утечке.

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
go get github.com/ValeryVerkhoturov/wb-api-client-go@latest
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

```bash [C#]
dotnet add package ValeryVerkhoturov.WbApiClient
```

:::

`LATEST` для Java: посмотрите текущую версию `1.YYYYMMDD.N` на [странице релизов](https://github.com/ValeryVerkhoturov/wb-api-client/releases) и подставьте её.

## 3. Первый вызов — данные о продавце

В под-модуле `general` есть эндпоинт `getV1SellerInfo` — он дёшев и подтверждает, что и токен, и сетевой путь работают.

::: code-group

```python [Python]
from wb_api_client.general import Configuration, ApiClient
from wb_api_client.general.api import GeneralApi

cfg = Configuration(access_token="<ваш JWT WB>")
api = GeneralApi(ApiClient(cfg))

info = api.get_v1_seller_info()
print(info)
```

```ts [TypeScript]
import {
  Configuration,
  GeneralApi,
} from "@valeryverkhoturov/wb-api-client/general";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new GeneralApi(cfg);

const info = await api.getV1SellerInfo();
console.log(info.data);
```

```go [Go]
package main

import (
    "context"
    "fmt"

    wbgeneral "github.com/ValeryVerkhoturov/wb-api-client-go/general"
)

func main() {
    cfg := wbgeneral.NewConfiguration()
    cfg.SetAccessToken("<ваш JWT WB>")
    client := wbgeneral.NewAPIClient(cfg)

    info, _, err := client.GeneralAPI.GetV1SellerInfo(context.Background()).Execute()
    if err != nil {
        panic(err)
    }
    fmt.Printf("%+v\n", info)
}
```

```java [Java]
import io.github.valeryverkhoturov.wbapi.general.ApiClient;
import io.github.valeryverkhoturov.wbapi.general.SecretString;
import io.github.valeryverkhoturov.wbapi.general.api.GeneralApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<ваш JWT WB>"));
GeneralApi api = new GeneralApi(client);

System.out.println(api.getV1SellerInfo());
```

```php [PHP]
use ValeryVerkhoturov\WbApiClient\General\Configuration;
use ValeryVerkhoturov\WbApiClient\General\SecretString;
use ValeryVerkhoturov\WbApiClient\General\Api\GeneralApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));
$api = new GeneralApi(new Client(), $config);

print_r($api->getV1SellerInfo());
```

```bsl [OneScript]
#Использовать "wb-api-client"

Настройки = Новый Конфигурация();
Настройки.УстановитьТокен("<ваш JWT WB>");
Клиент = Новый GeneralApi(Настройки);

Сообщить(Клиент.GetV1SellerInfo().Тело);
```

```csharp [C#]
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");
var api = new GeneralApi(config);

Console.WriteLine(api.GetV1SellerInfo());
```

:::

Если вернулись данные о вашем продавце — всё подключено.

## 4. Дальше

- **[Аутентификация](/guides/authentication)** — как устроен SecretString, зачем не выводить токен и как получить сырое значение, когда оно действительно нужно.
- **[Обработка ошибок](/guides/error-handling)** — коды ответов WB, стратегия ретраев на 429/5xx и как ошибки выглядят в каждом языке.
- **[Страницы языков](/languages/python)** — все под-модули, сниппеты установки и форма каждого класса `Api`.

## Что делать, если первый вызов не проходит

| Симптом                              | Вероятная причина                                | Что делать                                                                                                                                          |
| ------------------------------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `401 Unauthorized`                   | Токен неверен / просрочен / без нужных категорий | Перевыпустите в кабинете продавца; убедитесь, что категории токена подходят под модуль (например, «Контент» для `items`)                            |
| `403 Forbidden`                      | Токен валиден, но категорий недостаточно         | Добавьте токену нужную категорию или создайте новый                                                                                                 |
| `429 Too Many Requests`              | Упёрлись в лимит WB                              | Подождите `X-Ratelimit-Retry` секунд из ответа и откладывайте повторные запросы; SDK не ретраит сам                                                 |
| Зависает соединение                  | Корпоративный прокси / MITM TLS                  | Задайте переменную `HTTPS_PROXY`; большинство клиентов её учитывает                                                                                 |
| `ImportError` / `Cannot find module` | Установлено не то имя пакета                     | Правильное имя — `valeryverkhoturov-wb-api-client` / `@valeryverkhoturov/wb-api-client`. Пакет с «голым» именем `wb-api-client` — это другой проект |

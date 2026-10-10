# C#

Пакет: [`ValeryVerkhoturov.WbApiClient`](https://www.nuget.org/packages/ValeryVerkhoturov.WbApiClient) на NuGet.

- **Целевая платформа:** .NET 8.0
- **HTTP:** [RestSharp](https://restsharp.dev/)
- **Пространство имён:** `ValeryVerkhoturov.WbApiClient.<Категория>`
- **Обёртка секретов:** `SecretString` в каждом пространстве имён

## Установка

```bash
dotnet add package ValeryVerkhoturov.WbApiClient
```

Или в `.csproj`:

```xml
<PackageReference Include="ValeryVerkhoturov.WbApiClient" Version="1.20260926.0" />
```

## Форма пространств имён

Корень — `ValeryVerkhoturov.WbApiClient`, каждая категория WB это PascalCase-подпространство. Внутри него генератор раскладывает код по трём частям:

```csharp
using ValeryVerkhoturov.WbApiClient.Items.Api;     // классы Api
using ValeryVerkhoturov.WbApiClient.Items.Client;  // Configuration, SecretString, ApiException
using ValeryVerkhoturov.WbApiClient.Items.Model;   // модели запросов и ответов
```

Категории изолированы пространствами имён, поэтому одноимённые модели из разных разделов не конфликтуют: `Items.Model.Error` и `Finances.Model.Error` сосуществуют.

## Под-пространства

`General`, `Items`, `OrdersFbs`, `OrdersDbw`, `Dbs`, `InStorePickup`, `OrdersFbw`, `Promotion`, `Communications`, `Rates`, `Analytics`, `Reports`, `Finances`.

## Авторизация

```csharp
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<ваш JWT WB>");

var api = new GeneralApi(config);
var ping = api.GetPing();

Console.WriteLine(ping.Status);
```

`AccessTokenSecret` — рекомендованный путь. Свойство `AccessToken` с голой строкой тоже работает (через него генератор собирает заголовок `Authorization`), но предпочитайте обёртку.

Токен не раскрывается при выводе: `ToString()` у `SecretString` всегда возвращает `<REDACTED>`, а через него проходят и интерполяция строк, и `Console.WriteLine`, и большинство логгеров.

```csharp
Console.WriteLine($"{config.AccessTokenSecret}");        // <REDACTED>
Console.WriteLine(config.AccessTokenSecret.ExposeSecret()); // eyJhbGciOi...  (по запросу)
```

## Асинхронные вызовы

У каждого метода есть асинхронный вариант с суффиксом `Async`, принимающий `CancellationToken`:

```csharp
var ping = await api.GetPingAsync(cancellationToken: token);
```

## Настройки клиента

```csharp
var config = new Configuration
{
    AccessTokenSecret = new SecretString(token),
    Timeout = TimeSpan.FromSeconds(60),          // по умолчанию 100 секунд
    UserAgent = "MyApp/1.2.3 ValeryVerkhoturov/wb-api-client/csharp",
};

config.DefaultHeaders.Add("X-Request-Id", requestId);
```

Каждый запрос по умолчанию отправляет `ValeryVerkhoturov/wb-api-client/csharp`.

### Адрес сервиса

У каждой категории WB свой хост, и он подставлен в клиент из спецификации. Чтобы направить запросы на другой хост — например на песочницу — задайте `BasePath`:

```csharp
config.BasePath = "https://marketplace-api-sandbox.wildberries.ru";
```

## Обработка ошибок

Ответы 4xx и 5xx приводят к `ApiException`:

```csharp
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var fbsConfig = new Configuration();
fbsConfig.AccessTokenSecret = new SecretString("<ваш JWT WB>");

var fbs = new OrdersFbsApi(fbsConfig);

try
{
    var orders = fbs.GetV3Orders(limit: 10, next: 0);
}
catch (ApiException e)
{
    Console.WriteLine(e.ErrorCode);    // код состояния HTTP
    Console.WriteLine(e.Message);
    Console.WriteLine(e.ErrorContent); // тело ответа
}
```

::: warning Configuration своя в каждом пространстве имён
Генератор выпускает отдельный `Configuration` (и `SecretString`, и
`ApiException`) в каждой категории, поэтому `OrdersFbs.Client.Configuration` —
это не `General.Client.Configuration`. Один экземпляр на все категории
переиспользовать не получится: каждый класс Api принимает `Configuration`
своего пространства имён. Токен при этом один и тот же.
:::

## Внедрение зависимостей

Клиенты Api — обычные классы с конструктором от `Configuration`, поэтому регистрируются как есть:

```csharp
services.AddSingleton(_ =>
{
    var config = new Configuration();
    config.AccessTokenSecret = new SecretString(
        builder.Configuration["Wb:Token"]);
    return config;
});

services.AddTransient<GeneralApi>();
```

Отдельного пакета для DI не требуется: генератор использует библиотеку RestSharp, а не `IHttpClientFactory`.

## См. также

- [Аутентификация](/guides/authentication)
- [Обработка ошибок](/guides/error-handling)
- [Пакет на NuGet](https://www.nuget.org/packages/ValeryVerkhoturov.WbApiClient)

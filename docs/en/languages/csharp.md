# C#

Package: [`ValeryVerkhoturov.WbApiClient`](https://www.nuget.org/packages/ValeryVerkhoturov.WbApiClient) on NuGet.

- **Target framework:** .NET 8.0
- **HTTP:** [RestSharp](https://restsharp.dev/)
- **Namespace:** `ValeryVerkhoturov.WbApiClient.<Category>`
- **Secret wrapper:** per-namespace `SecretString`

## Install

```bash
dotnet add package ValeryVerkhoturov.WbApiClient
```

Or in your `.csproj`:

```xml
<PackageReference Include="ValeryVerkhoturov.WbApiClient" Version="1.20260926.0" />
```

## Namespace shape

The root is `ValeryVerkhoturov.WbApiClient`, and each WB category is a PascalCase sub-namespace. Inside one, the generator splits the code three ways:

```csharp
using ValeryVerkhoturov.WbApiClient.Items.Api;     // Api classes
using ValeryVerkhoturov.WbApiClient.Items.Client;  // Configuration, SecretString, ApiException
using ValeryVerkhoturov.WbApiClient.Items.Model;   // request and response models
```

Categories are isolated by namespace, so identically named models from different sections coexist: `Items.Model.Error` and `Finances.Model.Error` are separate types.

## Sub-namespaces

`General`, `Items`, `OrdersFbs`, `OrdersDbw`, `Dbs`, `InStorePickup`, `OrdersFbw`, `Promotion`, `Communications`, `Rates`, `Analytics`, `Reports`, `Finances`.

## Authentication

```csharp
using ValeryVerkhoturov.WbApiClient.General.Api;
using ValeryVerkhoturov.WbApiClient.General.Client;

var config = new Configuration();
config.AccessTokenSecret = new SecretString("<your WB JWT>");

var api = new WBAPIApi(config);
var ping = api.GetPing();

Console.WriteLine(ping.Status);
```

`AccessTokenSecret` is the recommended path. The plain-string `AccessToken` property also works — it is what the generator reads to build the `Authorization` header — but prefer the wrapper.

The token does not leak when printed: `SecretString.ToString()` always returns `<REDACTED>`, and string interpolation, `Console.WriteLine` and most logging frameworks all go through it.

```csharp
Console.WriteLine($"{config.AccessTokenSecret}");           // <REDACTED>
Console.WriteLine(config.AccessTokenSecret.ExposeSecret()); // eyJhbGciOi...  (on request)
```

## Async calls

Every method has an `Async` counterpart taking a `CancellationToken`:

```csharp
var ping = await api.GetPingAsync(cancellationToken: token);
```

## Client settings

```csharp
var config = new Configuration
{
    AccessTokenSecret = new SecretString(token),
    Timeout = TimeSpan.FromSeconds(60),          // 100 seconds by default
    UserAgent = "MyApp/1.2.3 ValeryVerkhoturov/wb-api-client/csharp",
};

config.DefaultHeaders.Add("X-Request-Id", requestId);
```

Every request sends `ValeryVerkhoturov/wb-api-client/csharp` by default.

### Service address

Each WB category sits behind its own host, already baked into the client from the spec. To send requests elsewhere — a sandbox, say — set `BasePath`:

```csharp
config.BasePath = "https://marketplace-api-sandbox.wildberries.ru";
```

## Error handling

A 4xx or 5xx response raises `ApiException`:

```csharp
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Api;
using ValeryVerkhoturov.WbApiClient.OrdersFbs.Client;

var fbsConfig = new Configuration();
fbsConfig.AccessTokenSecret = new SecretString("<your WB JWT>");

var fbs = new FBSApi(fbsConfig);

try
{
    var orders = fbs.GetV3Orders(limit: 10, next: 0);
}
catch (ApiException e)
{
    Console.WriteLine(e.ErrorCode);    // HTTP status code
    Console.WriteLine(e.Message);
    Console.WriteLine(e.ErrorContent); // response body
}
```

::: warning Configuration is per-namespace
The generator emits its own `Configuration` — and `SecretString`, and `ApiException` — inside every category, so `OrdersFbs.Client.Configuration` is not `General.Client.Configuration`. A single instance cannot be shared across categories: each Api class takes the `Configuration` from its own namespace. The token itself is the same one.
:::

## Dependency injection

Api clients are ordinary classes with a `Configuration` constructor, so they register as-is:

```csharp
services.AddSingleton(_ =>
{
    var config = new Configuration();
    config.AccessTokenSecret = new SecretString(
        builder.Configuration["Wb:Token"]);
    return config;
});

services.AddTransient<WBAPIApi>();
```

No DI-specific package is needed: the client is built on RestSharp rather than `IHttpClientFactory`.

## See also

- [Authentication guide](/en/guides/authentication)
- [Error handling](/en/guides/error-handling)
- [Package on NuGet](https://www.nuget.org/packages/ValeryVerkhoturov.WbApiClient)

# Java

Coordinates: `io.github.valeryverkhoturov:wb-api-client` on [Maven Central](https://central.sonatype.com/artifact/io.github.valeryverkhoturov/wb-api-client).

- **Java:** 8+ (compiled with `-source 1.8 -target 1.8`)
- **HTTP:** OkHttp 4
- **JSON:** Gson + gson-fire
- **Secret wrapper:** per-sub-module `SecretString`

## Install

::: code-group

```xml [Maven]
<dependency>
  <groupId>io.github.valeryverkhoturov</groupId>
  <artifactId>wb-api-client</artifactId>
  <version>LATEST</version>
</dependency>
```

```kts [Gradle (Kotlin)]
dependencies {
    implementation("io.github.valeryverkhoturov:wb-api-client:LATEST")
}
```

```groovy [Gradle (Groovy)]
dependencies {
    implementation 'io.github.valeryverkhoturov:wb-api-client:LATEST'
}
```

```scala [sbt]
libraryDependencies += "io.github.valeryverkhoturov" % "wb-api-client" % "LATEST"
```

:::

Replace `LATEST` with the current `1.YYYYMMDD.N` version from [releases](https://github.com/ValeryVerkhoturov/wb-api-client/releases).

## Package layout

Base package: `io.github.valeryverkhoturov.wbapi`. Each WB category lives in a sub-package with its own `ApiClient`, models, and `api` classes.

```java
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.DefaultApi;
```

## Sub-packages

`general`, `items`, `orders_fbs`, `orders_dbw`, `dbs`, `in_store_pickup`, `orders_fbw`, `promotion`, `communications`, `rates`, `analytics`, `reports`, `finances`.

Full per-module API class listing: [clients/java/README.md](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/clients/java/README.md).

## Auth

```java
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.SecretString;
import io.github.valeryverkhoturov.wbapi.items.api.DefaultApi;

ApiClient client = new ApiClient();
client.setBearerToken(new SecretString("<your WB JWT>"));

DefaultApi api = new DefaultApi(client);
```

`setBearerToken` requires a `SecretString`, not a bare `String` — that's deliberate. The compile-time constraint pushes callers to think about where the raw token comes from.

To read the raw value back:

```java
SecretString token = /* ... */;
String raw = token.exposeSecret();
```

## One `SecretString` per sub-package — why?

The wrapper is generated into each sub-package rather than shared across the whole library because openapi-generator emits fully isolated SDKs per spec — there is no shared "core" module. Consolidating would require an additional generator pass with cross-module coupling. The cost is a class per sub-package; the benefit is the client remains a pure openapi-generator output with only surgical patches.

Practically: `import io.github.valeryverkhoturov.wbapi.items.SecretString` vs `.orders_fbs.SecretString` — pick the one that matches the sub-module you're using.

## Custom OkHttp client

Wire your own instance for proxying, interceptors, or custom timeouts:

```java
import okhttp3.OkHttpClient;
import java.time.Duration;

OkHttpClient http = new OkHttpClient.Builder()
    .connectTimeout(Duration.ofSeconds(5))
    .readTimeout(Duration.ofSeconds(120))
    .build();

ApiClient client = new ApiClient(http);
client.setBearerToken(new SecretString(TOKEN));
```

## Java 8 vs newer

The generator emits Java-8-compatible code with `threetenbp` for date/time. If you're on Java 11+, this still works — no need to add a "modern" dependency. If you'd rather use `java.time` directly, the models expose the underlying string values via `set*ToString` / `get*ToString` methods where applicable.

## Testing

Override the base path:

```java
ApiClient client = new ApiClient();
client.setBasePath("http://localhost:8080");
```

## See also

- [Authentication guide](/guides/authentication)
- [Error handling](/guides/error-handling)
- [Full per-module reference on GitHub](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/clients/java/README.md)

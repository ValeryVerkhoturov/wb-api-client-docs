---
description: "Java-клиент Wildberries Seller API: координаты io.github.valeryverkhoturov:wb-api-client с Maven Central, 13 категорий API, маскирование токена."
---

# Java

Координаты: `io.github.valeryverkhoturov:wb-api-client` на [Maven Central](https://central.sonatype.com/artifact/io.github.valeryverkhoturov/wb-api-client).

- **Java:** 8+ (компилируется с `-source 1.8 -target 1.8`)
- **HTTP:** OkHttp 4
- **JSON:** Gson + gson-fire
- **Обёртка секретов:** `SecretString` в каждом под-пакете

## Установка

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

Замените `LATEST` на актуальную версию `1.YYYYMMDD.N` со [страницы релизов](https://github.com/ValeryVerkhoturov/wb-api-client/releases).

## Раскладка пакетов

Базовый пакет: `io.github.valeryverkhoturov.wbapi`. Каждая категория WB — свой под-пакет со своим `ApiClient`, моделями и классами `api`.

```java
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.api.ItemsApi;
```

## Под-пакеты

`general`, `items`, `orders_fbs`, `orders_dbw`, `dbs`, `in_store_pickup`, `orders_fbw`, `promotion`, `communications`, `rates`, `analytics`, `reports`, `finances`.

Полный список API-классов на модуль: [clients/java/README.md](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/clients/java/README.md).

## Авторизация

```java
import io.github.valeryverkhoturov.wbapi.items.ApiClient;
import io.github.valeryverkhoturov.wbapi.items.api.ItemsApi;

ApiClient client = new ApiClient();
client.setAccessToken("<ваш JWT WB>");

ItemsApi api = new ItemsApi(client);
```

`setAccessToken` принимает обычную `String` и оборачивает её в `SecretString` внутри клиента — конструировать обёртку руками не нужно, а в логах и дампах токен остаётся замаскированным.

## Один `SecretString` на под-пакет — почему

Обёртка генерируется в каждый под-пакет, а не расшарена на всю библиотеку, потому что openapi-generator создаёт полностью изолированные SDK на каждую спецификацию — общего «core»-модуля нет. Объединение потребовало бы дополнительного прохода генерации с межмодульными зависимостями. Цена — один класс на под-пакет; плюс в том, что клиент остаётся чистым выхлопом openapi-generator с минимальными точечными правками.

На практике это незаметно: `setAccessToken` оборачивает строку в `SecretString` своего под-пакета сам, поэтому импортировать и конструировать обёртку не требуется.

## Свой OkHttp-клиент

Подставьте свой экземпляр для прокси, интерсепторов или кастомных таймаутов:

```java
import okhttp3.OkHttpClient;
import java.time.Duration;

OkHttpClient http = new OkHttpClient.Builder()
    .connectTimeout(Duration.ofSeconds(5))
    .readTimeout(Duration.ofSeconds(120))
    .build();

ApiClient client = new ApiClient(http);
client.setAccessToken(TOKEN);
```

## Java 8 vs новее

Генератор выдаёт Java-8-совместимый код с `threetenbp` для дат и времени. На Java 11+ это по-прежнему работает — «современную» зависимость дополнительно ставить не нужно. Если хочется работать с `java.time` напрямую, модели предоставляют доступ к исходным строковым значениям через методы `set*ToString` / `get*ToString`, где это применимо.

## Тестирование

Переопределите base path:

```java
ApiClient client = new ApiClient();
client.setBasePath("http://localhost:8080");
```

## См. также

- [Аутентификация](/guides/authentication)
- [Обработка ошибок](/guides/error-handling)
- [Полный справочник по модулям на GitHub](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/clients/java/README.md)

<p align="center">
  <img src="/pics/blueberry-java-animated.webp" style="height: 200px; width: auto; max-width: 100%; object-fit: contain" alt="wb-api-client mascot">
</p>

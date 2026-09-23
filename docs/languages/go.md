# Go

Модуль: `github.com/ValeryVerkhoturov/wb-api-client/clients/go` — резолвится из git-тегов [основного репозитория](https://github.com/ValeryVerkhoturov/wb-api-client).

- **Go:** 1.22+
- **HTTP:** `net/http` (стандартная библиотека)
- **Обёртка секретов:** [`github.com/negrel/secrecy`](https://github.com/negrel/secrecy)

## Установка

```bash
go get github.com/ValeryVerkhoturov/wb-api-client/clients/go@latest
```

Зафиксировать конкретную версию по тегу:

```bash
go get github.com/ValeryVerkhoturov/wb-api-client/clients/go@v1.20260921.0
```

`proxy.golang.org` берёт код прямо из пушнутого тега — отдельный реестр не нужен.

## Почему модуль лежит под `/clients/go`

Основной репозиторий хостит пять языковых клиентов; в Go принято «один модуль на репозиторий», поэтому путь модуля включает под-каталог. Теги релизов покрывают все пять языков одновременно — Go подхватывает нужный тег.

Поскольку `MAJOR = 1` зафиксирован (см. [версионирование](/reference/versioning)), суффикса `/v2` не будет ни сейчас, ни в будущем.

## Форма импортов

По одному Go-пакету на категорию WB API, у каждого свои `Configuration`, `APIClient` и типы `*API`.

```go
import wbitems "github.com/ValeryVerkhoturov/wb-api-client/clients/go/items"
```

Давайте каждому под-модулю алиас (`wbitems`, `wbfbs`, `wbanalytics`, …) — иначе имена конфликтуют: во всех модулях экспортируются одни и те же идентификаторы.

## Под-модули

`general`, `items`, `orders_fbs`, `orders_dbw`, `dbs`, `in_store_pickup`, `orders_fbw`, `promotion`, `communications`, `rates`, `analytics`, `reports`, `finances`.

Структуры `*API` и методы эндпоинтов на модуль перечислены в per-release README: [clients/go/README.md](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/clients/go/README.md).

## Авторизация

```go
package main

import (
    "context"
    "fmt"

    wbitems "github.com/ValeryVerkhoturov/wb-api-client/clients/go/items"
)

func main() {
    cfg := wbitems.NewConfiguration()
    cfg.SetAccessToken("<ваш JWT WB>")   // оборачивается в *secrecy.SecretString
    client := wbitems.NewAPIClient(cfg)

    v, _, err := client.DefaultAPI.SomeEndpoint(context.Background()).Execute()
    if err != nil {
        panic(err)
    }
    fmt.Printf("%+v\n", v)
}
```

`SetAccessToken` — единственный путь: стандартный для openapi-generator канал `ContextAccessToken` через `context.Value` вырезан, случайно обойти обёртку не получится.

Получить сырое значение обратно:

```go
cfg.AccessToken.ExposeSecret()
```

## Контексты

Каждый вызов принимает `context.Context`. Прокидывайте дедлайн и отмену из своего приложения — клиент их уважает:

```go
ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
defer cancel()
v, _, err := client.DefaultAPI.SomeEndpoint(ctx).Execute()
```

## Свой HTTP-клиент

Подставьте `*http.Client` для прокси, кастомных таймаутов или транспорт-обёртки:

```go
cfg := wbitems.NewConfiguration()
cfg.HTTPClient = &http.Client{
    Timeout: 60 * time.Second,
    Transport: &http.Transport{
        Proxy: http.ProxyFromEnvironment,
    },
}
```

## Тестирование

Переопределите хост при создании Configuration:

```go
cfg := wbitems.NewConfiguration()
cfg.Host = "localhost:8080"
cfg.Scheme = "http"
```

## См. также

- [Аутентификация](/guides/authentication)
- [Обработка ошибок](/guides/error-handling)
- [Полный справочник по модулям на GitHub](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/clients/go/README.md)

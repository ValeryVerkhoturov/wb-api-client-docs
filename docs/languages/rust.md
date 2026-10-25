---
description: "Rust-клиент Wildberries Seller API: крейт wb-api-client на crates.io, 13 категорий API, маскирование bearer-токена."
---

# Rust

Крейт: [`wb-api-client`](https://crates.io/crates/wb-api-client) на crates.io — исходники живут в [отдельном репозитории](https://github.com/ValeryVerkhoturov/wb-api-client-rust), подключённом к основному как submodule `clients/rust`.

- **Rust:** edition 2021 (пайплайн публикует с toolchain 1.98)
- **HTTP:** `reqwest` с `rustls-tls` — системный OpenSSL не нужен
- **Обёртка секретов:** домашний `SecretString` в каждом модуле

## Установка

```bash
cargo add wb-api-client
```

Зафиксировать конкретную версию по тегу git-зависимостью:

```toml
wb-api-client = { git = "https://github.com/ValeryVerkhoturov/wb-api-client-rust", tag = "v1.20261022.0" }
```

## Почему крейт живёт в отдельном репозитории

crates.io связывает крейт с выделенным репозиторием, а git-зависимости резолвятся от корня репозитория — поэтому клиент лежит в [wb-api-client-rust](https://github.com/ValeryVerkhoturov/wb-api-client-rust) с `Cargo.toml` в корне. Релизные теги (`vX.Y.Z`) пушатся в этот репозиторий тем же пайплайном, что и в основной.

## Форма импортов

Один крейт, 13 модулей-категорий под `wb_api_client::<snake_slug>`, у каждого — под-модули `apis` и `models`:

```rust
use wb_api_client::items::apis::{configuration::Configuration, items_api};
```

Методы эндпоинтов — свободные `async fn` внутри `<категория>_api` и принимают `&Configuration`, поэтому нужен async-рантайм (в примерах — `tokio`).

## Под-модули

`general`, `items`, `orders_fbs`, `orders_dbw`, `dbs`, `in_store_pickup`, `orders_fbw`, `promotion`, `communications`, `rates`, `analytics`, `reports`, `finances`.

Функции и модели на модуль перечислены в per-release README: [wb-api-client-rust/README.md](https://github.com/ValeryVerkhoturov/wb-api-client-rust#readme).

## Авторизация

```rust
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<ваш JWT WB>");   // оборачивается в SecretString

    let result = items_api::some_endpoint(&cfg).await;
    println!("{:#?}", result);
}
```

`set_access_token` — единственный путь: токен хранится в домашнем `SecretString`, у которого и `Debug`, и `Display` печатают `<REDACTED>` — случайно слить его в лог через `println!("{cfg:?}")` не получится. Получить сырое значение обратно — только явно:

```rust
use wb_api_client::items::apis::configuration::SecretString;

let s = SecretString::new("<ваш JWT WB>");
println!("{}", s.expose_secret());
```

## Свой HTTP-клиент

Подставьте свой `reqwest::Client` — для прокси, кастомных таймаутов или заголовков по умолчанию:

```rust
let mut cfg = Configuration::new();
cfg.client = reqwest::Client::builder()
    .timeout(std::time::Duration::from_secs(60))
    .build()
    .unwrap();
```

## Тестирование

Переопределите базовый URL при создании Configuration:

```rust
let mut cfg = Configuration::new();
cfg.base_path = "http://localhost:8080".to_owned();
```

## См. также

- [Аутентификация](/guides/authentication)
- [Обработка ошибок](/guides/error-handling)
- [Полный справочник по модулям на GitHub](https://github.com/ValeryVerkhoturov/wb-api-client-rust#readme)

<p align="center">
  <img src="/pics/blueberry-rust-animated.webp" style="height: 200px; width: auto; max-width: 100%; object-fit: contain" alt="wb-api-client mascot">
</p>

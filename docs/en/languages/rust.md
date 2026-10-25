---
description: "Rust client for the Wildberries Seller API: the wb-api-client crate on crates.io, 13 API categories, redacted bearer token."
---

# Rust

Crate: [`wb-api-client`](https://crates.io/crates/wb-api-client) on crates.io — the sources live in a [dedicated repo](https://github.com/ValeryVerkhoturov/wb-api-client-rust), mounted into the main one as the `clients/rust` submodule.

- **Rust:** edition 2021 (the pipeline publishes with toolchain 1.98)
- **HTTP:** `reqwest` with `rustls-tls` — no system OpenSSL needed
- **Secret wrapper:** a house `SecretString` in every module

## Install

```bash
cargo add wb-api-client
```

Pin a specific version by tag with a git dependency:

```toml
wb-api-client = { git = "https://github.com/ValeryVerkhoturov/wb-api-client-rust", tag = "v1.20261022.0" }
```

## Why the crate lives in its own repo

crates.io links the crate to a dedicated repository, and git dependencies (`wb-api-client = { git = "…", tag = "vX.Y.Z" }`) resolve from the repo root — so the client lives in [wb-api-client-rust](https://github.com/ValeryVerkhoturov/wb-api-client-rust) with `Cargo.toml` at its root. Release tags (`vX.Y.Z`) are pushed to that repo by the same pipeline that tags the main one.

## Import shape

One crate, 13 category modules under `wb_api_client::<snake_slug>`, each with `apis` and `models` submodules:

```rust
use wb_api_client::items::apis::{configuration::Configuration, items_api};
```

Endpoint methods are free `async fn`s inside `<category>_api` taking `&Configuration`, so you need an async runtime (`tokio` in the examples).

## Sub-modules

`general`, `items`, `orders_fbs`, `orders_dbw`, `dbs`, `in_store_pickup`, `orders_fbw`, `promotion`, `communications`, `rates`, `analytics`, `reports`, `finances`.

Per-module functions and models are enumerated in the per-release README: [wb-api-client-rust/README.md](https://github.com/ValeryVerkhoturov/wb-api-client-rust#readme).

## Auth

```rust
use wb_api_client::items::apis::{configuration::Configuration, items_api};

#[tokio::main]
async fn main() {
    let mut cfg = Configuration::new();
    cfg.set_access_token("<your WB JWT>");   // wrapped in SecretString

    let result = items_api::some_endpoint(&cfg).await;
    println!("{:#?}", result);
}
```

`set_access_token` is the ONLY path: the token is stored in a house `SecretString` whose `Debug` and `Display` both print `<REDACTED>` — a `println!("{cfg:?}")` can't leak it. To read the raw value back you have to ask explicitly:

```rust
use wb_api_client::items::apis::configuration::SecretString;

let s = SecretString::new("<your WB JWT>");
println!("{}", s.expose_secret());
```

## Custom HTTP client

Wire your own `reqwest::Client` for proxying, custom timeouts, or default headers:

```rust
let mut cfg = Configuration::new();
cfg.client = reqwest::Client::builder()
    .timeout(std::time::Duration::from_secs(60))
    .build()
    .unwrap();
```

## Testing

Override the base URL at Configuration construction:

```rust
let mut cfg = Configuration::new();
cfg.base_path = "http://localhost:8080".to_owned();
```

## See also

- [Authentication guide](/en/guides/authentication)
- [Error handling](/en/guides/error-handling)
- [Full per-module reference on GitHub](https://github.com/ValeryVerkhoturov/wb-api-client-rust#readme)

<p align="center">
  <img src="/pics/blueberry-rust-animated.webp" style="height: 200px; width: auto; max-width: 100%; object-fit: contain" alt="wb-api-client mascot">
</p>

# Python

Package: [`valeryverkhoturov-wb-api-client`](https://pypi.org/project/valeryverkhoturov-wb-api-client/) on PyPI.

- **Python:** 3.9+
- **HTTP:** `urllib3`
- **Models:** `pydantic` v2
- **Secret wrapper:** `pydantic.SecretStr`

## Install

```bash
pip install valeryverkhoturov-wb-api-client
```

For projects on Poetry / uv / PDM, add the dependency the usual way:

::: code-group

```toml [pyproject.toml]
[project]
dependencies = [
  "valeryverkhoturov-wb-api-client",
]
```

```bash [uv]
uv add valeryverkhoturov-wb-api-client
```

```bash [poetry]
poetry add valeryverkhoturov-wb-api-client
```

:::

## Import shape

The distribution installs one top-level package `wb_api_client` with 13 sub-modules — one per WB API category. Each sub-module is a self-contained SDK with its own `Configuration`, `ApiClient`, and `api` namespace.

```python
from wb_api_client.<slug> import Configuration, ApiClient
from wb_api_client.<slug>.api import DefaultApi
```

## Sub-modules

| Slug              | Category                                   |
| ----------------- | ------------------------------------------ |
| `general`         | Общее — ping, seller info, user management |
| `items`           | Работа с товарами (Content)                |
| `orders_fbs`      | Заказы FBS                                 |
| `orders_dbw`      | Заказы DBW                                 |
| `dbs`             | DBS                                        |
| `in_store_pickup` | Самовывоз                                  |
| `orders_fbw`      | Поставки FBW                               |
| `promotion`       | Маркетинг и продвижение                    |
| `communications`  | Общение с покупателями                     |
| `rates`           | Тарифы                                     |
| `analytics`       | Аналитика и данные                         |
| `reports`         | Отчёты                                     |
| `finances`        | Документы и бухгалтерия                    |

The exact `Api` classes per sub-module (some categories have `DefaultApi`, some have `CSVApi`, some have `WBAPIApi`) are documented in the per-release README: [clients/python/README.md](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/clients/python/README.md).

## Auth

```python
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import DefaultApi

cfg = Configuration(access_token="<your WB JWT>")   # wrapped in SecretStr
client = ApiClient(cfg)
api = DefaultApi(client)
```

Passing a bare string is fine — it's auto-wrapped. If you want the raw token back for logging / diagnostics:

```python
cfg.access_token                     # SecretStr(**********)
cfg.access_token.get_secret_value()  # "<your WB JWT>"
```

## Async / sync

The generated client is **synchronous** (urllib3). If you need async, run calls in a thread pool:

```python
import asyncio
result = await asyncio.to_thread(api.get_v1_seller_info)
```

A native-async variant is not on the roadmap — openapi-generator's async-python template lags the sync one.

## Type hints

Every model is a pydantic v2 model. Editors and type-checkers see full types:

```python
from wb_api_client.items.models import Product   # dataclass-like pydantic model
p: Product = Product.model_validate(some_dict)
```

## Testing against the client

The `Configuration` object accepts a `host` override so you can point at a mock server:

```python
cfg = Configuration(
    access_token="test-token",
    host="http://localhost:8080",
)
```

## See also

- [Authentication guide](/en/guides/authentication)
- [Error handling](/en/guides/error-handling)
- [Full per-module reference on GitHub](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/clients/python/README.md)

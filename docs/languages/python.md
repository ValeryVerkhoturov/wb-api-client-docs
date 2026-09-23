# Python

Пакет: [`valeryverkhoturov-wb-api-client`](https://pypi.org/project/valeryverkhoturov-wb-api-client/) на PyPI.

- **Python:** 3.9+
- **HTTP:** `urllib3`
- **Модели:** `pydantic` v2
- **Обёртка секретов:** `pydantic.SecretStr`

## Установка

```bash
pip install valeryverkhoturov-wb-api-client
```

Для проектов на Poetry / uv / PDM добавляется как обычная зависимость:

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

## Форма импортов

Дистрибутив ставит один пакет `wb_api_client` с 13 под-модулями — по одному на категорию WB API. Каждый под-модуль — самостоятельный SDK со своими `Configuration`, `ApiClient` и пространством `api`.

```python
from wb_api_client.<slug> import Configuration, ApiClient
from wb_api_client.<slug>.api import DefaultApi
```

## Под-модули

| Слаг | Категория |
|---|---|
| `general` | Общее — ping, инфо о продавце, управление пользователями |
| `items` | Работа с товарами (Контент) |
| `orders_fbs` | Заказы FBS |
| `orders_dbw` | Заказы DBW |
| `dbs` | DBS |
| `in_store_pickup` | Самовывоз |
| `orders_fbw` | Поставки FBW |
| `promotion` | Маркетинг и продвижение |
| `communications` | Общение с покупателями |
| `rates` | Тарифы |
| `analytics` | Аналитика и данные |
| `reports` | Отчёты |
| `finances` | Документы и бухгалтерия |

Точные классы `Api` в каждом под-модуле (где-то `DefaultApi`, где-то `CSVApi`, где-то `WBAPIApi`) описаны в README, который перегенерируется каждый релиз: [clients/python/README.md](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/clients/python/README.md).

## Авторизация

```python
from wb_api_client.items import Configuration, ApiClient
from wb_api_client.items.api import DefaultApi

cfg = Configuration(access_token="<ваш JWT WB>")   # оборачивается в SecretStr
client = ApiClient(cfg)
api = DefaultApi(client)
```

Обычная строка тоже подойдёт — она автоматически оборачивается. Чтобы прочитать сырое значение (например, для диагностики):

```python
cfg.access_token                     # SecretStr(**********)
cfg.access_token.get_secret_value()  # "<ваш JWT WB>"
```

## Async / sync

Сгенерированный клиент — **синхронный** (urllib3). Если нужна асинхронность — запускайте вызовы в тред-пуле:

```python
import asyncio
result = await asyncio.to_thread(api.get_v1_seller_info)
```

Нативно-асинхронный вариант в планах нет — asynс-python-шаблон openapi-generator отстаёт от синхронного.

## Типизация

Каждая модель — pydantic v2. IDE и статические анализаторы видят полные типы:

```python
from wb_api_client.items.models import Product   # pydantic-модель, dataclass-like
p: Product = Product.model_validate(some_dict)
```

## Тестирование против клиента

У `Configuration` есть параметр `host` — можно направить на мок-сервер:

```python
cfg = Configuration(
    access_token="test-token",
    host="http://localhost:8080",
)
```

## См. также

- [Аутентификация](/guides/authentication)
- [Обработка ошибок](/guides/error-handling)
- [Полный справочник по модулям на GitHub](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/clients/python/README.md)

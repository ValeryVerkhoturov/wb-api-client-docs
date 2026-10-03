# Обработка ошибок

WB возвращает стандартные HTTP-коды и JSON в теле. Клиенты превращают их в языко-нативные исключения — сырой `Response` вы получите только если явно об этом попросите.

## Коды, за которыми стоит следить

| Код         | Значение                                  | Правильная реакция                                                                                                                                |
| ----------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200`–`204` | Успех                                     | Разобрать тело (или ничего не делать при 204)                                                                                                     |
| `400`       | Некорректный запрос                       | Починить запрос; ретрай бесполезен                                                                                                                |
| `401`       | Нет токена / плохой / просрочен           | Обновить токен; НЕ ретраить с тем же                                                                                                              |
| `402`       | У сервиса недостаточно средств на балансе | Возвращается только сервисам из каталога «Решения для бизнеса» — пополнить баланс                                                                 |
| `403`       | Токену не хватает прав на эндпоинт        | Проверить: категория токена подходит методу, метод разрешён типу токена, токен не создан удалённым пользователем. Перевыпустить при необходимости |
| `404`       | Ресурса нет                               | Проверить URL; бизнес-логика — не всегда ошибка. Полезное — в поле `detail` тела                                                                  |
| `409`       | Конфликт (напр. поставка уже доставлена)  | Бизнес-логика; у WB своя схема на каждый эндпоинт                                                                                                 |
| `413`       | Тело запроса больше лимита                | Уменьшить число объектов в запросе                                                                                                                |
| `422`       | Ошибка обработки параметров               | Проверить данные запроса — они не должны противоречить друг другу                                                                                 |
| `429`       | Rate-limit                                | Подождать `X-Ratelimit-Retry` секунд из ответа, повторить                                                                                         |
| `498`       | Anti-bot WBAAS                            | С этими клиентами не должно возникать (корректный UA); если увидели — что-то проксирует/переписывает запрос                                       |
| `5xx`       | Проблема на стороне WB                    | Ретрай с экспоненциальной задержкой, лимит по попыткам                                                                                            |

## Паттерн ретраев

Клиенты сами не ретраят — это осознанное решение (политика ретраев — дело приложения). Минимальный хендлер для ретраибельных ошибок:

::: code-group

```python [Python]
import time
from wb_api_client.items.exceptions import ApiException

def with_retry(fn, *, max_attempts=5, base=1.0):
    for attempt in range(1, max_attempts + 1):
        try:
            return fn()
        except ApiException as e:
            if e.status not in (429, 500, 502, 503, 504) or attempt == max_attempts:
                raise
            retry_after = float(
                e.headers.get("X-Ratelimit-Retry") or e.headers.get("Retry-After") or 0
            ) or base * 2 ** attempt
            time.sleep(retry_after)
```

```ts [TypeScript]
import { AxiosError } from "axios";

async function withRetry<T>(
  fn: () => Promise<T>,
  { maxAttempts = 5, base = 1000 } = {},
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const e = err as AxiosError;
      const status = e.response?.status ?? 0;
      if (![429, 500, 502, 503, 504].includes(status) || attempt === maxAttempts) throw err;
      const retryAfterHeader =
        e.response?.headers?.["x-ratelimit-retry"] ??
        e.response?.headers?.["retry-after"];
      const delay = retryAfterHeader
        ? Number(retryAfterHeader) * 1000
        : base * 2 ** attempt;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("unreachable");
}
```

```go [Go]
import (
    "context"
    "errors"
    "net/http"
    "time"
)

func withRetry[T any](ctx context.Context, fn func() (T, *http.Response, error)) (T, error) {
    var zero T
    for attempt := 1; attempt <= 5; attempt++ {
        v, resp, err := fn()
        if err == nil {
            return v, nil
        }
        status := 0
        if resp != nil { status = resp.StatusCode }
        if status != 429 && (status < 500 || status > 504) || attempt == 5 {
            return zero, err
        }
        delay := time.Duration(1<<attempt) * time.Second
        if resp != nil {
            ra := resp.Header.Get("X-Ratelimit-Retry")
            if ra == "" { ra = resp.Header.Get("Retry-After") }
            if ra != "" {
                if d, e := time.ParseDuration(ra + "s"); e == nil { delay = d }
            }
        }
        select {
        case <-time.After(delay):
        case <-ctx.Done():
            return zero, ctx.Err()
        }
    }
    return zero, errors.New("unreachable")
}
```

:::

## Как прочитать тело ошибки

У любого не-2xx ответа есть JSON. Форма зависит от эндпоинта: где-то `{code, message}`, где-то категория-специфичная схема вроде `Http409SupplyDeliverError`.

Сгенерированные типы исключений хранят распарсенное тело. Паттерн в каждом языке:

::: code-group

```python [Python]
try:
    api.some_endpoint(...)
except ApiException as e:
    print(e.status, e.reason)
    print(e.body)  # str; обычно JSON — json.loads(e.body)
```

```ts [TypeScript]
try {
  await api.someEndpoint(...);
} catch (e) {
  if (isAxiosError(e)) {
    console.log(e.response?.status, e.response?.data);
  }
}
```

```go [Go]
value, resp, err := client.DefaultAPI.SomeEndpoint(ctx).Execute()
if err != nil {
    if resp != nil {
        body, _ := io.ReadAll(resp.Body)
        fmt.Println(resp.StatusCode, string(body))
    }
}
```

:::

## Rate-лимиты

WB ограничивает частоту запросов по алгоритму token bucket. Лимиты у каждого метода свои — смотрите таблицу «Лимит запросов» на странице метода в [официальной документации](https://dev.wildberries.ru/openapi/api-information): период, максимум запросов за период, интервал между запросами и burst (сколько запросов можно отправить подряд без паузы).

Полезные заголовки ответа:

- `X-Ratelimit-Remaining` — сколько запросов ещё можно отправить без паузы. Уменьшается после каждого запроса и восстанавливается со временем. Есть во всех ответах, кроме `429`.
- `X-Ratelimit-Retry` — только в ответе `429`: через сколько секунд можно повторить запрос. Если повторить раньше, снова придёт `429`.
- `X-Ratelimit-Limit` и `X-Ratelimit-Reset` — только в ответе `429`: максимальный burst и через сколько секунд он восстановится.

Два нюанса:

- Лимиты зависят от типа токена: у персонального и сервисного они выше, у базового и тестового — ниже.
- В некоторых категориях (например, Маркетплейс) один запрос с ответом `4xx` считается за десять — `X-Ratelimit-Remaining` проседает сразу на 10.

Если регулярно ловите `429`, сначала уменьшите число запросов (большие страницы, кэш) — и только потом добавляйте ретраи.

## Таймауты на стороне клиента

Не все эндпоинты быстрые. `analytics` и `reports` могут генерировать большие отчёты десятками секунд. Задавайте адекватный таймаут транспорта.

::: code-group

```python [Python]
cfg = Configuration(access_token=TOKEN)
cfg.retries = 0
# per-call таймаут через параметр:
api.some_report(..., _request_timeout=(5.0, 120.0))  # (connect, read)
```

```ts [TypeScript]
import axios from "axios";
const cfg = new Configuration({});
cfg.baseOptions = { ...cfg.baseOptions, timeout: 120_000 };
```

```go [Go]
import "net/http"
import "time"
cfg := wbanalytics.NewConfiguration()
cfg.HTTPClient = &http.Client{Timeout: 120 * time.Second}
```

:::

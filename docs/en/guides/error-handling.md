# Error handling

WB returns standard HTTP status codes plus a JSON body. The clients surface these as language-native exceptions — you don't get a raw `Response` unless you explicitly ask for one.

## Status codes worth handling

| Code        | Meaning                                  | Right response                                                                                                                                      |
| ----------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200`–`204` | Success                                  | Parse the body (or don't, for 204)                                                                                                                  |
| `400`       | Request malformed                        | Fix the request; not retriable                                                                                                                      |
| `401`       | Missing / bad / expired token            | Refresh the token; do NOT retry with the same token                                                                                                 |
| `402`       | Service balance is out of funds          | Only returned to services from the "Solutions for Business" catalog — top up the balance                                                            |
| `403`       | Token lacks scope for this endpoint      | Check: token category matches the method, the method is allowed for the token type, the token wasn't issued by a deleted user. Regenerate if needed |
| `404`       | Resource doesn't exist                   | Check the URL; business-logic decision — not always an error. Useful details in the body's `detail` field                                           |
| `409`       | Conflict (e.g. supply already delivered) | Business-logic; specific WB schemas per endpoint                                                                                                    |
| `413`       | Request body exceeds the limit           | Reduce the number of objects in the request                                                                                                         |
| `422`       | Request parameter processing error       | Check the request data — fields must not contradict each other                                                                                      |
| `429`       | Rate-limited                             | Wait `X-Ratelimit-Retry` seconds from the response, then retry                                                                                      |
| `498`       | WBAAS anti-bot challenge                 | Never fires against these clients (correct UA) — if you see it, something is proxying/rewriting                                                     |
| `5xx`       | Upstream problem                         | Retry with exponential backoff, cap attempts                                                                                                        |

## Retry pattern

The clients don't retry on your behalf — that's a policy decision. A minimal retriable-error handler:

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

## Reading the WB error body

Every non-2xx response has a JSON body. Its shape varies per endpoint (some WB APIs use `{code, message}`, others use category-specific schemas like `Http409SupplyDeliverError`).

The generated exception types include the parsed body. Pattern in each language:

::: code-group

```python [Python]
try:
    api.some_endpoint(...)
except ApiException as e:
    print(e.status, e.reason)
    print(e.body)  # str; often JSON — json.loads(e.body)
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

## Rate limits

WB throttles requests with a token-bucket algorithm. Limits are per method — see the "Request limit" table on each method's page in the [official docs](https://dev.wildberries.ru/openapi/api-information): period, max requests per period, interval between requests, and burst (how many requests can be sent back-to-back without a pause).

Useful response headers:

- `X-Ratelimit-Remaining` — how many requests you can still send without a pause. Decreases after each request and refills over time. Present in every response except `429`.
- `X-Ratelimit-Retry` — only on `429`: how many seconds to wait before retrying. Retrying earlier just gets you another `429`.
- `X-Ratelimit-Limit` and `X-Ratelimit-Reset` — only on `429`: the maximum burst and how many seconds until it refills.

Two caveats:

- Limits depend on the token type: personal and service tokens get higher limits, base and test tokens get lower ones.
- In some categories (e.g. Marketplace) one request that fails with a `4xx` counts as ten — `X-Ratelimit-Remaining` drops by 10 at once.

If you're hitting `429` regularly, batch smarter (bigger page sizes, cache lookups) before adding retry.

## Client-side timeouts

Not all endpoints answer quickly. `analytics` and `reports` in particular can take tens of seconds to produce a large report. Bump the transport timeout accordingly.

::: code-group

```python [Python]
cfg = Configuration(access_token=TOKEN)
# urllib3 pool retries + timeout
cfg.retries = 0
# per-call timeout via keyword:
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

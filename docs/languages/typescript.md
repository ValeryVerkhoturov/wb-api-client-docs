# TypeScript

Пакет: [`@valeryverkhoturov/wb-api-client`](https://www.npmjs.com/package/@valeryverkhoturov/wb-api-client) на npm.

- **Node:** 18+
- **HTTP:** `axios`
- **Типы:** first-class TypeScript, поставляются `.d.ts`
- **Обёртка секретов:** встроенный класс `SecretString`

## Установка

::: code-group

```bash [npm]
npm install @valeryverkhoturov/wb-api-client
```

```bash [pnpm]
pnpm add @valeryverkhoturov/wb-api-client
```

```bash [yarn]
yarn add @valeryverkhoturov/wb-api-client
```

```bash [bun]
bun add @valeryverkhoturov/wb-api-client
```

:::

## Форма импортов

Каждый под-модуль — отдельный subpath-экспорт. Импортируйте из `@valeryverkhoturov/wb-api-client/<slug>`:

```ts
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/items";
```

Импорт с корня `@valeryverkhoturov/wb-api-client` не поддерживается — barrel-экспорта нет специально, чтобы не тянуть в бандл все 13 SDK, когда нужен один.

## Под-модули

По под-модулю на категорию: `general`, `items`, `orders_fbs`, `orders_dbw`, `dbs`, `in_store_pickup`, `orders_fbw`, `promotion`, `communications`, `rates`, `analytics`, `reports`, `finances`.

Полный список классов `Api` на каждый модуль — в per-release README: [clients/typescript/README.md](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/clients/typescript/README.md).

## Авторизация

```ts
import { Configuration, DefaultApi } from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<ваш JWT WB>");
const api = new DefaultApi(cfg);

const res = await api.someEndpoint();
console.log(res.data);
```

`setAccessToken` внутри оборачивает значение в `SecretString`. Прямое присваивание (`cfg.accessToken = "..."`) не поддерживается — всегда используйте сеттер, чтобы гарантировать маскирование.

Получить сырое значение обратно (например, для диагностического лога):

```ts
cfg.accessToken.exposeSecret();
```

## User-Agent

Клиент отправляет `ValeryVerkhoturov/wb-api-client/typescript` в каждом запросе — WB использует это как грубый сигнал маршрутизации. Чтобы добавить свой идентификатор приложения, не убирая базовый:

```ts
const cfg = new Configuration({});
cfg.setAccessToken(TOKEN);
cfg.baseOptions = {
  ...cfg.baseOptions,
  headers: {
    ...cfg.baseOptions.headers,
    "User-Agent":
      "MyApp/1.2.3 (+https://myapp.example) ValeryVerkhoturov/wb-api-client/typescript",
  },
};
```

## ESM / CJS

Пакет публикует dual entry points — `import` из ESM-кода, `require` из CommonJS. В `tsconfig.json` `"module": "NodeNext"` или `"module": "bundler"` выбирают правильный автоматически.

## Поддержка бандлеров

Subpath-экспорты описаны в `package.json` через `exports`. Современные бандлеры (Vite, Rollup, esbuild, Webpack 5+, Turbopack) их уважают из коробки. Webpack 4 — нет; обновляйте или пропишите алиас руками.

## Тестирование

Направьте на мок-сервер через `basePath`:

```ts
const cfg = new Configuration({ basePath: "http://localhost:8080" });
```

## См. также

- [Аутентификация](/guides/authentication)
- [Обработка ошибок](/guides/error-handling)
- [Полный справочник по модулям на GitHub](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/clients/typescript/README.md)

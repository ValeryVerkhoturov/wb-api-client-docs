# TypeScript

Package: [`@valeryverkhoturov/wb-api-client`](https://www.npmjs.com/package/@valeryverkhoturov/wb-api-client) on npm.

- **Node:** 18+
- **HTTP:** `axios`
- **Types:** first-class TypeScript, ships `.d.ts`
- **Secret wrapper:** inlined `SecretString` class

## Install

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

## Import shape

Every sub-module is a subpath export. Import from `@valeryverkhoturov/wb-api-client/<slug>`:

```ts
import {
  Configuration,
  DefaultApi,
} from "@valeryverkhoturov/wb-api-client/items";
```

You never import from the root `@valeryverkhoturov/wb-api-client` — there's no barrel to avoid pulling in 13 SDKs when you only need one.

## Sub-modules

Sub-path per category:

`general`, `items`, `orders_fbs`, `orders_dbw`, `dbs`, `in_store_pickup`, `orders_fbw`, `promotion`, `communications`, `rates`, `analytics`, `reports`, `finances`.

Full list of `Api` classes per module lives in the per-release README: [clients/typescript/README.md](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/clients/typescript/README.md).

## Auth

```ts
import { Configuration, DefaultApi } from "@valeryverkhoturov/wb-api-client/items";

const cfg = new Configuration({});
cfg.setAccessToken("<your WB JWT>");
const api = new DefaultApi(cfg);

const res = await api.someEndpoint();
console.log(res.data);
```

The `setAccessToken` method wraps the value in a `SecretString` internally. Direct assignment (`cfg.accessToken = "..."`) is not supported — always go through the setter so redaction is guaranteed.

To read the raw value back (e.g. for a diagnostic log):

```ts
cfg.accessToken.exposeSecret();
```

## User-Agent

The client sends `ValeryVerkhoturov/wb-api-client/typescript` on every request — WB uses this as a coarse-grained routing signal. To add your own app identifier without replacing it:

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

The package publishes dual entry points — `import` from ESM code, `require` from CommonJS. TypeScript `"module": "NodeNext"` or `"module": "bundler"` in your `tsconfig.json` picks the right one automatically.

## Bundler support

The subpath exports are declared in `package.json` `exports`. Modern bundlers (Vite, Rollup, esbuild, Webpack 5+, Turbopack) respect them out of the box. Webpack 4 does not — upgrade or add a manual alias.

## Testing

Point at a mock server via `basePath`:

```ts
const cfg = new Configuration({ basePath: "http://localhost:8080" });
```

## See also

- [Authentication guide](/en/guides/authentication)
- [Error handling](/en/guides/error-handling)
- [Full per-module reference on GitHub](https://github.com/ValeryVerkhoturov/wb-api-client/blob/main/clients/typescript/README.md)

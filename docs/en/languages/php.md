# PHP

Package: [`valeryverkhoturov/wb-api-client`](https://packagist.org/packages/valeryverkhoturov/wb-api-client) on Packagist.

- **PHP:** 8.1+
- **HTTP:** [Guzzle 7](https://docs.guzzlephp.org/en/stable/)
- **Autoload:** PSR-4, root namespace `ValeryVerkhoturov\WbApiClient\`
- **Secret wrapper:** per-sub-namespace `SecretString`

## Install

```bash
composer require valeryverkhoturov/wb-api-client
```

## Where the source lives

PHP is the odd language out here: Packagist requires `composer.json` at the **root** of the crawled repo, so the PHP client lives in its own repository — [`ValeryVerkhoturov/wb-api-client-php`](https://github.com/ValeryVerkhoturov/wb-api-client-php) — instead of under `clients/php` in the main mono-repo.

That sibling repo is mounted as a `clients/php` git submodule in the main repo, so daily-check regenerates all five languages in one place, then commits + tags both repos in lockstep. From a Composer consumer's perspective this is transparent — you just `composer require` and go.

## Namespace shape

Root namespace: `ValeryVerkhoturov\WbApiClient\`. Every WB category is a PascalCase sub-namespace:

```php
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
```

## Sub-namespaces

`General`, `Items`, `OrdersFbs`, `OrdersDbw`, `Dbs`, `InStorePickup`, `OrdersFbw`, `Promotion`, `Communications`, `Rates`, `Analytics`, `Reports`, `Finances`.

Full per-sub-namespace API listing: [ValeryVerkhoturov/wb-api-client-php README](https://github.com/ValeryVerkhoturov/wb-api-client-php#readme).

## Auth

```php
<?php
require 'vendor/autoload.php';

use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<your WB JWT>'));

$api = new DefaultApi(new Client(), $config);

$result = $api->someEndpoint();
```

`setAccessTokenSecret` (note the `Secret` suffix) is the sanctioned path. The plain `setAccessToken` inherited from the openapi-generator template still exists but takes a raw string — prefer the wrapper form unless you have a very specific reason.

To read the raw value back:

```php
$config->getAccessTokenSecret()->exposeSecret();
```

## User-Agent

Every request sends `ValeryVerkhoturov/wb-api-client/php` (not the openapi-generator default). To prepend your own app identifier:

```php
$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString(TOKEN))
    ->setUserAgent('MyApp/1.2.3 ValeryVerkhoturov/wb-api-client/php');
```

## Custom Guzzle client

Wire your own for proxying, middleware, custom timeouts:

```php
use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;

$stack = HandlerStack::create();
// $stack->push(...);   // your middleware here
$http = new Client([
    'timeout'  => 60,
    'handler'  => $stack,
    'proxy'    => getenv('HTTPS_PROXY') ?: null,
]);

$api = new DefaultApi($http, $config);
```

## Testing

Override the host on Configuration:

```php
$config = (new Configuration())
    ->setHost('http://localhost:8080')
    ->setAccessTokenSecret(new SecretString('test-token'));
```

## See also

- [Authentication guide](/guides/authentication)
- [Error handling](/guides/error-handling)
- [Sibling repo readme](https://github.com/ValeryVerkhoturov/wb-api-client-php#readme)

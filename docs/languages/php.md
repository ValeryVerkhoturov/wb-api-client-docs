# PHP

Пакет: [`valeryverkhoturov/wb-api-client`](https://packagist.org/packages/valeryverkhoturov/wb-api-client) на Packagist.

- **PHP:** 8.1+
- **HTTP:** [Guzzle 7](https://docs.guzzlephp.org/en/stable/)
- **Автозагрузка:** PSR-4, корневое пространство `ValeryVerkhoturov\WbApiClient\`
- **Обёртка секретов:** `SecretString` в каждом под-пространстве

## Установка

```bash
composer require valeryverkhoturov/wb-api-client
```

## Где лежит исходник

PHP здесь — отдельный случай: Packagist требует, чтобы `composer.json` был в **корне** обходимого репозитория, поэтому PHP-клиент живёт в отдельном репозитории — [`ValeryVerkhoturov/wb-api-client-php`](https://github.com/ValeryVerkhoturov/wb-api-client-php) — а не под `clients/php` в моно-репозитории.

Соседний репозиторий подключён как git-submodule по пути `clients/php` в основном репозитории, так что ежедневный CI-прогон генерирует все шесть языков в одном месте, а затем коммитит и тегает оба репозитория синхронно. Для конечного потребителя через Composer это прозрачно — просто `composer require` и работайте.

## Форма пространств имён

Корневое пространство: `ValeryVerkhoturov\WbApiClient\`. Каждая категория WB — PascalCase-подпространство:

```php
use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
```

## Под-пространства

`General`, `Items`, `OrdersFbs`, `OrdersDbw`, `Dbs`, `InStorePickup`, `OrdersFbw`, `Promotion`, `Communications`, `Rates`, `Analytics`, `Reports`, `Finances`.

Полный список API на под-пространство: [README проекта wb-api-client-php](https://github.com/ValeryVerkhoturov/wb-api-client-php#readme).

## Авторизация

```php
<?php
require 'vendor/autoload.php';

use ValeryVerkhoturov\WbApiClient\Items\Configuration;
use ValeryVerkhoturov\WbApiClient\Items\SecretString;
use ValeryVerkhoturov\WbApiClient\Items\Api\DefaultApi;
use GuzzleHttp\Client;

$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString('<ваш JWT WB>'));

$api = new DefaultApi(new Client(), $config);

$result = $api->someEndpoint();
```

`setAccessTokenSecret` (обратите внимание на суффикс `Secret`) — рекомендованный путь. Унаследованный от шаблона openapi-generator метод `setAccessToken` с голой строкой тоже существует, но предпочитайте форму с обёрткой, если только у вас нет очень специфической причины.

Получить сырое значение:

```php
$config->getAccessTokenSecret()->exposeSecret();
```

## User-Agent

Каждый запрос отправляет `ValeryVerkhoturov/wb-api-client/php` (не дефолт openapi-generator). Чтобы добавить свой идентификатор приложения:

```php
$config = (new Configuration())
    ->setAccessTokenSecret(new SecretString(TOKEN))
    ->setUserAgent('MyApp/1.2.3 ValeryVerkhoturov/wb-api-client/php');
```

## Свой Guzzle-клиент

Собственный клиент для прокси, middleware, кастомных таймаутов:

```php
use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;

$stack = HandlerStack::create();
// $stack->push(...);   // ваш middleware
$http = new Client([
    'timeout'  => 60,
    'handler'  => $stack,
    'proxy'    => getenv('HTTPS_PROXY') ?: null,
]);

$api = new DefaultApi($http, $config);
```

## Тестирование

Переопределите host на Configuration:

```php
$config = (new Configuration())
    ->setHost('http://localhost:8080')
    ->setAccessTokenSecret(new SecretString('test-token'));
```

## См. также

- [Аутентификация](/guides/authentication)
- [Обработка ошибок](/guides/error-handling)
- [README соседнего репозитория](https://github.com/ValeryVerkhoturov/wb-api-client-php#readme)

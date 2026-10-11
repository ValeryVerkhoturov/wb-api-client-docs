---
title: "Самовывоз"
description: "Операций модуля `in-store-pickup` — 18."
---

# Самовывоз · `in-store-pickup`

Операций модуля `in-store-pickup` — 18.

[Документация спецификации ↗](https://dev.wildberries.ru/en/docs/openapi/in-store-pickup) · [Все модули](/reference/api/)

Управление [сборочными заданиями](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders) и [идентификаторами маркировки](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers) Самовывоза.

Вы можете протестировать методы Самовывоза в [песочнице](https://dev.wildberries.ru/sandbox). Также в песочнице доступны [специальные методы](https://dev.wildberries.ru/docs/openapi-other/sandbox-environment#tag/marketplaceInStorePickup) для эмуляции действий пользователя

## Сборочные задания Самовывоз

| Метод  | Путь                                                      | Операция                                                                                                                                      |
| ------ | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/v3/click-collect/orders/new`                        | [Получить список новых сборочных заданий](/reference/api/in-store-pickup/get-api-v3-click-collect-orders-new)                                 |
| `GET`  | `/api/v3/click-collect/orders`                            | [Получить информацию о завершённых сборочных заданиях](/reference/api/in-store-pickup/get-api-v3-click-collect-orders)                        |
| `POST` | `/api/marketplace/v3/click-collect/orders/final-price`    | [Получить цены продавца и суммы к оплате](/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-final-price)            |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/confirm` | [Перевести сборочные задания на сборку](/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-confirm)           |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/prepare` | [Сообщить, что сборочные задания готовы к выдаче](/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-prepare) |
| `POST` | `/api/v3/click-collect/orders/client`                     | [Информация о покупателе](/reference/api/in-store-pickup/post-api-v3-click-collect-orders-client)                                             |
| `POST` | `/api/v3/click-collect/orders/client/identity`            | [Проверить, что заказ принадлежит покупателю](/reference/api/in-store-pickup/post-api-v3-click-collect-orders-client-identity)                |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/receive` | [Сообщить, что заказы приняты покупателями](/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-receive)       |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/reject`  | [Сообщить об отказе от заказов](/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-reject)                    |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/info`    | [Получить статусы сборочных заданий](/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-info)                 |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/cancel`  | [Отменить сборочные задания](/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-cancel)                       |

## Идентификаторы маркировки Самовывоз

| Метод  | Путь                                                                | Операция                                                                                                                                                   |
| ------ | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/details`             | [Получить идентификаторы маркировки сборочных заданий](/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-details)           |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/delete`              | [Удалить идентификаторы маркировки сборочных заданий](/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-delete)             |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/sgtin`               | [Закрепить коды маркировки Честного знака за сборочными заданиями](/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-sgtin) |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/uin`                 | [Закрепить УИН за сборочными заданиями](/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-uin)                              |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/imei`                | [Закрепить IMEI за сборочными заданиями](/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-imei)                            |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/gtin`                | [Закрепить GTIN за сборочными заданиями](/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-gtin)                            |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/customs-declaration` | [Закрепить номера ДТ за сборочными заданиями](/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-customs-declaration)        |

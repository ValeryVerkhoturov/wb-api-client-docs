---
title: "Самовывоз"
description: "Module `in-store-pickup` has 18 operations."
---

# Самовывоз · `in-store-pickup`

Module `in-store-pickup` has 18 operations.

[WB documentation ↗](https://dev.wildberries.ru/openapi/in-store-pickup) · [All modules](/en/reference/api/)

Управление [сборочными заданиями](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupAssemblyOrders) и [идентификаторами маркировки](https://dev.wildberries.ru/openapi/in-store-pickup#tag/inStorePickupLabelIdentifiers) Самовывоза.

Вы можете протестировать методы Самовывоза в [песочнице](https://dev.wildberries.ru/sandbox). Также в песочнице доступны [специальные методы](https://dev.wildberries.ru/docs/openapi-other/sandbox-environment#tag/marketplaceInStorePickup) для эмуляции действий пользователя

## Сборочные задания Самовывоз

| Method | Path                                                      | Operation                                                                                                                                        |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`  | `/api/v3/click-collect/orders/new`                        | [Получить список новых сборочных заданий](/en/reference/api/in-store-pickup/get-api-v3-click-collect-orders-new)                                 |
| `GET`  | `/api/v3/click-collect/orders`                            | [Получить информацию о завершённых сборочных заданиях](/en/reference/api/in-store-pickup/get-api-v3-click-collect-orders)                        |
| `POST` | `/api/marketplace/v3/click-collect/orders/final-price`    | [Получить цены продавца и суммы к оплате](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-final-price)            |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/confirm` | [Перевести сборочные задания на сборку](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-confirm)           |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/prepare` | [Сообщить, что сборочные задания готовы к выдаче](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-prepare) |
| `POST` | `/api/v3/click-collect/orders/client`                     | [Информация о покупателе](/en/reference/api/in-store-pickup/post-api-v3-click-collect-orders-client)                                             |
| `POST` | `/api/v3/click-collect/orders/client/identity`            | [Проверить, что заказ принадлежит покупателю](/en/reference/api/in-store-pickup/post-api-v3-click-collect-orders-client-identity)                |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/receive` | [Сообщить, что заказы приняты покупателями](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-receive)       |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/reject`  | [Сообщить об отказе от заказов](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-reject)                    |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/info`    | [Получить статусы сборочных заданий](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-info)                 |
| `POST` | `/api/marketplace/v3/click-collect/orders/status/cancel`  | [Отменить сборочные задания](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-status-cancel)                       |

## Идентификаторы маркировки Самовывоз

| Method | Path                                                                | Operation                                                                                                                                                     |
| ------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/details`             | [Получить идентификаторы маркировки сборочных заданий](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-details)           |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/delete`              | [Удалить идентификаторы маркировки сборочных заданий](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-delete)             |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/sgtin`               | [Закрепить коды маркировки Честного знака за сборочными заданиями](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-sgtin) |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/uin`                 | [Закрепить УИН за сборочными заданиями](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-uin)                              |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/imei`                | [Закрепить IMEI за сборочными заданиями](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-imei)                            |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/gtin`                | [Закрепить GTIN за сборочными заданиями](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-gtin)                            |
| `POST` | `/api/marketplace/v3/click-collect/orders/meta/customs-declaration` | [Закрепить номера ДТ за сборочными заданиями](/en/reference/api/in-store-pickup/post-api-marketplace-v3-click-collect-orders-meta-customs-declaration)        |

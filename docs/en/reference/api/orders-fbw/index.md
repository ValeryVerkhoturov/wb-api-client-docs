---
title: "Поставки FBW"
description: "Module `orders-fbw` has 14 operations."
---

# Поставки FBW · `orders-fbw`

Module `orders-fbw` has 14 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/orders-fbw) · [All modules](/en/reference/api/)

Узнать больше о поставках FBW можно в [справочном центре](https://seller.wildberries.ru/instructions/subcategory/5a8e1202-0865-45b7-acae-5d0afc7add56?goBackOption=prevRoute&categoryId=479385c6-de01-4b4d-ad4e-ed941e65582e)

В разделе описаны методы получения:

- [информации для формирования поставок](https://dev.wildberries.ru/openapi/orders-fbw#tag/informationForFormingSupplies)
- [информации о поставках](https://dev.wildberries.ru/openapi/orders-fbw#tag/suppliesInformation)
  Вы можете создавать карточки товара в песочнице [Контента](https://dev.wildberries.ru/openapi/api-information#tag/authorization/Kategorii-tokenov), а потом использовать баркоды товаров в [песочнице](https://dev.wildberries.ru/sandbox) Поставок

## Информация для формирования поставок

| Method | Path                         | Operation                                                                         |
| ------ | ---------------------------- | --------------------------------------------------------------------------------- |
| `POST` | `/api/v1/acceptance/options` | [Опции приёмки](/en/reference/api/orders-fbw/post-api-v1-acceptance-options)      |
| `GET`  | `/api/v1/warehouses`         | [Список складов](/en/reference/api/orders-fbw/get-api-v1-warehouses)              |
| `GET`  | `/api/v1/transit-tariffs`    | [Транзитные направления](/en/reference/api/orders-fbw/get-api-v1-transit-tariffs) |

## Информация о поставках

| Method | Path                                        | Operation                                                                                         |
| ------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `POST` | `/api/v1/supplies`                          | [Список поставок](/en/reference/api/orders-fbw/post-api-v1-supplies)                              |
| `GET`  | `/api/v1/supplies/{ID}`                     | [Детали поставки](/en/reference/api/orders-fbw/get-api-v1-supplies-id)                            |
| `GET`  | `/api/v1/supplies/{ID}/goods`               | [Товары поставки](/en/reference/api/orders-fbw/get-api-v1-supplies-id-goods)                      |
| `GET`  | `/api/v1/supplies/{ID}/package`             | [Упаковка поставки](/en/reference/api/orders-fbw/get-api-v1-supplies-id-package)                  |
| `GET`  | `/api/supplies/v1/discrepancies/{supplyId}` | [Расхождения в поставке](/en/reference/api/orders-fbw/get-api-supplies-v1-discrepancies-supplyid) |

## Черновики поставок

| Method   | Path                                      | Operation                                                                                               |
| -------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/supplies/v1/drafts`                 | [Список черновиков](/en/reference/api/orders-fbw/get-api-supplies-v1-drafts)                            |
| `POST`   | `/api/supplies/v1/drafts`                 | [Создать черновик](/en/reference/api/orders-fbw/post-api-supplies-v1-drafts)                            |
| `DELETE` | `/api/supplies/v1/drafts/{draftId}`       | [Удалить черновик](/en/reference/api/orders-fbw/delete-api-supplies-v1-drafts-draftid)                  |
| `GET`    | `/api/supplies/v1/drafts/{draftId}/items` | [Список товаров в черновике](/en/reference/api/orders-fbw/get-api-supplies-v1-drafts-draftid-items)     |
| `POST`   | `/api/supplies/v1/drafts/{draftId}/items` | [Добавить товары в черновик](/en/reference/api/orders-fbw/post-api-supplies-v1-drafts-draftid-items)    |
| `DELETE` | `/api/supplies/v1/drafts/{draftId}/items` | [Удалить товары из черновика](/en/reference/api/orders-fbw/delete-api-supplies-v1-drafts-draftid-items) |

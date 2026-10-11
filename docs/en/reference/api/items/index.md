---
title: "Работа с товарами"
description: "Module `items` has 55 operations."
---

# Работа с товарами · `items`

Module `items` has 55 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management) · [All modules](/en/reference/api/)

С помощью методов этого раздела вы можете:

- [создавать](https://dev.wildberries.ru/openapi/item-management#tag/listingItems) и [редактировать](https://dev.wildberries.ru/openapi/item-management#tag/listings) карточки товаров
- получать [категории, предметы, характеристики и бренды товаров](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics)
- загружать [медиафайлы](https://dev.wildberries.ru/openapi/item-management#tag/mediaFiles) в карточки товаров
- настраивать [ярлыки](https://dev.wildberries.ru/openapi/item-management#tag/labels) для поиска товаров
- работать с [рекомендациями](https://dev.wildberries.ru/openapi/item-management#tag/recommendations) для товаров
- устанавливать [цены и скидки](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts)
- управлять [остатками товаров](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehousesInventory) и [складами](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehouses), если вы работаете по модели продаж со склада продавца
  Вы можете протестировать методы работы с товарами в [песочнице](https://dev.wildberries.ru/sandbox). Также в песочнице доступны [специальные методы](https://dev.wildberries.ru/docs/openapi-other/sandbox-environment#tag/itemManagement) для управления карточками товаров

Узнать, как использовать методы в бизнес-кейсах, можно в [инструкции](https://dev.wildberries.ru/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/rabota-s-tovarami) по **работе с товарами**

## Категории, предметы и характеристики

| Method | Path                                    | Operation                                                                                  |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------------ |
| `GET`  | `/content/v2/object/parent/all`         | [Родительские категории товаров](/en/reference/api/items/get-content-v2-object-parent-all) |
| `GET`  | `/content/v2/object/all`                | [Список предметов](/en/reference/api/items/get-content-v2-object-all)                      |
| `GET`  | `/content/v2/object/charcs/{subjectId}` | [Характеристики предмета](/en/reference/api/items/get-content-v2-object-charcs-subjectid)  |
| `GET`  | `/content/v2/directory/colors`          | [Цвет](/en/reference/api/items/get-content-v2-directory-colors)                            |
| `GET`  | `/content/v2/directory/kinds`           | [Пол](/en/reference/api/items/get-content-v2-directory-kinds)                              |
| `GET`  | `/content/v2/directory/countries`       | [Страна производства](/en/reference/api/items/get-content-v2-directory-countries)          |
| `GET`  | `/content/v2/directory/seasons`         | [Сезон](/en/reference/api/items/get-content-v2-directory-seasons)                          |
| `GET`  | `/content/v2/directory/vat`             | [Ставка НДС](/en/reference/api/items/get-content-v2-directory-vat)                         |
| `GET`  | `/content/v2/directory/tnved`           | [Код ТН ВЭД предмета](/en/reference/api/items/get-content-v2-directory-tnved)              |
| `GET`  | `/api/content/v2/directory/tnved/all`   | [Список кодов ТН ВЭД](/en/reference/api/items/get-api-content-v2-directory-tnved-all)      |
| `GET`  | `/api/content/v2/directory/okpd`        | [Код ОКПД2 предмета](/en/reference/api/items/get-api-content-v2-directory-okpd)            |
| `GET`  | `/api/content/v2/directory/okpd/all`    | [Список кодов ОКПД2](/en/reference/api/items/get-api-content-v2-directory-okpd-all)        |
| `GET`  | `/api/content/v1/brands`                | [Бренды](/en/reference/api/items/get-api-content-v1-brands)                                |

## Ярлыки

| Method   | Path                                | Operation                                                                                              |
| -------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `GET`    | `/content/v2/tags`                  | [Список ярлыков](/en/reference/api/items/get-content-v2-tags)                                          |
| `POST`   | `/content/v2/tag`                   | [Создание ярлыка](/en/reference/api/items/post-content-v2-tag)                                         |
| `PATCH`  | `/content/v2/tag/{id}`              | [Изменение ярлыка](/en/reference/api/items/patch-content-v2-tag-id)                                    |
| `DELETE` | `/content/v2/tag/{id}`              | [Удаление ярлыка](/en/reference/api/items/delete-content-v2-tag-id)                                    |
| `POST`   | `/content/v2/tag/nomenclature/link` | [Управление ярлыками в карточке товара](/en/reference/api/items/post-content-v2-tag-nomenclature-link) |

## Карточки товаров

| Method | Path                             | Operation                                                                                                  |
| ------ | -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `POST` | `/content/v2/get/cards/list`     | [Список карточек товаров](/en/reference/api/items/post-content-v2-get-cards-list)                          |
| `POST` | `/content/v2/cards/error/list`   | [Список несозданных карточек товаров с ошибками](/en/reference/api/items/post-content-v2-cards-error-list) |
| `POST` | `/content/v2/cards/update`       | [Редактирование карточек товаров](/en/reference/api/items/post-content-v2-cards-update)                    |
| `POST` | `/content/v2/cards/moveNm`       | [Объединение и разъединение карточек товаров](/en/reference/api/items/post-content-v2-cards-movenm)        |
| `POST` | `/content/v2/cards/delete/trash` | [Перенос карточек товаров в корзину](/en/reference/api/items/post-content-v2-cards-delete-trash)           |
| `POST` | `/content/v2/cards/recover`      | [Восстановление карточек товаров из корзины](/en/reference/api/items/post-content-v2-cards-recover)        |
| `POST` | `/content/v2/get/cards/trash`    | [Список карточек товаров в корзине](/en/reference/api/items/post-content-v2-get-cards-trash)               |

## Создание карточек товаров

| Method | Path                           | Operation                                                                                              |
| ------ | ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `GET`  | `/content/v2/cards/limits`     | [Лимиты карточек товаров](/en/reference/api/items/get-content-v2-cards-limits)                         |
| `POST` | `/content/v2/barcodes`         | [Генерация баркодов](/en/reference/api/items/post-content-v2-barcodes)                                 |
| `POST` | `/content/v2/cards/upload`     | [Создание карточек товаров](/en/reference/api/items/post-content-v2-cards-upload)                      |
| `POST` | `/content/v2/cards/upload/add` | [Создание карточек товаров с присоединением](/en/reference/api/items/post-content-v2-cards-upload-add) |

## Медиафайлы

| Method | Path                     | Operation                                                                             |
| ------ | ------------------------ | ------------------------------------------------------------------------------------- |
| `POST` | `/content/v3/media/file` | [Загрузить медиафайл](/en/reference/api/items/post-content-v3-media-file)             |
| `POST` | `/content/v3/media/save` | [Загрузить медиафайлы по ссылкам](/en/reference/api/items/post-content-v3-media-save) |

## Рекомендации

| Method | Path                                   | Operation                                                                                                   |
| ------ | -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/content/v1/recommendations/list` | [Список рекомендаций в карточках товаров](/en/reference/api/items/post-api-content-v1-recommendations-list) |
| `POST` | `/api/content/v1/recommendations/set`  | [Установить рекомендации для товаров](/en/reference/api/items/post-api-content-v1-recommendations-set)      |

## Цены и скидки

| Method | Path                                                 | Operation                                                                                                                  |
| ------ | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/v2/upload/task`                                | [Установить цены и скидки](/en/reference/api/items/post-api-v2-upload-task)                                                |
| `POST` | `/api/v2/upload/task/size`                           | [Установить цены для размеров](/en/reference/api/items/post-api-v2-upload-task-size)                                       |
| `POST` | `/api/v2/upload/task/club-discount`                  | [Установить скидки WB Клуба](/en/reference/api/items/post-api-v2-upload-task-club-discount)                                |
| `POST` | `/api/discounts-prices/v1/upload/task/b2b/wholesale` | [Установить оптовые скидки для B2B-продаж](/en/reference/api/items/post-api-discounts-prices-v1-upload-task-b2b-wholesale) |
| `GET`  | `/api/v2/history/tasks`                              | [Состояние обработанной загрузки](/en/reference/api/items/get-api-v2-history-tasks)                                        |
| `GET`  | `/api/v2/history/goods/task`                         | [Детализация обработанной загрузки](/en/reference/api/items/get-api-v2-history-goods-task)                                 |
| `GET`  | `/api/v2/buffer/tasks`                               | [Состояние необработанной загрузки](/en/reference/api/items/get-api-v2-buffer-tasks)                                       |
| `GET`  | `/api/v2/buffer/goods/task`                          | [Детализация необработанной загрузки](/en/reference/api/items/get-api-v2-buffer-goods-task)                                |
| `GET`  | `/api/v2/list/goods/filter`                          | [Получить товары с ценами](/en/reference/api/items/get-api-v2-list-goods-filter)                                           |
| `POST` | `/api/v2/list/goods/filter`                          | [Получить товары с ценами по артикулам](/en/reference/api/items/post-api-v2-list-goods-filter)                             |
| `GET`  | `/api/v2/list/goods/size/nm`                         | [Получить размеры товара с ценами](/en/reference/api/items/get-api-v2-list-goods-size-nm)                                  |
| `GET`  | `/api/v2/quarantine/goods`                           | [Получить товары в карантине](/en/reference/api/items/get-api-v2-quarantine-goods)                                         |

## Остатки на складах продавца

| Method   | Path                           | Operation                                                                           |
| -------- | ------------------------------ | ----------------------------------------------------------------------------------- |
| `PUT`    | `/api/v3/stocks/{warehouseId}` | [Обновить остатки товаров](/en/reference/api/items/put-api-v3-stocks-warehouseid)   |
| `DELETE` | `/api/v3/stocks/{warehouseId}` | [Удалить остатки товаров](/en/reference/api/items/delete-api-v3-stocks-warehouseid) |
| `POST`   | `/api/v3/stocks/{warehouseId}` | [Получить остатки товаров](/en/reference/api/items/post-api-v3-stocks-warehouseid)  |

## Склады продавца

| Method   | Path                                            | Operation                                                                                           |
| -------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/v3/offices`                               | [Получить список складов WB](/en/reference/api/items/get-api-v3-offices)                            |
| `GET`    | `/api/v3/warehouses`                            | [Получить список складов продавца](/en/reference/api/items/get-api-v3-warehouses)                   |
| `POST`   | `/api/v3/warehouses`                            | [Создать склад продавца](/en/reference/api/items/post-api-v3-warehouses)                            |
| `PUT`    | `/api/v3/warehouses/{warehouseId}`              | [Обновить склад продавца](/en/reference/api/items/put-api-v3-warehouses-warehouseid)                |
| `DELETE` | `/api/v3/warehouses/{warehouseId}`              | [Удалить склад продавца](/en/reference/api/items/delete-api-v3-warehouses-warehouseid)              |
| `GET`    | `/api/v3/dbw/warehouses/{warehouseId}/contacts` | [Список контактов](/en/reference/api/items/get-api-v3-dbw-warehouses-warehouseid-contacts)          |
| `PUT`    | `/api/v3/dbw/warehouses/{warehouseId}/contacts` | [Обновить список контактов](/en/reference/api/items/put-api-v3-dbw-warehouses-warehouseid-contacts) |

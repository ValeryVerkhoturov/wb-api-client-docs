---
title: "Item Management"
description: "Module `items` has 55 operations."
---

# Item Management · `items`

Module `items` has 55 operations.

[Specification doc ↗](https://dev.wildberries.ru/en/docs/openapi/item-management) · [All modules](/en/reference/api/)

Use the methods in this section to:

- [list items](https://dev.wildberries.ru/openapi/item-management#tag/listingItems) and [edit listings](https://dev.wildberries.ru/openapi/item-management#tag/listings)
- get [item categories, subcategories, characteristics, and brands](https://dev.wildberries.ru/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics)
- upload [media files](https://dev.wildberries.ru/openapi/item-management#tag/mediaFiles) for listings
- set up [labels](https://dev.wildberries.ru/openapi/item-management#tag/labels) for item search
- work with item [recommendations](https://dev.wildberries.ru/openapi/item-management#tag/recommendations)
- set [prices and discounts](https://dev.wildberries.ru/openapi/item-management#tag/pricesAndDiscounts)
- manage [item inventory](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehousesInventory) and [warehouses](https://dev.wildberries.ru/openapi/item-management#tag/sellerWarehouses), if you work with the sales model from the seller warehouse
  You can test the item management methods in the [sandbox](https://dev.wildberries.ru/en/sandbox). Also you can use [special methods](https://dev.wildberries.ru/en/docs/openapi-other/sandbox-environment#tag/itemManagement) in the sandbox for managing listings

You can learn how to use methods in business cases in the [instructions](https://dev.wildberries.ru/en/knowledge-base/articles/019d49a4-1320-71bb-9dac-8ba07e7177ce/working-with-items) on **working with items**

## Categories, Subcategories, and Characteristics

| Method | Path                                    | Operation                                                                                     |
| ------ | --------------------------------------- | --------------------------------------------------------------------------------------------- |
| `GET`  | `/content/v2/object/parent/all`         | [Item Parent Categories](/en/reference/api/items/get-content-v2-object-parent-all)            |
| `GET`  | `/content/v2/object/all`                | [Subcategories List](/en/reference/api/items/get-content-v2-object-all)                       |
| `GET`  | `/content/v2/object/charcs/{subjectId}` | [Subcategory Characteristics](/en/reference/api/items/get-content-v2-object-charcs-subjectid) |
| `GET`  | `/content/v2/directory/colors`          | [Color](/en/reference/api/items/get-content-v2-directory-colors)                              |
| `GET`  | `/content/v2/directory/kinds`           | [Gender](/en/reference/api/items/get-content-v2-directory-kinds)                              |
| `GET`  | `/content/v2/directory/countries`       | [Country of Origin](/en/reference/api/items/get-content-v2-directory-countries)               |
| `GET`  | `/content/v2/directory/seasons`         | [Season](/en/reference/api/items/get-content-v2-directory-seasons)                            |
| `GET`  | `/content/v2/directory/vat`             | [VAT Rate](/en/reference/api/items/get-content-v2-directory-vat)                              |
| `GET`  | `/content/v2/directory/tnved`           | [Subcategory HS-codes](/en/reference/api/items/get-content-v2-directory-tnved)                |
| `GET`  | `/api/content/v2/directory/tnved/all`   | [HS-codes List](/en/reference/api/items/get-api-content-v2-directory-tnved-all)               |
| `GET`  | `/api/content/v2/directory/okpd`        | [Subcategory OKPD2 Code](/en/reference/api/items/get-api-content-v2-directory-okpd)           |
| `GET`  | `/api/content/v2/directory/okpd/all`    | [OKPD2 Codes List](/en/reference/api/items/get-api-content-v2-directory-okpd-all)             |
| `GET`  | `/api/content/v1/brands`                | [Brands](/en/reference/api/items/get-api-content-v1-brands)                                   |

## Labels

| Method   | Path                                | Operation                                                                                        |
| -------- | ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| `GET`    | `/content/v2/tags`                  | [Labels List](/en/reference/api/items/get-content-v2-tags)                                       |
| `POST`   | `/content/v2/tag`                   | [Create a Label](/en/reference/api/items/post-content-v2-tag)                                    |
| `PATCH`  | `/content/v2/tag/{id}`              | [Update the Label](/en/reference/api/items/patch-content-v2-tag-id)                              |
| `DELETE` | `/content/v2/tag/{id}`              | [Delete the Label](/en/reference/api/items/delete-content-v2-tag-id)                             |
| `POST`   | `/content/v2/tag/nomenclature/link` | [Label Management in the Listing](/en/reference/api/items/post-content-v2-tag-nomenclature-link) |

## Listings

| Method | Path                             | Operation                                                                                 |
| ------ | -------------------------------- | ----------------------------------------------------------------------------------------- |
| `POST` | `/content/v2/get/cards/list`     | [Listings](/en/reference/api/items/post-content-v2-get-cards-list)                        |
| `POST` | `/content/v2/cards/error/list`   | [Failed Listings with Errors](/en/reference/api/items/post-content-v2-cards-error-list)   |
| `POST` | `/content/v2/cards/update`       | [Update Listings](/en/reference/api/items/post-content-v2-cards-update)                   |
| `POST` | `/content/v2/cards/moveNm`       | [Merging or Separating of Listings](/en/reference/api/items/post-content-v2-cards-movenm) |
| `POST` | `/content/v2/cards/delete/trash` | [Transfer Listing to Trash](/en/reference/api/items/post-content-v2-cards-delete-trash)   |
| `POST` | `/content/v2/cards/recover`      | [Recover Listing from Trash](/en/reference/api/items/post-content-v2-cards-recover)       |
| `POST` | `/content/v2/get/cards/trash`    | [Listings in Trash](/en/reference/api/items/post-content-v2-get-cards-trash)              |

## Listing Items

| Method | Path                           | Operation                                                                         |
| ------ | ------------------------------ | --------------------------------------------------------------------------------- |
| `GET`  | `/content/v2/cards/limits`     | [Limits for the Listings](/en/reference/api/items/get-content-v2-cards-limits)    |
| `POST` | `/content/v2/barcodes`         | [Generation of SKUs](/en/reference/api/items/post-content-v2-barcodes)            |
| `POST` | `/content/v2/cards/upload`     | [List Items](/en/reference/api/items/post-content-v2-cards-upload)                |
| `POST` | `/content/v2/cards/upload/add` | [List Items with Merge](/en/reference/api/items/post-content-v2-cards-upload-add) |

## Media Files

| Method | Path                     | Operation                                                                          |
| ------ | ------------------------ | ---------------------------------------------------------------------------------- |
| `POST` | `/content/v3/media/file` | [Upload Media File](/en/reference/api/items/post-content-v3-media-file)            |
| `POST` | `/content/v3/media/save` | [Upload Media Files via Links](/en/reference/api/items/post-content-v3-media-save) |

## Recommendations

| Method | Path                                   | Operation                                                                                     |
| ------ | -------------------------------------- | --------------------------------------------------------------------------------------------- |
| `POST` | `/api/content/v1/recommendations/list` | [Item Recommendations List](/en/reference/api/items/post-api-content-v1-recommendations-list) |
| `POST` | `/api/content/v1/recommendations/set`  | [Set Item Recommendations](/en/reference/api/items/post-api-content-v1-recommendations-set)   |

## Prices and Discounts

| Method | Path                                                 | Operation                                                                                                         |
| ------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `POST` | `/api/v2/upload/task`                                | [Set Prices and Discounts](/en/reference/api/items/post-api-v2-upload-task)                                       |
| `POST` | `/api/v2/upload/task/size`                           | [Set Size Prices](/en/reference/api/items/post-api-v2-upload-task-size)                                           |
| `POST` | `/api/v2/upload/task/club-discount`                  | [Set WB Club Discounts](/en/reference/api/items/post-api-v2-upload-task-club-discount)                            |
| `POST` | `/api/discounts-prices/v1/upload/task/b2b/wholesale` | [Set Wholesale Discounts for B2B](/en/reference/api/items/post-api-discounts-prices-v1-upload-task-b2b-wholesale) |
| `GET`  | `/api/v2/history/tasks`                              | [Processed Upload State](/en/reference/api/items/get-api-v2-history-tasks)                                        |
| `GET`  | `/api/v2/history/goods/task`                         | [Processed Upload Details](/en/reference/api/items/get-api-v2-history-goods-task)                                 |
| `GET`  | `/api/v2/buffer/tasks`                               | [Unprocessed Upload State](/en/reference/api/items/get-api-v2-buffer-tasks)                                       |
| `GET`  | `/api/v2/buffer/goods/task`                          | [Unprocessed Upload Details](/en/reference/api/items/get-api-v2-buffer-goods-task)                                |
| `GET`  | `/api/v2/list/goods/filter`                          | [Get Items with Prices](/en/reference/api/items/get-api-v2-list-goods-filter)                                     |
| `POST` | `/api/v2/list/goods/filter`                          | [Get Items with Prices by Item Numbers](/en/reference/api/items/post-api-v2-list-goods-filter)                    |
| `GET`  | `/api/v2/list/goods/size/nm`                         | [Get Item Sizes with Prices](/en/reference/api/items/get-api-v2-list-goods-size-nm)                               |
| `GET`  | `/api/v2/quarantine/goods`                           | [Get Items in Quarantine](/en/reference/api/items/get-api-v2-quarantine-goods)                                    |

## Seller Warehouses Inventory

| Method   | Path                           | Operation                                                                    |
| -------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `PUT`    | `/api/v3/stocks/{warehouseId}` | [Update Inventory](/en/reference/api/items/put-api-v3-stocks-warehouseid)    |
| `DELETE` | `/api/v3/stocks/{warehouseId}` | [Delete Inventory](/en/reference/api/items/delete-api-v3-stocks-warehouseid) |
| `POST`   | `/api/v3/stocks/{warehouseId}` | [Get Inventory](/en/reference/api/items/post-api-v3-stocks-warehouseid)      |

## Seller Warehouses

| Method   | Path                                            | Operation                                                                                      |
| -------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `GET`    | `/api/v3/offices`                               | [Get Offices](/en/reference/api/items/get-api-v3-offices)                                      |
| `GET`    | `/api/v3/warehouses`                            | [Get Warehouses](/en/reference/api/items/get-api-v3-warehouses)                                |
| `POST`   | `/api/v3/warehouses`                            | [Create Warehouse](/en/reference/api/items/post-api-v3-warehouses)                             |
| `PUT`    | `/api/v3/warehouses/{warehouseId}`              | [Update Warehouse](/en/reference/api/items/put-api-v3-warehouses-warehouseid)                  |
| `DELETE` | `/api/v3/warehouses/{warehouseId}`              | [Delete Warehouse](/en/reference/api/items/delete-api-v3-warehouses-warehouseid)               |
| `GET`    | `/api/v3/dbw/warehouses/{warehouseId}/contacts` | [Contacts List](/en/reference/api/items/get-api-v3-dbw-warehouses-warehouseid-contacts)        |
| `PUT`    | `/api/v3/dbw/warehouses/{warehouseId}/contacts` | [Update Contacts List](/en/reference/api/items/put-api-v3-dbw-warehouses-warehouseid-contacts) |

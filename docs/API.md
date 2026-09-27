# Kepocia Recipe API Documentation

Documentation for the **Kepocia Recipe** controller (`receipeController`).

- **Base URL:** `https://app.noparkeemart.my.id`
- **Parent route prefix:** `/kepocia/api`
- **Full base path:** `https://app.noparkeemart.my.id/kepocia/api`
- **Content-Type:** `application/json`
- **Controller file:** `src/app/kepocia/controller/receipeController.js`

> Every endpoint below is relative to the full base path.
> Example: endpoint `/receipe` becomes `https://app.noparkeemart.my.id/kepocia/api/receipe`.

---

## Table of Contents

- [Response Format](#response-format)
- [Error Responses](#error-responses)
- [Endpoints](#endpoints)
  - [POST /receipe](#post-receipe)
  - [POST /receipe/from-list](#post-receipefrom-list)
- [Data Models](#data-models)
  - [Recipe List Item](#recipe-list-item)
  - [Recipe Detail Object](#recipe-detail-object)
- [Enumerations / Allowed Values](#enumerations--allowed-values)

---

## Response Format

All recipe endpoints use the standardized `response()` helper shape:

```json
{
  "httpCode": 200,
  "httpMessage": "Success",
  "message": "Success get list receipe",
  "data": {},
  "error": null
}
```

| Field         | Type           | Description                                        |
| ------------- | -------------- | -------------------------------------------------- |
| `httpCode`    | `number`       | HTTP status code                                   |
| `httpMessage` | `string`       | Short status label (`Success`, `Bad Request`, ...) |
| `message`     | `string\|null` | Human-readable message                             |
| `data`        | `any\|null`    | Response payload                                   |
| `error`       | `any\|null`    | Error details (usually `null` on success)          |

---

## Error Responses

Errors are handled by the global error middleware (`src/helpers/error.js`). Application errors return the wrapped format above.

| HTTP | `httpMessage`           | Trigger                                    |
| ---- | ----------------------- | ------------------------------------------ |
| 400  | `Bad Request`           | Failed request schema validation           |
| 401  | `Auth Error`            | `AppAuthenticationError`                   |
| 403  | `Forbidden Error`       | `AppForbiddenError`                        |
| 404  | `Not Found`             | `AppNotFoundError`                         |
| 429  | `Too Many Requests`     | `AppTooManyRequestsError`                  |
| 500  | `Internal Server Error` | `AppInternalServerError` / unhandled error |

Example validation error (`400`):

```json
{
  "httpCode": 400,
  "httpMessage": "Bad Request",
  "message": "\"time\" must be one of [semua, kilat, santai]",
  "data": null,
  "error": null
}
```

---

## Endpoints

### POST /receipe

Get **3–4 recipe menu recommendations** based on available ingredients and cooking preferences.
The request is forwarded to the ARXSGPT AI service (`openai/gpt-oss-120b`) which returns JSON.

- **Full URL:** `https://app.noparkeemart.my.id/kepocia/api/receipe`
- **Method:** `POST`
- **Auth:** none

**Query Parameters**

| Field     | Type      | Required | Description                                                                |
| --------- | --------- | -------- | -------------------------------------------------------------------------- |
| `is_test` | `boolean` | no       | If present/truthy, returns a static mocked list and **skips** the AI call. |

**Request Body**

| Field         | Type       | Required | Constraints                                    |
| ------------- | ---------- | -------- | ---------------------------------------------- |
| `ingredients` | `string[]` | yes      | At least 1 item                                |
| `time`        | `string`   | yes      | One of: `semua`, `kilat`, `santai`             |
| `style`       | `string`   | yes      | One of: `all`, `tumisan`, `berkuah`, `garing`  |
| `level`       | `string`   | yes      | One of: `bebas`, `tidak pedas`, `pedas nampol` |

```json
{
  "ingredients": [
    "Telur",
    "Tahu putih",
    "Bawang putih",
    "Kecap manis",
    "Cabai rawit"
  ],
  "time": "santai",
  "style": "berkuah",
  "level": "pedas nampol"
}
```

**Success Response** — `200 OK`

`data` is an **array of [Recipe List Item](#recipe-list-item)**.

```json
{
  "httpCode": 200,
  "httpMessage": "Success",
  "message": "Success get list receipe",
  "data": [
    {
      "kecocokan_bahan": "100% Bahan Cocok",
      "nama_menu": "Soto Tahu Telur Pedas Manis",
      "waktu_memasak": "35 Menit",
      "tingkat_kesulitan": "Sedang",
      "tingkat_pedas": "Sedang",
      "tag_masakan": ["berkuah", "sunda", "pedas", "manis"],
      "deskripsi_rasa": "Kaldu gurih beraroma bawang putih, manis dari kecap, ...",
      "bahan_terpakai": [
        "Telur",
        "Tahu putih",
        "Bawang putih",
        "Kecap manis",
        "Cabai rawit"
      ],
      "tambahan_bumbu_dasar": [
        "Kaldu ayam atau sayur",
        "Garam",
        "Merica",
        "Minyak goreng",
        "Air"
      ]
    }
  ],
  "error": null
}
```

**Test Mode Response** — `200 OK` (when `?is_test=true`)

Returns the same array structure with 3 fixed sample menus (`Soto Tahu Telur Pedas Manis`,
`Sup Tahu Telur Asin Manis Pedas`, `Mie Tahu Telur Kuah Pedas Manis`).

**Errors**

| HTTP | Message                                             | Cause                                           |
| ---- | --------------------------------------------------- | ----------------------------------------------- |
| 400  | e.g. `"time" must be one of [semua, kilat, santai]` | Request body fails validation                   |
| 500  | _(handled by middleware)_                           | ARXSGPT upstream failure / invalid JSON from AI |

---

### POST /receipe/from-list

Expand a **selected menu** (a [Recipe List Item](#recipe-list-item)) into a **full, detailed recipe**
with exact measurements (`bahan_pokok`), additional seasonings (`bumbu_tambahan`), and structured
step-by-step instructions (`langkah_tutorial`) including optional timers.

- **Full URL:** `https://app.noparkeemart.my.id/kepocia/api/receipe/from-list`
- **Method:** `POST`
- **Auth:** none

**Query Parameters**

| Field     | Type      | Required | Description                                                              |
| --------- | --------- | -------- | ------------------------------------------------------------------------ |
| `is_test` | `boolean` | no       | If present/truthy, returns a static mocked recipe and skips the AI call. |

**Request Body**

All fields are **required** (pass through the item returned by [`POST /receipe`](#post-receipe)).

| Field                  | Type       | Required | Constraints                 |
| ---------------------- | ---------- | -------- | --------------------------- |
| `kecocokan_bahan`      | `string`   | yes      | —                           |
| `nama_menu`            | `string`   | yes      | —                           |
| `waktu_memasak`        | `string`   | yes      | —                           |
| `tingkat_kesulitan`    | `string`   | yes      | —                           |
| `tingkat_pedas`        | `string`   | yes      | —                           |
| `tag_masakan`          | `string[]` | yes      | At least 1 item             |
| `deskripsi_rasa`       | `string`   | yes      | —                           |
| `bahan_terpakai`       | `string[]` | yes      | At least 1 item             |
| `tambahan_bumbu_dasar` | `string[]` | yes      | At least 1 item ⚠️ see note |

```json
{
  "kecocokan_bahan": "100% Bahan Cocok",
  "nama_menu": "Soto Tahu Telur Pedas Manis",
  "waktu_memasak": "35 Menit",
  "tingkat_kesulitan": "Sedang",
  "tingkat_pedas": "Sedang",
  "tag_masakan": ["berkuah", "sunda", "pedas", "manis"],
  "deskripsi_rasa": "Kaldu gurih beraroma bawang putih, manis dari kecap, ...",
  "bahan_terpakai": [
    "Telur",
    "Tahu putih",
    "Bawang putih",
    "Kecap manis",
    "Cabai rawit"
  ],
  "tambahan_bumbu_dasar": [
    "Kaldu ayam atau sayur",
    "Garam",
    "Merica",
    "Minyak goreng",
    "Air"
  ]
}
```

> ⚠️ **Note:** The validator requires `tambahan_bumbu_dasar` to be a non-empty array **and**
> the field must exist. In the list response this field can be `null`, so if you forward a `null`
> value it will fail validation with **400**. Send at least one string, or normalize on the client
> before calling.

**Success Response** — `200 OK`

`data` is a [Recipe Detail Object](#recipe-detail-object).

```json
{
  "httpCode": 200,
  "httpMessage": "Success",
  "message": "Success get list receipe",
  "data": {
    "tag_info": [
      "Berkuah",
      "Sunda",
      "Pedas",
      "Manis",
      "Tingkat: Sedang",
      "100% Bahan Cocok"
    ],
    "judul_resep": "Soto Tahu Telur Pedas Manis",
    "deskripsi_singkat": "Kaldu gurih beraroma bawang putih, manis dari kecap, ...",
    "ringkasan": {
      "waktu": "35 Menit",
      "porsi": "2 orang",
      "rasa": "Gurih, manis, pedas"
    },
    "bahan_bahan": {
      "bahan_pokok": [
        {
          "takaran": "2 butir",
          "nama_bahan": "Telur",
          "keterangan": "Rebus setengah matang, kupas, sisihkan"
        }
      ],
      "bumbu_tambahan": [
        {
          "takaran": "500 ml",
          "nama_bahan": "Kaldu ayam atau sayur",
          "keterangan": "Kaldu cair sebagai dasar kuah"
        }
      ]
    },
    "langkah_tutorial": [
      {
        "nomor": 1,
        "judul_langkah": "Rebus Telur",
        "instruksi": "Masukkan telur ke dalam panci berisi air mendidih, rebus selama 6 menit ...",
        "timer_detik": 360
      }
    ]
  },
  "error": null
}
```

**Errors**

| HTTP | Message                        | Cause                                           |
| ---- | ------------------------------ | ----------------------------------------------- |
| 400  | e.g. `"nama_menu" is required` | Request body fails validation                   |
| 500  | _(handled by middleware)_      | ARXSGPT upstream failure / invalid JSON from AI |

---

## Data Models

### Recipe List Item

Returned as each element of `data` from [`POST /receipe`](#post-receipe).

| Field                  | Type             | Description                                 |
| ---------------------- | ---------------- | ------------------------------------------- |
| `kecocokan_bahan`      | `string`         | Ingredient match, e.g. `"100% Bahan Cocok"` |
| `nama_menu`            | `string`         | Menu name                                   |
| `waktu_memasak`        | `string`         | Cooking time, e.g. `"35 Menit"`             |
| `tingkat_kesulitan`    | `string`         | Difficulty, e.g. `"Sedang"`                 |
| `tingkat_pedas`        | `string`         | Spice level, e.g. `"Pedas Sedang"`          |
| `tag_masakan`          | `string[]`       | Tags, e.g. `["berkuah", "sunda"]`           |
| `deskripsi_rasa`       | `string`         | Flavor description                          |
| `bahan_terpakai`       | `string[]`       | Used ingredients                            |
| `tambahan_bumbu_dasar` | `string[]\|null` | Additional base seasonings (may be `null`)  |

### Recipe Detail Object

Returned as `data` from [`POST /receipe/from-list`](#post-receipefrom-list).

| Field               | Type       | Description                                                   |
| ------------------- | ---------- | ------------------------------------------------------------- |
| `tag_info`          | `string[]` | Summary tags                                                  |
| `judul_resep`       | `string`   | Recipe title                                                  |
| `deskripsi_singkat` | `string`   | Short description                                             |
| `ringkasan`         | `object`   | `{ waktu, porsi, rasa }` (all `string`)                       |
| `bahan_bahan`       | `object`   | `{ bahan_pokok: Ingredient[], bumbu_tambahan: Ingredient[] }` |
| `langkah_tutorial`  | `Step[]`   | Ordered cooking steps                                         |

**Ingredient**

| Field        | Type     | Description                    |
| ------------ | -------- | ------------------------------ |
| `takaran`    | `string` | Amount, e.g. `"2 butir"`       |
| `nama_bahan` | `string` | Ingredient name                |
| `keterangan` | `string` | Note / preparation instruction |

**Step**

| Field           | Type             | Description                                   |
| --------------- | ---------------- | --------------------------------------------- |
| `nomor`         | `number`         | Step number (1-based, ordered)                |
| `judul_langkah` | `string`         | Step title                                    |
| `instruksi`     | `string`         | Full instruction                              |
| `timer_detik`   | `number \| null` | Timer in seconds (e.g. `360`), `null` if none |

---

## Enumerations / Allowed Values

**`time`**

| Value    | Meaning        |
| -------- | -------------- |
| `semua`  | Any time       |
| `kilat`  | Quick          |
| `santai` | Relaxed / slow |

**`style`**

| Value     | Meaning        |
| --------- | -------------- |
| `all`     | All styles     |
| `tumisan` | Stir-fried     |
| `berkuah` | Soup / broth   |
| `garing`  | Crispy / fried |

**`level`**

| Value          | Meaning    |
| -------------- | ---------- |
| `bebas`        | Any        |
| `tidak pedas`  | Not spicy  |
| `pedas nampol` | Very spicy |

---

## Quick Reference

| Method | Path                             | Controller function         | Auth |
| ------ | -------------------------------- | --------------------------- | ---- |
| POST   | `/kepocia/api/receipe`           | `getListRecipe`             | No   |
| POST   | `/kepocia/api/receipe/from-list` | `getReceipeFromListReceipe` | No   |

---

## cURL Examples

**Get recipe list**

```bash
curl -X POST https://app.noparkeemart.my.id/kepocia/api/receipe \
  -H "Content-Type: application/json" \
  -d '{
    "ingredients": ["Telur","Tahu putih","Bawang putih","Kecap manis","Cabai rawit"],
    "time": "santai",
    "style": "berkuah",
    "level": "pedas nampol"
  }'
```

**Get recipe detail from a selected menu**

```bash
curl -X POST https://app.noparkeemart.my.id/kepocia/api/receipe/from-list \
  -H "Content-Type: application/json" \
  -d '{
    "kecocokan_bahan": "100% Bahan Cocok",
    "nama_menu": "Soto Tahu Telur Pedas Manis",
    "waktu_memasak": "35 Menit",
    "tingkat_kesulitan": "Sedang",
    "tingkat_pedas": "Sedang",
    "tag_masakan": ["berkuah","sunda","pedas","manis"],
    "deskripsi_rasa": "Kaldu gurih beraroma bawang putih...",
    "bahan_terpakai": ["Telur","Tahu putih","Bawang putih","Kecap manis","Cabai rawit"],
    "tambahan_bumbu_dasar": ["Kaldu ayam","Garam","Merica","Minyak goreng","Air"]
  }'
```

**Test mode (skip AI)**

```bash
curl -X POST "https://app.noparkeemart.my.id/kepocia/api/receipe?is_test=true" \
  -H "Content-Type: application/json" \
  -d '{"ingredients":["Telur"],"time":"semua","style":"all","level":"bebas"}'
```

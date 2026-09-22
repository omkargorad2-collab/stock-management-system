## Project Note

This project is a customized and extended version of an existing open-source repository. Additional modifications and AI-based stock analysis features were implemented for the AI-BFSI project.

# Stock Management System — CSV Stock Data API

A Node.js/Express REST API that ingests stock market data from CSV files, validates and stores it in MongoDB, and exposes analytics endpoints for highest volume, average close price, and average VWAP over date ranges and symbols.

## Features

- **CSV Upload** — upload stock data via `multipart/form-data` (Multer), with a middleware guard that rejects non-CSV files
- **Row-Level Validation** — streams the CSV with `csv-parser` and validates each row (date in `YYYY-MM-DD` format, all required numeric fields present and valid); returns a per-row failure report with symbol, date, and reason
- **MongoDB Storage** — valid rows are normalized (typed numbers, defaults for empty `Trades` / `Deliverable Volume`) and bulk-inserted with Mongoose `insertMany`
- **Analytics Endpoints** —
  - Highest volume record within a date range (optionally per symbol)
  - Average close price for a symbol within a date range
  - Average VWAP within a date range (optionally per symbol)
- **Postman Collection** — ready-made requests for every endpoint in `postman/Stock API.postman_collection.json`
- **Jest Test Setup** — Jest is configured (`npm test`) with a test scaffold at `test/stock.test.js`

## Tech Stack

- **Node.js** + **Express 4** (ES modules)
- **MongoDB** + **Mongoose 8**
- **Multer** — file uploads
- **csv-parser** — streaming CSV parsing
- **dotenv**, **cookie-parser**
- **Jest** — testing
- **Postman** — API testing collection

## Project Structure

```
stock-management-system/
├── server.js                  # Express app entry point
├── controllers/
│   └── stockController.js     # Upload + analytics request handlers
├── middleware/
│   └── csvValidator.js        # Multer setup + CSV mimetype guard
├── models/
│   └── stockModel.js          # Stock Mongoose schema
├── routes/
│   └── stockRoutes.js         # /api/stocks routes
├── services/
│   ├── csvService.js          # Streaming parse, validation, normalization
│   └── stockService.js        # Insert + aggregation queries
├── utils/
│   └── db.js                  # MongoDB connection
├── test/
│   └── stock.test.js          # Jest test scaffold
└── postman/
    └── Stock API.postman_collection.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/moohiit/stock-management-system.git
cd stock-management-system
npm install
```

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/stockDB
```

Start the server:

```bash
npm start        # nodemon server.js
```

The API runs at `http://localhost:5000`.

Run tests:

```bash
npm test
```

## API Endpoints

All routes are mounted under `/api/stocks`.

### 1. Upload CSV

`POST /api/stocks/upload`

- **Body:** `multipart/form-data` with field `csvfile` (a `.csv` file)
- **Expected CSV columns:** `Date, Symbol, Series, Prev Close, Open, High, Low, Last, Close, VWAP, Volume, Turnover, Trades, Deliverable Volume, %Deliverble`
- **Validation:** `Date` must be `YYYY-MM-DD`; price/volume fields must be numeric; `Trades` may be empty (defaults to 0)

**Success response:**

```json
{
  "message": "Data successfully saved in the database.",
  "success": true,
  "totalRecords": 5306,
  "successfulRecords": 4797,
  "failedRecordsCount": 509,
  "failedRecords": [
    { "symbol": "BPCL", "date": "2000-01-03", "reason": "Some column records are missing" }
  ]
}
```

### 2. Highest Volume

`GET /api/stocks/highest-volume?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD[&symbol=SYMBOL]`

Returns the record with the highest trading volume in the range (optionally filtered by symbol).

```json
{
  "message": "Data fetched successfully.",
  "success": true,
  "highest_volume": { "date": "2015-03-05", "symbol": "ULTRACEMCO", "volume": 1000000 }
}
```

### 3. Average Close Price

`GET /api/stocks/average-close?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD&symbol=SYMBOL`

Returns the average closing price for the given symbol in the range.

```json
{
  "message": "Data fetched successfully.",
  "success": true,
  "average_close": { "symbol": "MUNDRAPORT", "average": 456.7691593352886 }
}
```

### 4. Average VWAP

`GET /api/stocks/average-vwap?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD[&symbol=SYMBOL]`

Returns the average VWAP in the range (optionally filtered by symbol).

```json
{
  "message": "Data fetched successfully.",
  "success": true,
  "average_VWAP": { "symbol": "MUNDRAPORT", "average": 458.52812316715546 }
}
```

### Query Examples

- `/api/stocks/highest-volume?start_date=2008-11-27&end_date=2021-04-30&symbol=MUNDRAPORT`
- `/api/stocks/average-close?start_date=2007-11-27&end_date=2021-04-30&symbol=MUNDRAPORT`
- `/api/stocks/average-vwap?start_date=2007-11-27&end_date=2021-04-30`

## Database Structure

Each stock entry is stored as a document via the `Stock` model:

```json
{
  "date": "YYYY-MM-DD",
  "symbol": "ULTRACEMCO",
  "series": "EQ",
  "prev_close": 10.0,
  "open": 305.0,
  "high": 340.0,
  "low": 253.25,
  "last": 259.0,
  "close": 260.0,
  "vwap": 268.8,
  "volume": 6633956,
  "turnover": 1.78e14,
  "trades": 133456,
  "deliverable": 970249,
  "percent_deliverable": 0.1463
}
```

## Postman Collection

Import `postman/Stock API.postman_collection.json` into Postman:

1. Set the `server` variable to your API base URL (e.g. `http://localhost:5000`).
2. Run the upload request first with your CSV file.
3. Adjust the query parameters (dates, symbol) to match the uploaded data.
4. Run the analytics requests to verify the calculations.

---

**Author:** Mohit Patel — [mohitpatel.org](https://mohitpatel.org) · GitHub [@moohiit](https://github.com/moohiit)

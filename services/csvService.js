import csvParser from "csv-parser";
import { createReadStream } from "fs";

export const parseCSV = (filePath, callback) => {
  const results = [];
  const failedRecords = [];
  let totalRecords = 0;
  let successfulRecords = 0;

  createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (row) => {
      totalRecords++;
      if (validateRow(row)) {
        successfulRecords++;
        results.push(formatRow(row));
      } else {
        failedRecords.push({
          symbol: row.Symbol,
          date: row.Date,
          reason:"Some column records are missing"
        }); // If validation fails, add to failed records
      }
    })
    .on("end", () => {
      callback(null, {
        results, // Valid records
        totalRecords, // Total records processed
        successfulRecords, // Number of valid records
        failedRecords, // Records that failed validation
      });
    });
};

const validateRow = (row) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Expect date in YYYY-MM-DD format

  // Check for missing or empty required fields
  const hasAllRequiredFields =
    row.Date &&
    row.Symbol &&
    row.Series &&
    row["Prev Close"] &&
    row.Open &&
    row.High &&
    row.Low &&
    row.Last &&
    row.Close &&
    row.VWAP &&
    row.Volume &&
    row.Turnover &&
    row["Deliverable Volume"] &&
    row["%Deliverble"];

  return (
    hasAllRequiredFields && // All required fields must be present
    dateRegex.test(row.Date) && // Date must be in correct format
    !isNaN(row["Prev Close"]) && // "Prev Close" must be a valid number
    !isNaN(row.Open) && // "Open" must be a valid number
    !isNaN(row.High) && // "High" must be a valid number
    !isNaN(row.Low) && // "Low" must be a valid number
    !isNaN(row.Last) && // "Last" must be a valid number
    !isNaN(row.Close) && // "Close" must be a valid number
    !isNaN(row.VWAP) && // "VWAP" must be a valid number
    !isNaN(row.Volume) && // "Volume" must be a valid number
    !isNaN(row.Turnover) && // "Turnover" must be a valid number
    (row.Trades === "" || !isNaN(row.Trades)) && // "Trades" can be empty (default to 0) or a valid number
    !isNaN(row["Deliverable Volume"]) && // "Deliverable Volume" must be a valid number
    !isNaN(row["%Deliverble"]) // "%Deliverble" must be a valid number
  );
};


const formatRow = (row) => {
  return {
    date: row.Date,
    symbol: row.Symbol,
    series: row.Series,
    prev_close: parseFloat(row["Prev Close"]),
    open: parseFloat(row.Open),
    high: parseFloat(row.High),
    low: parseFloat(row.Low),
    last: parseFloat(row.Last),
    close: parseFloat(row.Close),
    vwap: parseFloat(row.VWAP),
    volume: parseInt(row.Volume, 10),
    turnover: parseFloat(row.Turnover),
    trades: row.Trades === "" ? 0 : parseInt(row.Trades, 10), // Default to 0 if empty
    deliverable:row["Deliverable Volume"]=== "" ? 0 : parseInt(row["Deliverable Volume"], 10),
    percent_deliverable: row["%Deliverble"] === "" ? 0 : parseFloat(row["%Deliverble"]),
  };
};
          

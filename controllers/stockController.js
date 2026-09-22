import { parseCSV } from "../services/csvService.js";
import { insertStockData, getHighestVolume, getAverageClose, getAverageVWAP } from "../services/stockService.js";

const uploadCSV = (req, res) => {
  parseCSV(req.file.path, async (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error processing CSV file",
        success: false,
        error: err.message,
      });
    }

    try {
      const response = await insertStockData(result.results);
      let message = "No data inserted in the database."
      if (response) {
        message="Data successfully saved in the database."
      }
      res.json({
        message,
        success: true,
        totalRecords: result.totalRecords,
        successfulRecords: result.successfulRecords,
        failedRecordsCount: result.failedRecords.length,
        failedRecords: result.failedRecords,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error saving data to database",
        success:false,
        error:error
      });
    }
  });
};

const getHighestVolumeAPI = async (req, res) => {
  const { start_date, end_date, symbol } = req.query;

  try {
    const result = await getHighestVolume(start_date, end_date, symbol);
    res.status(200).json({
      message: "Data fetched successfully.",
      success: true,
      highest_volume: result.highest_volume
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving highest volume data",
      error: error.message,
      success:false
    });
  }
};

const getAverageCloseAPI = async (req, res) => {
  const { start_date, end_date, symbol } = req.query;

  try {
    const result = await getAverageClose(start_date, end_date, symbol);
    res.status(200).json({
      message: "Data fetched successfully.",
      success:true,
      average_close:result
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving average close data",
      success:false,
      error: error.message
    });
  }
};

const getAverageVWAPAPI = async (req, res) => {
  const { start_date, end_date, symbol } = req.query;

  try {
    const result = await getAverageVWAP(start_date, end_date, symbol);
    res.status(200).json({
      message: "Data fetched successfully.",
      success: true,
      average_VWAP: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving average VWAP data",
      success: false,
      error: error.message
    });
  }
};

export  {
  uploadCSV,
  getHighestVolumeAPI,
  getAverageCloseAPI,
  getAverageVWAPAPI,
};
        

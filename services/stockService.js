import {Stock} from "../models/stockModel.js";

const insertStockData = async (data) => {
  return await Stock.insertMany(data);
};

const getHighestVolume = async (startDate, endDate, symbol) => {
  const query = { date: { $gte: startDate, $lte: endDate } };
  if (symbol) query.symbol = symbol;

  const result = await Stock.find(query).sort({ volume: -1 }).limit(1);

  return {
    highest_volume: {
      date: result[0].date,
      symbol: result[0].symbol,
      volume: result[0].volume,
    },
  };
};


const getAverageClose = async (startDate, endDate, symbol) => {
  const query = { date: { $gte: startDate, $lte: endDate }, symbol };
  const data = await Stock.find(query);

  const totalClose = data.reduce((sum, record) => sum + record.close, 0);
  return {
    symbol,
    average: totalClose / data.length
};
};

const getAverageVWAP = async (startDate, endDate, symbol) => {
  const query = { date: { $gte: startDate, $lte: endDate } };
  if (symbol) query.symbol = symbol;

  const data = await Stock.find(query);
  const totalVWAP = data.reduce((sum, record) => sum + record.vwap, 0);
  return {
    symbol,
    average: totalVWAP / data.length
  };
};

export  {
  insertStockData,
  getHighestVolume,
  getAverageClose,
  getAverageVWAP,
};
        

import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  date: { type: String, required: true },
  symbol: { type: String, required: true },
  series: { type: String, required: true },
  prev_close: { type: Number, required: true },
  open: { type: Number, required: true },
  high: { type: Number, required: true },
  low: { type: Number, required: true },
  last: { type: Number, required: true },
  close: { type: Number, required: true },
  vwap: { type: Number, required: true },
  volume: { type: Number, required: true },
  turnover: { type: Number, required: true },
  trades: { type: Number, default:0 },
  deliverable: { type: Number, required: true },
  percent_deliverable: { type: Number, required: true },
});

export const Stock = mongoose.model("Stock", stockSchema);
        

import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import { connectDB } from "./utils/db.js";
import stockRoutes from "./routes/stockRoutes.js";

configDotenv({});
const app = express();


// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
//here we can add cors for cross origin requests

// Routes
app.use("/api/stocks", stockRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // Connect to MongoDB
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});

export { app };
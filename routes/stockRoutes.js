import { Router } from "express";
import { uploadCSV, getHighestVolumeAPI, getAverageCloseAPI, getAverageVWAPAPI } from "../controllers/stockController.js";
import { upload, csvValidator } from "../middleware/csvValidator.js";

const router = Router();

router.post("/upload", upload.single("csvfile"), csvValidator, uploadCSV);
router.get("/highest-volume", getHighestVolumeAPI);
router.get("/average-close", getAverageCloseAPI);
router.get("/average-vwap", getAverageVWAPAPI);

export default router;


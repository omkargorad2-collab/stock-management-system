import multer from "multer";

export const upload = multer({ dest: "uploads/" });

export const csvValidator = (req, res, next) => {
  if (!req.file || req.file.mimetype !== "text/csv") {
    return res.status(400).json({ error: "Only CSV files are allowed." });
  }
  next();
};

  

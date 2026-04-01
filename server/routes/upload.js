const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, "data.csv"),
});

const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  const results = [];
  const filePath = path.join(__dirname, "../uploads/data.csv");

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      res.json({ success: true, data: results });
    })
    .on("error", () => {
      res.status(500).json({ error: "Failed to parse CSV" });
    });
});

module.exports = router;
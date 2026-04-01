const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const uploadRoute = require("./routes/upload");
const insightsRoute = require("./routes/insights");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoute);
app.use("/api/insights", insightsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
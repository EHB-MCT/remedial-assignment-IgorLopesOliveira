require("dotenv").config();
const express = require("express");
const connectDB = require("./utils/db");

const app = express();
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use("/api/trade", require("./api/tradeRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));

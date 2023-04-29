const express = require("express");
const app = express();
// other Imports
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

// DataBase Connecton MongoDB
const db_connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
// API security
app.use(helmet());

// handle CORS error
app.use(cors());

// Logger
app.use(morgan("short"));

// Set bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set Cookie Parser
app.use(cookieParser());

// routes
const testRouter = require("./src/routes/test.routes");
app.use("/api/test", testRouter);
const authRouter = require("./src/routes/auth.routes");
app.use("/api/auth", authRouter);

// route error handle
app.use("*", (req, res) => {
  res.status(404).json({ message: "Resources Not Found!!!" });
});

console.log("hello");
//
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  db_connect();
  console.log(`Server listening on port http://localhost:${PORT}`);
});

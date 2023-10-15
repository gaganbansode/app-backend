const express = require("express");
const app = express();
const morgan = require("morgan");
const authRoute = require("./routes/authRoute");
const activity = require("./routes/activityRoute");
var cors = require("cors");

// env configure
require("dotenv").config();

// db configure
require("./config/db");

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/activity", activity);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to netflix</h1>");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("server is running");
});

const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch(() => {
    console.log("db not connected");
  });

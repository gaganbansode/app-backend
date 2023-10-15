const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    payment: {},
    plan: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("plans", planSchema);

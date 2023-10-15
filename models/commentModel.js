const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    movieID: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("comments", commentsSchema);

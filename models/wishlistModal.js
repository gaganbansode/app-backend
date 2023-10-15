const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    movieID: {
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
module.exports = mongoose.model("wishlists", wishlistSchema);

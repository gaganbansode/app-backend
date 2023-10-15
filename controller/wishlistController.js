const wishlistSchema = require("../models/wishlistModal");

const addwishlistController = async (req, res) => {
  try {
    req.body.userID = req.user._id;

    const { movieID } = req.body;
    const wishlist = await wishlistSchema.findOne({
      userID: req.user._id,
      movieID,
    });
    if (wishlist) {
      res.status(200).send({
        success: false,
        message: "Already In Wishlist",
      });
    } else {
      const newComment = await new wishlistSchema(req.body).save();
      res.status(201).send({
        success: true,
        message: "Added Into Wishlist",
        newComment,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in Wishlist",
    });
  }
};

const editCommentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    if (!comment) {
      return req.status(401).send({ message: "Comment is required" });
    }
    const newComment = await commentsSchema.findByIdAndUpdate(
      id,
      {
        comment,
      },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Comment Updated Successfully",
      newComment,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in Commented",
    });
  }
};

const getWishlistController = async (req, res) => {
  try {
    const userID = req.user._id;
    const wishlist = await wishlistSchema
      .find({ userID })
      .sort({ createdAt: -1 });
    if (wishlist) {
      res.status(200).send({
        success: true,
        wishlist,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "No result found",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in wishlist",
    });
  }
};

const checkWishlistController = async (req, res) => {
  const { movieID } = req.params;
  try {
    const userID = req.user._id;
    const wishlist = await wishlistSchema.findOne({ userID, movieID });
    if (wishlist) {
      res.status(200).send({
        success: true,
        wishlist,
      });
    } else {
      res.status(200).send({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in wishlist",
    });
  }
};

const deleteWishlistController = async (req, res) => {
  const { id } = req.params;
  try {
    const wishlist = await wishlistSchema.findByIdAndDelete(id);
    if (wishlist) {
      res.status(200).send({
        success: true,
        message: "wishlist item Deleted Successfully",
      });
    } else {
      res.status(200).send({
        success: false,
        message: "No result found",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in wishlist",
    });
  }
};
module.exports = {
  addwishlistController,
  checkWishlistController,
  getWishlistController,
  deleteWishlistController,
};

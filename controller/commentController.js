const commentsSchema = require("../models/commentModel");

const addCommentController = async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment) {
      return req.status(401).send({ message: "Comment is required" });
    }
    req.body.userID = req.user._id;
    const newComment = await new commentsSchema(req.body).save();
    res.status(201).send({
      success: true,
      message: "Commented Successfully",
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

const getCommentController = async (req, res) => {
  try {
    const { movieID } = req.params;
    const comments = await commentsSchema
      .find({ movieID })
      .populate("userID", "-password")
      .sort({ createdAt: -1 });
    if (comments) {
      res.status(200).send({
        success: true,
        comments,
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
      message: "Error in comments",
    });
  }
};

const deleteCommentController = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await commentsSchema.findByIdAndDelete(id);
    if (comment) {
      res.status(200).send({
        success: true,
        message: "Comment Deleted Successfully",
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
      message: "Error in Comment",
    });
  }
};
module.exports = {
  addCommentController,
  editCommentController,
  getCommentController,
  deleteCommentController,
};

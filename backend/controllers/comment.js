const commentModel = require("../models/comments");
const postModel = require("../models/post");

//!------ Create a Comment
const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;
    const commenter = req.token.userId;

    const newComment = new commentModel({
      comment,
      commenter,
    });

    const savedComment = await newComment.save();
    await postModel
      .findByIdAndUpdate(postId, {
        $push: { comments: savedComment._id },
      })
      .populate("comments");
    res.status(201).json({
      success: true,
      message: "Comment created successfully.",
      comment: savedComment,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
//!--- Update a Comment
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;
    const userId = req.token.userId;
    const existingComment = await commentModel.findOne({
      _id: commentId,
      commenter: userId,
    });
    if (!existingComment) {
      return res
        .status(404)
        .json({ success: false, message: "You Can't Edit Others Comments " });
    }
    const updatedComment = await commentModel.findByIdAndUpdate(
      commentId,
      { comment },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Comment updated.",
      comment: updatedComment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

//!--- delete a Comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.token.userId;

    const existingComment = await commentModel.findOne({
      _id: commentId,
      commenter: userId,
    });

    if (!existingComment) {
      return res
        .status(404)
        .json({ success: false, message: "You Can't delete Others Comments " });
    }
    const deletedComment = await commentModel.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    await postModel.findByIdAndUpdate(deletedComment.postId, {
      $pull: { comments: commentId },
    });

    res.status(200).json({ success: true, message: "Comment deleted ." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

//!--- add reply a Comment
const addReplyToComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { reply } = req.body;
    const replier = req.token.userId;

    const updatedComment = await commentModel.findByIdAndUpdate(
      commentId,
      {
        $push: {
          replies: {
            reply,
            replier,
          },
        },
      },
      { new: true }
    );

    if (!updatedComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res.status(201).json({
      success: true,
      message: "Reply added ",
      comment: updatedComment,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};


module.exports = {
  createComment,
  updateComment,
  deleteComment,
  addReplyToComment,
};

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
    await postModel.findByIdAndUpdate(postId, {
      $push: { comments: savedComment._id },
    }).populate("comments");
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
    
}

//!--- delete a Comment
const deleteComment = async (req, res) => {}

//!--- add reply a Comment
const addReplyToComment = async (req, res) => {}

module.exports = {
  createComment,
  updateComment,
//   deleteComment,
//   addReplyToComment,
};

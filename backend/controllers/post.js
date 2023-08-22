const postModel = require("../models/post");

// create post
const createNewPost = (req, res) => {
  const { description, image } = req.body;
  const username = req.token.userId;
  const newPost = new postModel({
    image,
    description,
    username,
  });

  newPost
    .save()
    .then((post) => {
      res.status(201).json({
        success: true,
        message: `post created`,
        post: post,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
// update post
const updatePostById = (req, res) => {
  const id = req.params.id;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key].toString().replaceAll(" ", "") == "" && delete filter[key];
  });
  postModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((newArticle) => {
      if (!newArticle) {
        return res.status(404).json({
          success: false,
          message: `The post with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `post updated`,
        article: newArticle,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
// delete post
const deletePostById = (req, res) => {
  const { id } = req.params;
  postModel
    .findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The post with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `post deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

// like post
const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.token.userId;

    const post = await postModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post Not Found " });
    }
    const requestIndex = post.likes.findIndex(req => req.equals(userId));

    if (!requestIndex ) {
        return res.status(400).json({ success: false, message: " already Liked" });
    }
    await Promise.all([ postModel.updateOne({_id:postId},{$push:{likes:userId}})])
    res
    .status(200)
    .json({ success: true, message: "post Liked ." });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Failed to Like a post.", error: error });
  }
};
// dislike post
const disLikePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const userId = req.token.userId;
  
      const post = await postModel.findById(postId);
      if (!post) {
        return res
          .status(404)
          .json({ success: false, message: "Post Not Found " });
      }
      const requestIndex = post.likes.findIndex(req => req.equals(userId));
  
      if (requestIndex ) {
          return res.status(400).json({ success: false, message: " already Liked" });
      }
      await Promise.all([ postModel.updateOne({_id:postId},{$pull:{likes:userId}})])
      res
      .status(200)
      .json({ success: true, message: "post disLiked ." });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ message: "Failed to Like a post.", error: error });
    }
  };
// get post


module.exports = { createNewPost, updatePostById, deletePostById,likePost ,disLikePost};

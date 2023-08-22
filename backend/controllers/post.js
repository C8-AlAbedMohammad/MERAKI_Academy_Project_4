const postModel=require("../models/post");




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

// like post

// get post






module.exports = {createNewPost,updatePostById,}
const express = require("express");

const { createNewPost,updatePostById,deletePostById,likePost,disLikePost } = require("./../controllers/post");
// Middleware
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const postRouter = express.Router();
// create new post
postRouter.post(
    "/",
    authentication,
    authorization("all"),
    createNewPost
  );
  
// update post
postRouter.put("/:id", authentication,updatePostById);

// delete post
postRouter.delete("/:id", authentication,deletePostById);

// like a Post
postRouter.post("/like/:postId", authentication,likePost);
// dislike a Post
postRouter.post("/dislike/:postId", authentication,disLikePost);


module.exports = postRouter;
const express = require("express");

const { createNewPost,updatePostById,deletePostById,likePost,disLikePost,getPostsById ,getUserPostAndFriendPost,} = require("./../controllers/post");
const { createComment,
    updateComment,
    deleteComment,
    addReplyToComment,likeComment}=require("./../controllers/comment");
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
// postRouter.post("/dislike/:postId", authentication,disLikePost);
// !get post by id
postRouter.get("/:id",getPostsById)
// !timeline
postRouter.get("/", authentication,getUserPostAndFriendPost);
// ! add comment 
postRouter.post(
    "/comment/:postId",
    authentication,
    authorization("all"),
    createComment
  );
  // ! update comment 

  postRouter.put(
    "/updateComment/:commentId",
    authentication,
    updateComment 
  );
  // ! delete comment 

  postRouter.delete(
    "/deleteComment/:commentId",
    authentication,
    deleteComment 
  );
  // ! add reply to comment 
  postRouter.post(
    "/addreply/:commentId",
    authentication,
    addReplyToComment
  );
  postRouter.post("/likeComment/:commentId", authentication,likeComment);

module.exports = postRouter;
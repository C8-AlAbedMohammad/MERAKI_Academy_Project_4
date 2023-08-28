const comments = require("../models/comments");
const postModel = require("../models/post");
const userModel = require("../models/UserSchema");
//!--- create post
const createNewPost = (req, res) => {
  const { description, image } = req.body;
  const username = req.token.userId;
  const newPost = new postModel({
    image,
    description,
    username,
    dateOfPublish:Date.now()
  });

  newPost
    .save()
    .then(async( post) => {
   await   post.populate({
        path: "username",
        select: "firstName lastName profilePicture ",
      })
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
//!--- update post
const updatePostById = (req, res) => {
  const id = req.params.id;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key].toString().replaceAll(" ", "") == "" && delete filter[key];
  });
  postModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true }) .populate({
      path: "username",
      select: "firstName lastName -_id",
    })
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
//!----- delete post
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

// !---like post
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

    if (!post.likes.includes(userId)) {
      await postModel
        .updateOne({ _id: postId }, { $push: { likes: userId } })
        .populate({
          path: "username",
          select: "firstName lastName -_id",
        });
      res.status(200).json({ success: true, message: "post Liked ." });
    } else {
      await postModel
        .updateOne({ _id: postId }, { $pull: { likes: userId } })
        .populate({
          path: "username",
          select: "firstName lastName -_id",
        });
      res.status(200).json({ success: true, message: "post disLiked ." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to Like a post.", error: error });
  }
};
// dislike post
// const disLikePost = async (req, res) => {
//     try {
//       const { postId } = req.params;
//       const userId = req.token.userId;

//       const post = await postModel.findById(postId);
//       if (!post) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Post Not Found " });
//       }
//       const requestIndex = post.likes.findIndex(req => req.equals(userId));

//       if (requestIndex ) {
//           return res.status(400).json({ success: false, message: " already Liked" });
//       }
//       await Promise.all([ postModel.updateOne({_id:postId},{$pull:{likes:userId}})])
//       res
//       .status(200)
//       .json({ success: true, message: "post disLiked ." });
//     } catch (error) {
//       console.log(error);
//       res
//         .status(400)
//         .json({ message: "Failed to Like a post.", error: error });
//     }
//   };
//!--- get post
const getPostsById = (req, res) => {
  let id = req.params.id;
  postModel
    .findById(id)
    .populate({
      path: "username",
      select: "firstName lastName profilePicture -_id",
    })
    .exec()
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          success: false,
          message: `The post with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The post ${id} `,
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
// ! get all post user+friend post
const getUserPostAndFriendPost = async (req, res) => {
  try {
    const userId = req.token.userId;
    console.log(userId);
    const userPosts = await postModel.find({ username: userId }).populate({
      path: "username",
      select: "firstName lastName profilePicture _id ",
    }).populate(
      {
        path:"comments",
        populate:{
          path:"commenter",
          select: "firstName lastName profilePicture _id",

        }

      }
    )
    const user = await userModel.findById(userId);
    const friends = user.friends;
    console.log(friends);
    const friendPosts = await Promise.all(
      friends.map(async (friend) => {
        return await postModel.find({ username: friend._id }).populate({
          path: "username",
          select: "firstName lastName  profilePicture -_id",
         
        }).populate(
          {
            path:"comments",
            populate:{
              path:"commenter",
              select: "firstName lastName profilePicture",
    
            }
    
          }
        );
      })
    );

    const allPosts = [...userPosts, ...friendPosts.flat()];
    allPosts.sort((a, b) => b.date - a.date);
    res.status(200).json({
      success: true,
      message: "User and friends' posts ",
      posts: allPosts,
    });
    // const currentUser=await userModel.findById(userId);
    // const userPosts=await postModel.find({username:currentUser._id})
    // const friendPosts= await Promise.all(currentUser.friends.map(friendId=>{
    //     postModel.find({username:friendId})
    // }))
    // const allPosts = [...userPosts, ...friendPosts.flat()];
    // allPosts.sort((a, b) => b.date - a.date);
    // res.status(200).json({
    //       success: true,
    //       message: "User and friends' posts ",
    //       posts: allPosts,
    //     });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
module.exports = {
  createNewPost,
  updatePostById,
  deletePostById,
  likePost,
  getPostsById,
  getUserPostAndFriendPost,
};

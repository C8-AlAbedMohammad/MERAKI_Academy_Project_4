const express = require("express");
const authentication=require("../middleware/authentication")
const { register,login,upDateUser,deleteUserById,getUserById,sendFriendRequest ,cancelFriendRequest} = require("../controllers/user");

const usersRouter = express.Router();
// register user
usersRouter.post("/register", register);
// login
usersRouter.post("/login", login);
// update user
usersRouter.put("/update/:id", upDateUser);
// delete user
usersRouter.delete("/delete/:id", deleteUserById);
// get user bu id

usersRouter.get("/:id", getUserById);

// send friend request
usersRouter.post("/sendrequest/:receiverId",authentication, sendFriendRequest);
// cancel friend request
usersRouter.post("/cancelrequest/:receiverId",authentication, cancelFriendRequest);
// accept friend request

usersRouter.post("/accept-request/:senderId",authentication, sendFriendRequest);


module.exports = usersRouter;

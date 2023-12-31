const express = require("express");
const authentication=require("../middleware/authentication")
const { register,login,upDateUser,deleteUserById,getUserById,sendFriendRequest ,cancelFriendRequest,acceptFriendRequest,getFrindRequest,secrhUser,verifyEmail} = require("../controllers/user");

const usersRouter = express.Router();
// register user
usersRouter.post("/register", register);
// login
usersRouter.post("/login", login);
// update user
usersRouter.post("/verify-email/:emailToken", verifyEmail);
usersRouter.put("/update/:id", upDateUser);
// delete user
usersRouter.delete("/delete/:id", deleteUserById);
// get user bu id
usersRouter.get("/search",authentication, secrhUser);
// get friend req
usersRouter.get("/getftreq",authentication, getFrindRequest);
usersRouter.get("/:id",authentication, getUserById);


// send friend request
usersRouter.post("/sendrequest/:receiverId",authentication, sendFriendRequest);


// cancel friend request
usersRouter.post("/cancelrequest/:receiverId",authentication, cancelFriendRequest);
// accept friend request

usersRouter.post("/accept-request/:senderId",authentication, acceptFriendRequest);


module.exports = usersRouter;

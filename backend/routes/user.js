const express = require("express");
const { register,login,upDateUser,deleteUserById } = require("../controllers/user");

const usersRouter = express.Router();
usersRouter.post("/register", register);

usersRouter.post("/login", login);

usersRouter.put("/update/:id", upDateUser);
usersRouter.delete("/delete/:id", deleteUserById);





module.exports = usersRouter;

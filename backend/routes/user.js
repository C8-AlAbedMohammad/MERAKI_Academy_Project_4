const express = require("express");
const { register,login,upDateUser } = require("../controllers/user");

const usersRouter = express.Router();
usersRouter.post("/register", register);

usersRouter.post("/login", login);

usersRouter.put("/profile/:id", upDateUser);




module.exports = usersRouter;

const express = require("express");
const { createNewRole } = require("../controllers/role");
const rolesRouter = express.Router();


// create role
rolesRouter.post("/", createNewRole);

module.exports = rolesRouter;

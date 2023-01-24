const express = require("express");
const authRouter = express.Router();

const {register,login,reset,commonLogin} = require("./controllers");

authRouter.post("/register",register);
authRouter.post("/login",commonLogin,login);
authRouter.post("/reset",commonLogin,reset);

module.exports = authRouter;
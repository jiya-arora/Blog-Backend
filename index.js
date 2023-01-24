const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const server = express();

//Common middlewares
server.use(cors());
server.use(bodyParser.json());

// jiyarora, blog_g16
//DB Connection
mongoose.connect("mongodb+srv://jiya:jiyarora@cluster0.bvuztb8.mongodb.net/blog_g16?retryWrites=true&w=majority6");  //127.0.0.0 , 0.0.0.0 -> localhost
mongoose.connection.on("connected", () => {
    console.log("DB Connected");
})
mongoose.connection.on("error", () => {
    console.log("DB error");
})
//DB Connection Ended

const authRouter = require("./src/auth/router");
server.use("/auth",authRouter);

const blogRouter = require("./src/blog/router");
server.use("/blog",blogRouter);

server.listen(4000, () => {
    console.log("Server started at port 4000");
})
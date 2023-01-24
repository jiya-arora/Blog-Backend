const express = require("express");
const { isAuthenticated } = require("../helper/utils");
const blogRouter = express.Router();
const {createNewBlog,allBlogs} = require("./controllers");

blogRouter.post("/allBlogs", allBlogs);
blogRouter.post("/blog", isAuthenticated, createNewBlog);
// blogRouter.use().post().put()

module.exports = blogRouter;
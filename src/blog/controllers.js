const {Blog} = require("./models");

const createNewBlog = async (req,res) => {
    console.log(req.body);
    // await Blog.create(req.body);
    // Only object type can be populated - although wont give error
    // Use spaces inside populate for more than one
    const newBlog = await (await Blog.create(req.body)).populate("user_id");
    return res.json({status: "Created", newBlog})
}

const allBlogs = async (req,res) => {
    const blogs = await Blog.find();
    return res.json({status: "Success", data:blogs});
}

module.exports = {createNewBlog,allBlogs}
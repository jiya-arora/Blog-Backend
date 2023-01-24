const {User} = require("./models");
const jwt = require("jsonwebtoken");
const Key = "jhgfdsaqwertyu7i842kncwjsb2ytqiqnsgxwmoamshc";

const register = async (req, res) => {
    const {username,password} = req.body;
    const user = await User.findOne({username:username});
    if(user){
        return res.json({
            status: "Error",
            message:"This username already exists"
        });
    }
    if(password.length<6){
        return res.json({status: "Try again! Minimum length of password is 6 characters"});
    }

    //const newUser = await User.create(req.body);
    const newUser = new User(req.body);
    await newUser.save();

    newUser.encry_password = undefined;
    newUser.salt = undefined;
    return res.json({status: "Registered", newUser});
}

//khud ka middleware - iske liye use next as argument
const commonLogin = async (req,res,next) => {
    const {username,password} = req.body;
    const user = await User.findOne({username:username});

    if(!user){
        return res.json({
            status: "Error",
            message: "This username does not exist"
        })
    }

    if(!user.authenticate(password)){
        return res.json({
            status: "Error",
            message: "Incorrrect password"
        })
    }

    //JW Token
    //Install jsonwebtoken
    var token = jwt.sign({_id : user._id},Key);
    req.body.token = token;
    user.encry_password = undefined;
    user.salt = undefined;
    req.body.user = user;

    next();
}

const login = async (req, res) => {
    
    return res.json({status: "Successfully logged in", data: req.body.user, token: req.body.token});

    // if(user && user.authenticate(password)){
    //     var token = jwt.sign({_id : user._id},user.salt);
    //     user.encry_password = undefined;
    //     user.salt = undefined;
    //     return res.json({status: "Successfully logged in", user, token});
    // }
    // else if(user){
    //     return res.json({status: "Password incorrect"});
    // }
    // return res.json({status: "Invalid username! Please register first"})
} 

const reset = async (req, res) => {
    const {username,newPassword} = req.body;
    const user = await User.findOne({username:username});
    if(req.body.newPassword.length<6){
        return res.json({
            status: "Error",
            message:"Minimum password length is 6",
        });
    }
    user.password = newPassword;
    await user.save();
    return res.json({status: "Reset", data: req.body.user, token:req.body.token});
}

module.exports = {register,login,reset,commonLogin,Key};
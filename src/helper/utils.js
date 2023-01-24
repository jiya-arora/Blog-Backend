const jwt = require("jsonwebtoken");
const {Key} = require("../auth/controllers");
const { User } = require("../auth/models");

const isAuthenticated = async (req,res,next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.json({
            status: "Error",
            message: "Token required"
        })
    }
    
    try{
        const verify = jwt.verify(token,Key);
        // console.log(verify);

        if(verify && verify._id){
            var user = await User.findById(verify._id);
            if(!user){
                return res.json({
                    status: "Error",
                    message: "Unauthorized user"
                })
            }
            req.body.user_id = user._id;
            next();
        }
        else{
            return res.json({
                status: "Error",
                message: "Valid token required"
            })
        }
    }
    catch(error){
        return res.json({
            status: "Error",
            message: "Invalid token"
        })
    }
    
}

module.exports = {isAuthenticated}


// Options to send token
// headers, body, query, params
// limitation with body is it can be sent in post request and not get
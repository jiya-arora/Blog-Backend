const mongoose = require("mongoose");
const uuid = require("uuid");
const CryptoJS = require("crypto-js");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
        },
        name: String,
        encry_password: String,
        salt: String,
        email: String
    }, 
    {timestamps: true}
);

userSchema.virtual("password").set(function (plainPassword) {
    this.salt = uuid.v4();
    this.encry_password = this.securePassword(plainPassword);
})

userSchema.methods = {
    securePassword : function (plainPassword) {
        return CryptoJS.SHA256(plainPassword,this.salt).toString();
    },
    authenticate : function (password) {
        return this.securePassword(password)===this.encry_password;
    }
}

const User = mongoose.model("User",userSchema);
module.exports = { User };
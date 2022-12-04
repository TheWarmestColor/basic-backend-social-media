const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const UserSchema = new mongoose.Schema({
    username:{
        type: String
    },
    password:{
        type: String
    },
    userDescription:{
        type: String
    },
    displayname:{
        type:String,
        default: "A Random User"
    },
    avatarImgURL:{
        type:String
    },
    postsID: []
},{collection:"users"})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });

UserSchema.methods.getJwtToken = function (enteredUsername) {
    const role = enteredUsername == process.env.ADMIN_USERNAME? "admin" : "user";
    return jwt.sign({ id: this._id, role: role }, process.env.JWT_SECRET)
}

module.exports = mongoose.model("user", UserSchema)
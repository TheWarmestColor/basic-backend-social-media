const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    senderId:{
        type: String
    },
    message:{
        type: String,
        default: "A Random Message"
    },
    postId:{
        type: String,
        default: "A Random Message"
    }
}, {collection: "comments"})

module.exports = mongoose.model("comment", CommentSchema)
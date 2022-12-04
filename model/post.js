const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId:{
        type: String,
        default: "A Random User"
    },
    postMessage:{
        type: String,
        default: "A Random Post"
    },
    postImgURL:{
        type: String,
        default: "URL"
    },
    commentId: [] 
}, {collection: "posts"})

module.exports = mongoose.model("post", PostSchema)
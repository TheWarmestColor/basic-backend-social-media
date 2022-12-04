const Comment = require("../model/comment");
const Post = require("../model/post");

exports.deleteCommentIdFromPost = async (req, res, next) => {
    try {
        console.log(req.postId)
        const post = await Post.findOne({_id: req.postId});
        post.commentId.pull(req.params.id.toString())
        await post.save()
        console.log(post)    
    }
    catch(err) {
        res.status(400).json({message:err.message})
    }
    next()
}
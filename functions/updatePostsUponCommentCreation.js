const Comment = require("../model/comment");
const Post = require("../model/post");

exports.updatePostsUponCommentCreation = async (req, res, next) => {
    try {
        const comment = await Comment.findOne({_id: req.body._id}).then(
            async (comment) =>{
                const post = await Post.findOne({_id: comment.postId});
                post.commentId.push(comment._id.toString())
                await post.save()
                console.log(post)
            }
        )      
    }
    catch(err) {
        res.status(400).json({message:err.message})
    }
    next()
}
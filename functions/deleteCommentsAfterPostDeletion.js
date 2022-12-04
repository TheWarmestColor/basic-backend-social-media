const Comment = require("../model/comment");
const Post = require("../model/post");

exports.deleteCommentsAfterPostDeletion = async (req, res, next) => {
    try {
        const records = await Comment.deleteMany().where('_id').in(req.commentId).exec();
    }
    catch(err) {
        res.status(400).json({message:err.message})
    }
    next()
}
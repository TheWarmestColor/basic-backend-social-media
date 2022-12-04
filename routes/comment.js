const express = require('express')
const {
    getPostComment,
    createComment,
    deleteAllComments,
    deleteComment,
    updateComment,
    getAllComments
} = require('../controllers/comment')
const { deleteCommentIdFromPost } = require('../functions/deleteCommentIdFromPost')
const { updatePostsUponCommentCreation } = require('../functions/updatePostsUponCommentCreation')
const { protection } = require('../middleware/rolePass')

const router = express.Router()
router.use(protection)

router.route("/")
    .post(createComment, updatePostsUponCommentCreation)
    .delete(deleteAllComments)
    .get(getAllComments)

router.route("/:id") 
    .get(getPostComment)
    .delete(deleteComment, deleteCommentIdFromPost)
    .patch(updateComment)



module.exports = router
const express = require('express')
const {
    getAllPosts,
    getOnePost,
    createOnePost,
    updateOnePost,
    deleteAllPosts, 
    deleteOnePost
} = require('../controllers/post')
const { deleteCommentsAfterPostDeletion } = require('../functions/deleteCommentsAfterPostDeletion')
const { protection } = require('../middleware/rolePass')

const router = express.Router()
router.use(protection)

router.route("/")
    .get(getAllPosts)
    .delete(deleteAllPosts)
    .post(createOnePost)

router.route("/:id")
    .get(getOnePost)
    .delete(deleteOnePost, deleteCommentsAfterPostDeletion)
    .patch(updateOnePost)

module.exports = router
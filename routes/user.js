const express = require('express')
const {
    getAllUsers,
    createOneUser,
    deleteAllUsers,
    deleteOneUser,
    getOneUser,
    updateOneUser
} = require("../controllers/user.js")
const { 
    protection, 
    roleAuth 
} = require('../middleware/rolePass.js')

const router = express.Router()
router.use(protection)

router.route("/")
    .get(getAllUsers)
    .delete(roleAuth("admin"), deleteAllUsers)
    .post(createOneUser)

router.route("/:id")
    .get(getOneUser)
    .delete(roleAuth("admin"), deleteOneUser)
    .patch(updateOneUser)

module.exports = router

const express = require('express')
const { logIn, register, changePassword, testingRoute } = require('../controllers/auth')
const { protection, roleAuth } = require('../middleware/rolePass')

const router = express.Router()

router.route("/")
    .get(logIn)
    .post(register)
    .patch(protection, roleAuth("user", "admin"), changePassword)

module.exports = router
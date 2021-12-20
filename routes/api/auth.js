const express = require('express')
const router = express.Router()

const {
    validRegister,
    validLogin
} = require('../../helpers/validators')

const {
    registerController,
    loginController
} = require('../../controllers/auth')

router.post('/register',
    validRegister,
    registerController)

router.post('/login',
    validLogin,
    loginController)

module.exports = router
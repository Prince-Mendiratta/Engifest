const express = require('express')
const router = express.Router()

const {
    requireSignin,
} = require('../../controllers/auth')

const {
    generateTicket
} = require('../../controllers/ticket')

router.get('/ticket',
    requireSignin,
    generateTicket)

module.exports = router
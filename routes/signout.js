var express = require('express');
var router = express.Router();
const { signoutController } = require('../controllers/auth')

/* GET home page. */
router.get('/', signoutController);

module.exports = router;

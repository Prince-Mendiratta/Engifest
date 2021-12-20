var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const { signoutController } = require('../controllers/auth')

/* GET users listing. */
router.get('/', function (req, res, next) {
  var token = req.cookies.auth;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, token_data) {
      console.log(token_data);
      var dd = new Date().getTime() / 1000
      console.log(Math.round(dd))
      if (err) {
        return signoutController(req,res);
      } else {
        return res.render('dashboard', {name: token_data.name});
      }
    });
  } else {
    return res.redirect('/login');
  }
});

module.exports = router;

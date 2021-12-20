var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const { signoutController } = require('../controllers/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  // var alert = [{
  //   msg: "bruh test"
  // }, {
  //   msg: "Not cool"
  // }]
  // res.render('register', {alert});
  var token = req.cookies.auth;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, token_data) {
      if (err) {
        return signoutController(req,res);
      } else {
        return res.redirect('/dashboard')
      }
    });
  } else {
    return res.render('register');
  }
});

module.exports = router;

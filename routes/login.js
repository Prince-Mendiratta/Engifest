var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const { signoutController } = require('../controllers/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  var registered = false;
  var referer = req.get('Referrer')
  if(referer){
    try{
      if(referer.endsWith('/register') && req.get('Host') === process.env.CLIENT_URL){
        registered = true;
      }
    }catch(err){
      // Do nothing
      // console.log(err);
    }
  }
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
    return res.render('login', {registered});
  }
});

module.exports = router;

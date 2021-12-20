var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // var alert = [{
  //   msg: "bruh test"
  // }, {
  //   msg: "Not cool"
  // }]
  // res.render('register', {alert});
  res.render('register');
});

module.exports = router;

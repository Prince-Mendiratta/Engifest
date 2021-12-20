var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var registered = false;
  console.log(res.statusCode);
  console.log(typeof(res.statusCode))
  try{
    if(req.get('Referrer').endsWith('/register') && req.get('Host') === "localhost:5000"){
      registered = true;
    }
  }catch(err){
    // Do nothing
    console.log(err);
  }
  res.render('login', {registered});
});

module.exports = router;

var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.getIndex = (req, res, next) => {
 
  res.render('contact/contact',{user: req.user});
};



module.exports = router;
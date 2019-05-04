var express = require('express');
var router = express.Router();

/* GET home page. */
router.user = (req, res, next) => {
  res.render('user/users')
};


module.exports = router;

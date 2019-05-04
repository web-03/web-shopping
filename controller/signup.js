var express = require('express');
var router = express.Router();

/* GET users listing. */
router.getIndex = (req, res, next) => {
  res.render('user/signup');
};

module.exports = router;
